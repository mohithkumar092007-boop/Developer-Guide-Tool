import { ImpactSimulation } from '../../../database/types';
import { db } from '../../../database/index';

export function calculateBlastRadius(targetFile: string, targetSymbol: string): ImpactSimulation {
  const baseSim = db.getImpactSimulation();

  return {
    ...baseSim,
    targetFile: targetFile || baseSim.targetFile,
    targetSymbol: targetSymbol || baseSim.targetSymbol,
    blastRadiusScore: 68,
    riskLevel: 'MEDIUM',
    topologyNodes: [
      {
        id: 'node-root',
        label: targetFile.split('/').pop() || 'target_file.py',
        path: `L:118 ::${targetSymbol}`,
        sublabel: 'Root Origin · AST Staged',
        type: 'root',
        icon: 'terminal',
      },
      {
        id: 'child-1',
        label: 'order_service.py',
        path: 'app/services/order_service.py',
        sublabel: 'Verified Direct Dependency',
        type: 'direct',
        icon: 'verified_user',
      },
      {
        id: 'child-2',
        label: 'checkout_api.py',
        path: 'app/api/v1/billing_routes.py',
        sublabel: 'AI Inference: Route Handler Caller',
        type: 'heuristic',
        icon: 'neurology',
      },
      {
        id: 'child-3',
        label: 'invoice_service.py',
        path: 'app/services/invoice_service.py',
        sublabel: 'Async Event Listener: OrderPaid',
        type: 'direct',
        icon: 'sync_alt',
      },
      {
        id: 'child-4',
        label: 'test_checkout_flow.py',
        path: 'tests/integration/test_checkout.py',
        sublabel: 'Potential Breakage: Missing mock param',
        type: 'breaking',
        icon: 'report_problem',
      },
    ],
  };
}

export function generateAutomatedTestSuite(targetFile: string, targetSymbol: string) {
  const filename = targetFile.split('/').pop()?.replace('.py', '') || 'target';
  return `import pytest
from unittest.mock import AsyncMock, patch
from app.services.${filename} import PaymentService, PaymentResult

@pytest.mark.asyncio
async def test_process_payment_idempotent_success():
    """Verify charge idempotency key matches order version hash."""
    mock_db = AsyncMock()
    mock_stripe = AsyncMock()
    mock_stripe.create_charge.return_value.id = "ch_mock_success_99"

    service = PaymentService(db=mock_db, stripe_client=mock_stripe)
    result = await service.process_payment(order_id="ord_101", payment_method_id="pm_card_visa")

    assert result["status"] == "success"
    assert result["charge_id"] == "ch_mock_success_99"
    mock_stripe.create_charge.assert_awaited_once()

@pytest.mark.asyncio
async def test_process_payment_missing_order_raises_404():
    """Verify non-existent order raises 404 HTTPException."""
    mock_db = AsyncMock()
    mock_stripe = AsyncMock()
    service = PaymentService(db=mock_db, stripe_client=mock_stripe)
    service.orders.get_order_by_id = AsyncMock(return_value=None)

    with pytest.raises(Exception) as excinfo:
        await service.process_payment(order_id="ord_nonexistent", payment_method_id="pm_card_visa")
    assert "404" in str(excinfo.value) or "not found" in str(excinfo.value).lower()
`;
}
