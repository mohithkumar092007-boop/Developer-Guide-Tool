import {
  User,
  Organization,
  Team,
  Repository,
  RepositoryFile,
  CodeSymbol,
  ArchitectureNode,
  ArchitectureEdge,
  ImpactSimulation,
  OnboardingStep,
  BeginnerTask,
  ChatMessage,
  AuditLog
} from './types';

export const SEED_ORGANIZATION: Organization = {
  id: 'org-devguide-01',
  slug: 'devguide-org',
  name: 'DevGuide Global Systems Inc.',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2RK8wvQcytqpQzgjFhEMK6I9vYBi1BbS-07woHgTbf9VX7jDREnonOq-m-o3DngdPnAd-eRlPb4w8roiT5XTIHwm4GzCqjGepMtW7NsqXOZYRIG-37OBlh8cedmCwnVVsZFLkLRvgl2nAvn0QDUOHYS9TQPQZBI6S9NoqWbbV41JebHFpad7yJQjqTie6xZ0et4MnkmQrhj_1x2i8lCijg1FldJ1_-cAVGQCLOQ0-yQRraoQiwwXmkg',
  plan: 'Enterprise AST Tier',
  createdAt: '2024-01-15T00:00:00Z',
};

export const SEED_USERS: User[] = [
  {
    id: 'user-alex-01',
    organizationId: 'org-devguide-01',
    email: 'alex.chen@devguide.io',
    username: 'alexdev',
    name: 'Alex Chen',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7FpXhNLuQK8M7u94O10SLsJsOSsnMhCNYh3K5ijGJXXHMZ2iOqDtspMpJOVIBm0XnyyPar182i03VO4_Prq9TBrTP87U1xvMTvL6JDeZ7987c-mEoiqfQ6wrk9Stm3VoCWO6-7Ok8HkNtuEFOIk8nFBiXiL0-Iwmj_HsUaozJoGZ4bm3p-SftNjmpWJUTcx1HZ5fmFQ_2hANEtCrBDx7S1yy_s2f-ZrnunZqWGo7KyeWGJLn9wi9CsA',
    role: 'Developer',
    experienceLevel: 'Intermediate',
    preferredLearningStyle: 'Visual',
    programmingLanguages: ['Python', 'TypeScript', 'SQL'],
    skills: ['FastAPI', 'React', 'Docker', 'PostgreSQL', 'Redis'],
    onboardingStatus: 'Day 2 of 5 · In Progress',
    onboardingVelocity: 64,
    emailVerified: true,
    lastActive: 'Just now',
    createdAt: '2024-09-01T00:00:00Z',
  },
  {
    id: 'user-sarah-02',
    organizationId: 'org-devguide-01',
    email: 'sarah.j@devguide.io',
    username: 'sarah-eng',
    name: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Team Lead',
    experienceLevel: 'Advanced',
    preferredLearningStyle: 'Hands-on',
    programmingLanguages: ['Python', 'Go', 'Rust'],
    skills: ['Architecture', 'Kubernetes', 'Security', 'FastAPI'],
    onboardingStatus: 'Completed',
    onboardingVelocity: 100,
    emailVerified: true,
    lastActive: '2h ago',
    createdAt: '2023-11-10T00:00:00Z',
  },
  {
    id: 'user-marcus-03',
    organizationId: 'org-devguide-01',
    email: 'marcus.v@devguide.io',
    username: 'marcus-admin',
    name: 'Marcus Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Admin',
    experienceLevel: 'Advanced',
    preferredLearningStyle: 'Documentation-first',
    programmingLanguages: ['TypeScript', 'Python', 'Java'],
    skills: ['Cloud', 'DevOps', 'Compliance', 'RBAC'],
    onboardingStatus: 'Completed',
    onboardingVelocity: 95,
    emailVerified: true,
    lastActive: '10m ago',
    createdAt: '2023-08-01T00:00:00Z',
  },
];

export const SEED_TEAMS: Team[] = [
  {
    id: 'team-backend-core',
    organizationId: 'org-devguide-01',
    name: 'Core Services & Infrastructure',
    description: 'Maintains backend microservices, async routing, security middleware, and persistence.',
    memberCount: 8,
  },
  {
    id: 'team-platform-ui',
    organizationId: 'org-devguide-01',
    name: 'Web Platform & Experience',
    description: 'React SPA, Next.js customer portal, Design Systems, and AST Visualization.',
    memberCount: 6,
  },
];

export const SEED_REPOSITORIES: Repository[] = [
  {
    id: 'repo-backend-api',
    organizationId: 'org-devguide-01',
    name: 'backend-api',
    slug: 'backend-api',
    description: 'Core REST & WebSocket microservice orchestration for user provisioning and billing.',
    githubUrl: 'https://github.com/devguide-org/backend-api',
    defaultBranch: 'main',
    isPrivate: true,
    isDemo: false,
    status: 'Completed',
    filesCount: 1284,
    linesOfCode: 142000,
    languages: { Python: 72, TypeScript: 18, SQL: 10 },
    astQuotaUsed: 8400,
    astQuotaLimit: 10000,
    understoodPercent: 82,
    lastAnalyzedAt: '2 hours ago',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'repo-web-platform',
    organizationId: 'org-devguide-01',
    name: 'web-platform',
    slug: 'web-platform',
    description: 'Client portal, design system components, server-rendered dashboard widgets.',
    githubUrl: 'https://github.com/devguide-org/web-platform',
    defaultBranch: 'main',
    isPrivate: false,
    isDemo: false,
    status: 'Completed',
    filesCount: 840,
    linesOfCode: 98000,
    languages: { TypeScript: 85, CSS: 15 },
    astQuotaUsed: 6200,
    astQuotaLimit: 10000,
    understoodPercent: 45,
    lastAnalyzedAt: 'Yesterday',
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'repo-infra-deploy',
    organizationId: 'org-devguide-01',
    name: 'infra-deploy',
    slug: 'infra-deploy',
    description: 'Helm charts, AWS EKS configuration, VPC peering scripts, and ArgoCD delivery pipelines.',
    githubUrl: 'https://github.com/devguide-org/infra-deploy',
    defaultBranch: 'main',
    isPrivate: true,
    isDemo: false,
    status: 'Completed',
    filesCount: 357,
    linesOfCode: 34000,
    languages: { Terraform: 60, Docker: 25, YAML: 15 },
    astQuotaUsed: 3100,
    astQuotaLimit: 10000,
    understoodPercent: 90,
    lastAnalyzedAt: '3 days ago',
    createdAt: '2024-01-20T00:00:00Z',
  },
];

export const SEED_FILES: RepositoryFile[] = [
  {
    id: 'file-payment-service',
    repositoryId: 'repo-backend-api',
    path: 'app/services/payment_service.py',
    filename: 'payment_service.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 8640,
    lineCount: 28,
    symbolsCount: 4,
    summary: 'Manages customer transactions, integrates with Stripe gateway, validates order existence via OrderService, and guarantees idempotency before state persistence.',
    beginnerSummary: 'The payment processor for the application. When a user buys something, this file checks if the order is valid, asks Stripe to charge their card, and saves the successful payment.',
    content: `from fastapi import HTTPException, status
from app.services.order_service import OrderService
from app.gateways.stripe_client import StripeGateway
from app.db.session import AsyncSession

class PaymentService:
    def __init__(self, db: AsyncSession, stripe_client: StripeGateway):
        self.db = db
        self.stripe = stripe_client
        self.orders = OrderService(db)

    async def process_payment(self, order_id: str, payment_method_id: str) -> dict:
        """Process incoming transaction and finalize order state."""
        order = await self.orders.get_order_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        charge = await self.stripe.create_charge(
            amount=order.total_amount_cents,
            currency="usd",
            customer_token=payment_method_id
        )
        return {"status": "success", "charge_id": charge.id}

    # Terminal status reconciliation hook
    async def refund_order(self, charge_id: str) -> bool:
        return await self.stripe.issue_refund(charge_id)`,
  },
  {
    id: 'file-auth-service',
    repositoryId: 'repo-backend-api',
    path: 'app/services/auth_service.py',
    filename: 'auth_service.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 12400,
    lineCount: 284,
    symbolsCount: 6,
    summary: 'Core JWT authentication authority, token issuance, RS256 signing, and Redis session token caching.',
    beginnerSummary: 'Handles user logins. Creates digital keycards (JWT tokens) when a user enters correct credentials so they can access protected endpoints.',
    content: `from datetime import datetime, timedelta
import jwt
from fastapi import HTTPException, status, Depends
from app.core.security import SECRET_KEY, ALGORITHM
from app.models.user import User

class AuthService:
    def __init__(self, cache_client):
        self.cache = cache_client

    def create_access_token(self, data: dict, expires_delta: timedelta = None) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=60))
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    async def verify_jwt_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except jwt.PyJWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")`,
  },
  {
    id: 'file-auth-routes',
    repositoryId: 'repo-backend-api',
    path: 'app/api/v1/auth_routes.py',
    filename: 'auth_routes.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 9400,
    lineCount: 192,
    symbolsCount: 3,
    summary: 'FastAPI routing decorators exposing /api/v1/auth/login, /register, and /refresh with Pydantic payload models.',
    beginnerSummary: 'The front door of authentication. When someone fills in the login form, their web browser talks to this file first.',
    content: `from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
async def login(payload: LoginSchema, auth_service: AuthService = Depends()):
    # Validates credentials and yields bearer token
    return {"access_token": "bearer_jwt_token", "token_type": "bearer"}`,
  },
  {
    id: 'file-billing-routes',
    repositoryId: 'repo-backend-api',
    path: 'app/api/v1/billing_routes.py',
    filename: 'billing_routes.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 5600,
    lineCount: 95,
    symbolsCount: 3,
    summary: 'FastAPI endpoint routes for checkout triggers, Stripe webhooks, and invoice retrieval.',
    beginnerSummary: 'Allows customers to trigger checkout and receives automatic notices from Stripe when payments succeed or fail.',
    content: `from fastapi import APIRouter, Depends
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/billing", tags=["Billing"])

@router.post("/checkout")
async def checkout(order_id: str, payment_method: str, payment_service: PaymentService = Depends()):
    return await payment_service.process_payment(order_id, payment_method)`,
  },
  {
    id: 'file-security-py',
    repositoryId: 'repo-backend-api',
    path: 'app/core/security.py',
    filename: 'security.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 3200,
    lineCount: 88,
    symbolsCount: 2,
    summary: 'Cryptographic routines, password hashing context (Argon2 / BCrypt), and JWT secret configurations.',
    beginnerSummary: 'The cryptographic security vault. Encrypts passwords so nobody can read them and checks token validity.',
    content: `import os
from passlib.context import CryptContext

SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key-replace-in-prod")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)`,
  },
  {
    id: 'file-order-model',
    repositoryId: 'repo-backend-api',
    path: 'app/models/order.py',
    filename: 'order.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 4200,
    lineCount: 65,
    symbolsCount: 2,
    summary: 'SQLAlchemy declarative database model mapping customer orders, line items, and fulfillment statuses.',
    beginnerSummary: 'Describes what an Order looks like in the database (items, total cost, customer ID, and payment status).',
    content: `from sqlalchemy import Column, String, Integer, DateTime
from app.db.base import Base

class Order(Base):
    __tablename__ = "orders"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    total_amount_cents = Column(Integer, nullable=False)
    status = Column(String, default="PENDING")`,
  },
  {
    id: 'file-test-payments',
    repositoryId: 'repo-backend-api',
    path: 'tests/test_payments.py',
    filename: 'test_payments.py',
    extension: '.py',
    language: 'Python',
    sizeBytes: 6800,
    lineCount: 110,
    symbolsCount: 4,
    summary: 'Automated pytest test suite verifying PaymentService against mocked Stripe gateway calls.',
    beginnerSummary: 'Automated safety checks that simulate customer credit cards and make sure payments work without charging real money.',
    content: `import pytest
from unittest.mock import AsyncMock
from app.services.payment_service import PaymentService

@pytest.mark.asyncio
async def test_process_payment_success():
    mock_db = AsyncMock()
    mock_stripe = AsyncMock()
    mock_stripe.create_charge.return_value.id = "ch_test_123"
    service = PaymentService(mock_db, mock_stripe)
    # verify idempotent transaction execution
    assert service is not None`,
  },
  {
    id: 'file-readme',
    repositoryId: 'repo-backend-api',
    path: 'README.md',
    filename: 'README.md',
    extension: '.md',
    language: 'Markdown',
    sizeBytes: 3100,
    lineCount: 84,
    symbolsCount: 0,
    summary: 'High-level project documentation, architecture overview, quickstart instructions, and environment configurations.',
    beginnerSummary: 'The instruction manual for the project explaining what it does, how to set it up, and how to run tests.',
    content: `# DevGuide Backend API (FastAPI Microservice)

High-performance, asynchronous backend engine powering developer onboarding intelligence.

## Architecture Highlights
- **FastAPI Async Engine**: REST & WebSocket duplex routing
- **SQLAlchemy 2.0**: PostgreSQL async connection pooling
- **Redis 7.2**: Write-through session cache and rate limiting
- **Stripe Gateway**: Idempotent billing pipeline`,
  },
];

export const SEED_SYMBOLS: CodeSymbol[] = [
  {
    id: 'sym-payment-service',
    repositoryId: 'repo-backend-api',
    fileId: 'file-payment-service',
    filePath: 'app/services/payment_service.py',
    name: 'PaymentService',
    symbolType: 'class',
    lineStart: 6,
    lineEnd: 28,
    signature: 'class PaymentService',
    complexity: 'O(1)',
    concurrency: 'Asynchronous',
    docstring: 'Manages customer transactions and integrations with payment gateways.',
    explanation: 'This class manages customer transactions. It integrates with Stripe to charge payments, validates order existence via OrderService, and handles idempotency before state persistence.',
    beginnerExplanation: 'The cashier of our system. It takes order numbers, checks the bill, talks to the credit card company, and confirms the purchase.',
    dependencies: [
      { name: 'OrderService', path: 'app/services/order_service.py', type: 'Service' },
      { name: 'StripeGateway', path: 'app/gateways/stripe_client.py', type: 'Gateway' },
      { name: 'AsyncSession', path: 'SQLAlchemy 2.0 Async engine', type: 'Database' },
    ],
  },
  {
    id: 'sym-process-payment',
    repositoryId: 'repo-backend-api',
    fileId: 'file-payment-service',
    filePath: 'app/services/payment_service.py',
    name: 'process_payment',
    symbolType: 'async_function',
    lineStart: 12,
    lineEnd: 24,
    signature: 'async def process_payment(self, order_id: str, payment_method_id: str) -> dict',
    complexity: 'O(1) Network I/O bound',
    concurrency: 'Asynchronous (async/await)',
    docstring: 'Process incoming transaction and finalize order state.',
    explanation: 'Coordinates order verification and triggers Stripe charge API idempotently with error handling for non-existent orders.',
    beginnerExplanation: 'Given an order ID and a payment card, it charges the card and returns a receipt code.',
    dependencies: [
      { name: 'OrderService.get_order_by_id', path: 'app/services/order_service.py', type: 'Function' },
      { name: 'StripeGateway.create_charge', path: 'app/gateways/stripe_client.py', type: 'Function' },
    ],
  },
  {
    id: 'sym-auth-service',
    repositoryId: 'repo-backend-api',
    fileId: 'file-auth-service',
    filePath: 'app/services/auth_service.py',
    name: 'AuthService',
    symbolType: 'class',
    lineStart: 7,
    lineEnd: 284,
    signature: 'class AuthService',
    complexity: 'O(1)',
    concurrency: 'Synchronous / Async Hybrid',
    docstring: 'Core authentication service managing JWTs and password assertions.',
    explanation: 'Issues, decodes, and verifies RS256 JWT tokens for API clients and manages token revocation state inside Redis.',
    beginnerExplanation: 'The security guard. Checks IDs and creates digital wristbands for logged-in users.',
    dependencies: [
      { name: 'SECRET_KEY', path: 'app/core/security.py', type: 'Config' },
      { name: 'Redis Cache', path: 'Port 6379', type: 'Cache' },
    ],
  },
  {
    id: 'sym-verify-jwt',
    repositoryId: 'repo-backend-api',
    fileId: 'file-auth-service',
    filePath: 'app/services/auth_service.py',
    name: 'verify_jwt_token',
    symbolType: 'async_function',
    lineStart: 18,
    lineEnd: 25,
    signature: 'async def verify_jwt_token(self, token: str) -> dict',
    complexity: 'O(1)',
    concurrency: 'Asynchronous',
    docstring: 'Validates JWT signature and returns claims payload.',
    explanation: 'Inspects token headers, checks expiry against UTC clock, and verifies signature against the secret key.',
    beginnerExplanation: 'Checks if a wristband is authentic and hasn\'t expired.',
    dependencies: [
      { name: 'jwt.decode', path: 'PyJWT library', type: 'Library' },
    ],
  },
];

export const SEED_ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'node-client',
    name: 'Frontend Client / Webhook',
    type: 'Module',
    port: 3000,
    status: 'Healthy',
    coveragePercent: 95,
    summary: 'Next.js 14 · Edge Ingress · TLS 1.3',
    subtext: 'Next.js 14 client portal and Stripe webhook callers.',
  },
  {
    id: 'node-gateway',
    name: 'API Gateway / FastAPI Router',
    type: 'API_Endpoint',
    status: 'Healthy',
    coveragePercent: 99,
    summary: 'prefix: /api/v1/ · CORS: Wildcard Strict · RateLimiter: TokenBucket',
    subtext: 'Handles routing, TLS termination, CORS policy enforcement, and authentication dependency injection.',
  },
  {
    id: 'node-user-service',
    name: 'User Management',
    type: 'Module',
    port: 8002,
    status: 'Healthy',
    coveragePercent: 88,
    summary: 'FastAPI · SQLAlchemy · Active 14 routes',
    subtext: 'User lifecycle, role assignment, profile metadata, and organization affiliations.',
    linkedFiles: [
      { path: 'app/services/user_service.py', lines: 145 },
      { path: 'app/models/user.py', lines: 72 },
    ],
    outwardCalls: [
      { target: 'PostgreSQL Cluster', method: 'async_session.execute()' },
    ],
    inboundCallers: 8,
  },
  {
    id: 'node-auth-service',
    name: 'Auth Service',
    type: 'Module',
    port: 8001,
    status: 'Healthy',
    coveragePercent: 92,
    summary: 'Core JWT auth, OAuth2 handshakes, and access control tokens.',
    subtext: 'Validates AuthBearer tokens across 14 routes, communicates with Redis blacklist, and manages session lifecycle.',
    endpoints: [
      { method: 'POST', path: '/api/v1/auth/login', handler: 'login(payload: LoginSchema)' },
      { method: 'POST', path: '/api/v1/auth/refresh', handler: 'refresh_access_token()' },
    ],
    functions: [
      { name: 'verify_jwt_token(token: str)', returns: 'TokenPayload' },
    ],
    linkedFiles: [
      { path: 'app/services/auth_service.py', lines: 284 },
      { path: 'app/api/v1/auth_routes.py', lines: 192 },
      { path: 'app/core/security.py', lines: 88 },
    ],
    outwardCalls: [
      { target: 'User Management', method: 'find_by_email()' },
      { target: 'Redis Cache v7.2', method: 'cache_session()' },
    ],
    inboundCallers: 14,
  },
  {
    id: 'node-payment-service',
    name: 'Payment Service',
    type: 'Module',
    port: 8003,
    status: 'Healthy',
    coveragePercent: 90,
    summary: 'Stripe SDK · Webhooks · Idempotency Locked',
    subtext: 'Processes charges, refunds, credit transactions, and handles webhook reconciliation.',
    linkedFiles: [
      { path: 'app/services/payment_service.py', lines: 28 },
      { path: 'app/api/v1/billing_routes.py', lines: 95 },
    ],
    outwardCalls: [
      { target: 'Stripe Gateway', method: 'create_charge()' },
      { target: 'PostgreSQL Cluster', method: 'order.commit()' },
    ],
    inboundCallers: 3,
  },
  {
    id: 'node-notification-queue',
    name: 'Notification Queue',
    type: 'Module',
    status: 'Healthy',
    coveragePercent: 86,
    summary: 'Celery + RabbitMQ · 124 msgs / min',
    subtext: 'Asynchronous email dispatch, webhook retries, and slack bot alerting.',
    inboundCallers: 6,
  },
  {
    id: 'node-redis',
    name: 'Redis Cache v7.2',
    type: 'Cache_Store',
    port: 6379,
    status: 'Healthy',
    coveragePercent: 100,
    summary: 'Session Store · Token Blacklist · 1.2ms latency',
    subtext: 'Fast in-memory cache for distributed token revocation and rate-limit counters.',
  },
  {
    id: 'node-postgres',
    name: 'PostgreSQL Cluster',
    type: 'Database_Model',
    port: 5432,
    status: 'Healthy',
    coveragePercent: 100,
    summary: 'Primary + Read Replica · 24 tables',
    subtext: 'ACID transactional data store managing orders, users, teams, and knowledge graph persistence.',
  },
];

export const SEED_ARCHITECTURE_EDGES: ArchitectureEdge[] = [
  { id: 'edge-1', source: 'node-client', target: 'node-gateway', type: 'EXPOSES', label: 'HTTP / TLS 1.3', isVerified: true, animated: true },
  { id: 'edge-2', source: 'node-gateway', target: 'node-user-service', type: 'CALLS', label: '/users/*', isVerified: true },
  { id: 'edge-3', source: 'node-gateway', target: 'node-auth-service', type: 'CALLS', label: '/auth/*', isVerified: true, animated: true },
  { id: 'edge-4', source: 'node-gateway', target: 'node-payment-service', type: 'CALLS', label: '/billing/*', isVerified: true },
  { id: 'edge-5', source: 'node-auth-service', target: 'node-user-service', type: 'DEPENDS_ON', label: 'find_by_email', isVerified: true },
  { id: 'edge-6', source: 'node-auth-service', target: 'node-redis', type: 'USES', label: 'cache_token', isVerified: true, animated: true },
  { id: 'edge-7', source: 'node-user-service', target: 'node-postgres', type: 'USES', label: 'SQLAlchemy 2.0', isVerified: true },
  { id: 'edge-8', source: 'node-payment-service', target: 'node-postgres', type: 'USES', label: 'order.commit()', isVerified: true },
  { id: 'edge-9', source: 'node-payment-service', target: 'node-notification-queue', type: 'CALLS', label: 'OrderPaid Event', isVerified: true },
];

export const SEED_IMPACT_SIMULATION: ImpactSimulation = {
  id: 'impact-payment-process',
  repositoryId: 'repo-backend-api',
  targetFile: 'app/services/payment_service.py',
  targetSymbol: 'process_payment(order_id, payment_method_id)',
  branchDiff: 'Local Staged Diff (vs origin/main) +42 -8',
  blastRadiusScore: 68,
  riskLevel: 'MEDIUM',
  directDependenciesCount: 4,
  affectedApisCount: 3,
  testSpecsCount: 12,
  vulnerabilities: [
    {
      id: 'vuln-1',
      title: 'Contract Signature Mismatch',
      location: 'checkout_api.py:42',
      description: 'Modifying the return type to an async PaymentResult wrapper will cause caller checkout_api.py to encounter an unhandled coroutine await exception.',
      fixSuggestion: 'Update endpoint consumer with await or retain dictionary return type for backward compatibility.',
      severity: 'CRITICAL',
      icon: 'cancel',
    },
    {
      id: 'vuln-2',
      title: 'Database Session Lock',
      location: 'payment_service.py:145',
      description: 'Shared async database transaction lock across order.commit() creates a deadlock vulnerability when retried in concurrent webhooks.',
      fixSuggestion: 'Use isolated sub-transactions with select_for_update(nowait=True).',
      severity: 'WARNING',
      icon: 'lock_reset',
    },
  ],
  recommendedTests: [
    {
      id: 'test-1',
      title: 'Payment failure fallback test',
      path: 'tests/unit/test_payment_fail.py',
      status: 'Passing',
      timeEstimate: '0.24s',
      isChecked: true,
    },
    {
      id: 'test-2',
      title: 'Stripe Gateway network timeout scenario',
      path: 'tests/integration/test_timeouts.py',
      status: 'Passing',
      timeEstimate: 'Mocked HTTP 504',
      isChecked: true,
    },
    {
      id: 'test-3',
      title: 'Checkout idempotency replay test',
      path: 'tests/integration/test_idempotency.py',
      status: 'Missing Mock',
      timeEstimate: 'Requires update',
      isChecked: false,
      badge: 'MISSING MOCK',
    },
  ],
  topologyNodes: [
    {
      id: 'node-root',
      label: 'payment_service.py',
      path: 'L:118 ::process_payment',
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

export const SEED_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'step-day-1',
    dayNumber: 1,
    orderIndex: 1,
    title: 'Project Fundamentals & Development Environment',
    description: 'Clone the repository, configure virtualenv/poetry dependencies, inspect Docker Compose, and verify test runner.',
    astTargetPath: 'README.md',
    estimatedMins: 30,
    status: 'Completed',
    milestones: [
      { id: 'm-1', title: 'Local Environment Setup', subtext: 'Docker & Poetry verified', status: 'completed' },
      { id: 'm-2', title: 'Healthcheck Endpoint', subtext: 'curl localhost:8000/health', status: 'completed' },
    ],
  },
  {
    id: 'step-day-2',
    dayNumber: 2,
    orderIndex: 2,
    title: 'Authentication Architecture & JWT Middleware',
    description: 'Understand how AuthBearer tokens are verified in auth_service.py and injected into FastAPI request state dependencies. Master dependency overrides during pytest fixtures.',
    astTargetPath: '/app/core/security.py',
    estimatedMins: 45,
    status: 'In Progress',
    milestones: [
      { id: 'm-3', title: 'Token Signing', subtext: 'RS256 Private Key', status: 'completed' },
      { id: 'm-4', title: 'Middleware Pipeline', subtext: 'In Progress · Step 2', status: 'in_progress' },
      { id: 'm-5', title: 'Session Revocation', subtext: 'Next · Redis Cache', status: 'next' },
    ],
  },
  {
    id: 'step-day-3',
    dayNumber: 3,
    orderIndex: 3,
    title: 'Database Layer & SQLAlchemy 2.0 Async Session',
    description: 'Explore the declarative database models in app/models, inspect async connection pooling, and learn Alembic migrations.',
    astTargetPath: '/app/models/order.py',
    estimatedMins: 50,
    status: 'Pending',
    milestones: [
      { id: 'm-6', title: 'Model Schema Introspection', subtext: 'PostgreSQL tables', status: 'next' },
      { id: 'm-7', title: 'Async Session Fixtures', subtext: 'pytest-asyncio session', status: 'next' },
    ],
  },
  {
    id: 'step-day-4',
    dayNumber: 4,
    orderIndex: 4,
    title: 'Payment Orchestration & Third-Party Gateway Integration',
    description: 'Trace payment transactions through PaymentService, mock Stripe API responses, and analyze idempotency keys.',
    astTargetPath: '/app/services/payment_service.py',
    estimatedMins: 40,
    status: 'Pending',
    milestones: [
      { id: 'm-8', title: 'Stripe Webhooks', subtext: 'Signature verification', status: 'next' },
    ],
  },
  {
    id: 'step-day-5',
    dayNumber: 5,
    orderIndex: 5,
    title: 'First Code Contribution & Automated Pull Request Test Suite',
    description: 'Pick a beginner task, implement RFC validation, write pytest test assertions, and submit a pull request.',
    astTargetPath: 'app/api/v1/users.py',
    estimatedMins: 60,
    status: 'Pending',
    milestones: [
      { id: 'm-9', title: 'PR Submission', subtext: 'CI/CD pipeline green', status: 'next' },
    ],
  },
];

export const SEED_BEGINNER_TASKS: BeginnerTask[] = [
  {
    id: 'task-1',
    repositoryId: 'repo-backend-api',
    title: 'Add regex validation to user email registration',
    description: 'Update payload schemas in schemas/user.py with RFC 5322 compliance to reject malformed domain entries.',
    difficulty: 'Beginner',
    estimatedTime: '~30m',
    skills: ['FastAPI', 'Pydantic', 'Python'],
    relevantFiles: ['app/schemas/user.py', 'app/api/v1/auth_routes.py', 'tests/test_auth.py'],
    prerequisites: 'Basic knowledge of Pydantic BaseModel and regex validator decorators.',
    expectedOutput: 'Registration returns HTTP 422 Unprocessable Entity with clear error messages when invalid emails are submitted.',
    hints: [
      'Use Pydantic @field_validator with email-validator package.',
      'Check existing pattern in app/schemas/base.py.',
    ],
    status: 'Available',
  },
  {
    id: 'task-2',
    repositoryId: 'repo-backend-api',
    title: 'Fix JWT expiry error response schema',
    description: 'Align 401 response model across auth.py to return standardized ErrorEnvelope schema.',
    difficulty: 'Beginner',
    estimatedTime: '~20m',
    skills: ['Pydantic', 'FastAPI', 'Error Handling'],
    relevantFiles: ['app/core/security.py', 'app/services/auth_service.py'],
    prerequisites: 'Familiarity with FastAPI HTTPException custom handlers.',
    expectedOutput: 'Unified JSON response structure: {"error": {"code": "TOKEN_EXPIRED", "message": "Signature has expired"}}',
    hints: [
      'Use the standard ErrorResponse model in app/schemas/common.py.',
    ],
    status: 'Available',
  },
  {
    id: 'task-3',
    repositoryId: 'repo-backend-api',
    title: 'Add Redis cache healthcheck ping endpoint',
    description: 'Expose /health/redis endpoint that tests connection ping and reports roundtrip latency in milliseconds.',
    difficulty: 'Beginner',
    estimatedTime: '~25m',
    skills: ['Redis', 'FastAPI', 'Monitoring'],
    relevantFiles: ['app/api/v1/health.py', 'app/core/cache.py'],
    prerequisites: 'Basic async Redis ping command knowledge.',
    expectedOutput: '{"status": "ok", "latency_ms": 1.2, "redis_version": "7.2"}',
    hints: [
      'Catch redis.exceptions.ConnectionError and return HTTP 503 Service Unavailable.',
    ],
    status: 'Available',
  },
];

export const SEED_CONVERSATIONS: ChatMessage[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-main',
    senderType: 'user',
    content: "Explain this project like I'm a beginner, and walk me through what happens when a checkout request comes in.",
    timestamp: 'Today at 10:14 AM',
  },
  {
    id: 'msg-2',
    conversationId: 'conv-main',
    senderType: 'assistant',
    content: `DevGuide Backend is structured as a modern asynchronous FastAPI microservice with three core operational layers:

**01. INGRESS & ROUTING**
FastAPI endpoint routers declared in \`app/api/v1/...\` with Pydantic payload validation.

**02. SERVICE DOMAIN LOGIC**
Decoupled orchestration in \`app/services/...\` managing external APIs and business rules.

**03. PERSISTENCE & CACHE**
SQLAlchemy 2.0 AsyncSession for PostgreSQL alongside Redis v7.2 write-through session keys.`,
    timestamp: 'Today at 10:14 AM',
    confidence: 99.4,
    sources: [
      { path: 'app/api/v1/billing_routes.py:42', label: 'Route: POST /checkout' },
      { path: 'app/services/payment_service.py:118', label: 'Method: process_payment()' },
      { path: 'app/services/auth_service.py:84', label: 'Dependency: JWT Bearer DI' },
      { path: 'README.md:12', label: 'Doc: High-Level Architecture Overview' },
    ],
    lifecycleTrace: {
      hops: ['POST /checkout', 'JWT Validation', 'PaymentService'],
      apis: [
        { name: 'Stripe Gateway API', detail: 'PaymentIntent with Idempotency token', icon: 'credit_card' },
        { name: 'PostgreSQL Commit', detail: 'Order status updated to PAID inside session', icon: 'database' },
      ],
    },
    codeBlock: {
      path: 'app/services/payment_service.py',
      line: 118,
      language: 'python',
      code: `async def process_payment(self, order_id: str, payment_method_id: str) -> PaymentResult:
    """Idempotently process an incoming checkout intent via Stripe."""
    order = await self.orders.get_order_by_id(order_id)
    charge = await self.stripe.create_charge(
        amount=order.amount_cents,
        currency=order.currency,
        idempotency_key=f"checkout_{order.id}_{order.version}"
    )
    return PaymentResult(status="success", charge_id=charge.id)`,
    },
  },
  {
    id: 'msg-3',
    conversationId: 'conv-main',
    senderType: 'user',
    content: 'What exceptions or failure modes should I handle when Stripe timeouts occur?',
    timestamp: 'Today at 10:16 AM',
  },
  {
    id: 'msg-4',
    conversationId: 'conv-main',
    senderType: 'assistant',
    content: `When communicating with Stripe under high concurrency, you need to catch \`stripe.error.APIConnectionError\`. In this repository, that is abstracted into three distinct failure protocols:

- **Idempotent Replay:** All charge requests in \`app/services/payment_service.py\` attach the deterministic UUID generated during order draft creation.
- **Background Task Offloading:** If a timeout exceeds 4000ms, the router yields a \`202 Accepted\` with an \`ORDER_PENDING_SETTLEMENT\` state and queues a Celery worker retry task with exponential jitter.
- **Database Rollback Protection:** Ensure the SQLAlchemy session is explicitly rolled back using the async context manager to avoid transaction leaks on PostgreSQL pool connections.`,
    timestamp: 'Today at 10:16 AM',
    confidence: 98.8,
    sources: [
      { path: 'app/services/payment_service.py:145', label: 'Rollback handler' },
      { path: 'app/gateways/stripe_client.py:64', label: 'APIConnectionError interceptor' },
    ],
  },
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    timestamp: '12m ago',
    userName: 'Alex Chen',
    action: 'AST_SCAN_EXECUTED',
    resource: 'app/services/payment_service.py',
    details: 'Triggered deep blast radius impact check on process_payment()',
    ip: '192.168.1.42',
  },
  {
    id: 'audit-2',
    timestamp: '2h ago',
    userName: 'Sarah Jenkins',
    action: 'REPOSITORY_SYNCED',
    resource: 'backend-api',
    details: 'Synchronized commit 8df29c with AST knowledge graph',
    ip: '10.0.4.19',
  },
  {
    id: 'audit-3',
    timestamp: '1d ago',
    userName: 'Marcus Vance',
    action: 'ROLE_MODIFIED',
    resource: 'Alex Chen',
    details: 'Assigned role Developer with Full Repo Read access',
    ip: '172.16.0.8',
  },
];
