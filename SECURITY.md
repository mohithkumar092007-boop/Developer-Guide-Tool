# DevGuide AI - Security & Privacy Specification

## 1. Principles
- **Never Execute Untrusted Code**: Repository files are treated strictly as passive text data during AST parsing. No `eval()`, `exec()`, or runtime subprocesses are triggered against user source files.
- **Server-Side API Key Secrecy**: The `GEMINI_API_KEY` is kept exclusively on the server backend and never leaked to frontend browser bundles.
- **Role-Based Access Control (RBAC)**: Backend endpoints validate actor permissions before executing administrative changes or connecting private repos.
- **Ephemeral Sandbox & Non-Retention**: Source code vectors are processed in memory and not used to retrain foundational models.
- **Audit Logging**: Sensitive security events (role changes, repo connections, deep scans) are immutably appended to audit logs.
