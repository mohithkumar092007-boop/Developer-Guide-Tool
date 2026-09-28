# DevGuide AI - REST API Documentation

Base URL: `/api`

### Authentication & Users
- `GET /api/auth/me` - Get current user profile and organization info
- `POST /api/auth/update-profile` - Update user onboarding preferences and skills

### Repositories
- `GET /api/repositories` - List all connected and demo repositories
- `GET /api/repositories/:slug` - Get single repository metadata and AST quota
- `POST /api/repositories/connect` - Connect GitHub repo or local archive for AST parsing

### File Explorer
- `GET /api/files` - List repository file tree
- `GET /api/files/content?path=...` - Get file source and parsed AST symbols
- `POST /api/files/explain` - Run targeted AST analysis on file lines

### Architecture & Topology
- `GET /api/architecture` - Return DAG topology nodes and relationship edges

### AI Copilot Chat
- `GET /api/chat/messages` - Retrieve conversation history
- `POST /api/chat/query` - Submit a codebase query to Gemini 3.8 Flash with RAG grounding

### Impact Analysis
- `GET /api/impact` - Fetch latest blast radius simulation
- `POST /api/impact/scan` - Execute deep AST impact scan on file/symbol
- `POST /api/impact/generate-tests` - Generate automated pytest test suite for symbol

### Onboarding & Tasks
- `GET /api/onboarding/steps` - Get current user onboarding roadmap
- `POST /api/onboarding/milestone` - Complete or toggle a milestone
- `POST /api/onboarding/customize` - Generate customized roadmap from questionnaire
- `GET /api/tasks` - List beginner-friendly tasks
- `POST /api/tasks/:id/status` - Update task assignment/completion status

### Team & Governance
- `GET /api/team/members` - Get team members and onboarding velocities
- `GET /api/admin/audit-logs` - Inspect system security audit trail
- `GET /api/search?q=...` - Global semantic search across files, symbols, and tasks
