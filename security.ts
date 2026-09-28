import { UserRole } from '../../../database/types';

export type Permission =
  | 'MANAGE_USERS'
  | 'MANAGE_ORGANIZATIONS'
  | 'CONNECT_REPOSITORIES'
  | 'DELETE_REPOSITORIES'
  | 'RUN_IMPACT_SCAN'
  | 'ASSIGN_TASKS'
  | 'COMPLETE_TASKS'
  | 'VIEW_CODEBASE'
  | 'QUERY_AI_COPILOT'
  | 'VIEW_AUDIT_LOGS'
  | 'CONFIGURE_SYSTEM';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Owner: [
    'MANAGE_USERS',
    'MANAGE_ORGANIZATIONS',
    'CONNECT_REPOSITORIES',
    'DELETE_REPOSITORIES',
    'RUN_IMPACT_SCAN',
    'ASSIGN_TASKS',
    'COMPLETE_TASKS',
    'VIEW_CODEBASE',
    'QUERY_AI_COPILOT',
    'VIEW_AUDIT_LOGS',
    'CONFIGURE_SYSTEM',
  ],
  Admin: [
    'MANAGE_USERS',
    'MANAGE_ORGANIZATIONS',
    'CONNECT_REPOSITORIES',
    'RUN_IMPACT_SCAN',
    'ASSIGN_TASKS',
    'COMPLETE_TASKS',
    'VIEW_CODEBASE',
    'QUERY_AI_COPILOT',
    'VIEW_AUDIT_LOGS',
    'CONFIGURE_SYSTEM',
  ],
  'Team Lead': [
    'CONNECT_REPOSITORIES',
    'RUN_IMPACT_SCAN',
    'ASSIGN_TASKS',
    'COMPLETE_TASKS',
    'VIEW_CODEBASE',
    'QUERY_AI_COPILOT',
    'VIEW_AUDIT_LOGS',
  ],
  Developer: [
    'RUN_IMPACT_SCAN',
    'COMPLETE_TASKS',
    'VIEW_CODEBASE',
    'QUERY_AI_COPILOT',
  ],
  Viewer: [
    'VIEW_CODEBASE',
    'QUERY_AI_COPILOT',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}
