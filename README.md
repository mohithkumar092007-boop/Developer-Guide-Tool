# DevGuide AI

> **Understand Any Codebase. Learn Faster. Contribute with Confidence.**

DevGuide AI is an AI-powered developer onboarding and codebase intelligence platform. The platform transforms unfamiliar GitHub repositories into an interactive, grounded learning experience with real AST parsing, live architecture topology, personalized onboarding roadmaps, beginner tasks, and blast radius impact analysis.

---

## 1. Key Capabilities

- **3-Pane IDE Code Explorer**:
  - Left pane: Project explorer with symbol counts and hierarchical file navigation.
  - Center pane: Code editor with line numbers, syntax highlighting, and highlighted line callouts.
  - Right pane: AST-grounded AI analysis, complexity ($O(1)$) and concurrency metrics, deep-linked dependency graph, and quick assist triggers (ELI5 beginner mode, edge cases, pytest generator).
- **Interactive System Architecture & Microservice Topology**:
  - Live Hierarchical DAG canvas displaying Ingress, API Gateway, Microservice Core (Auth, User Management, Payment, Notification Queue), and Persistence/Cache (Redis v7.2, PostgreSQL cluster).
  - Node Inspector detailing linked source files, API contracts, outward/inbound callers, unit coverage (92%), and risk telemetry.
- **Code Impact & Blast Radius Analyzer**:
  - Answers **"What could break if I change this?"** for any file, class, function, or API.
  - Categorizes downstream impacts into **VERIFIED DIRECT DEPENDENCY**, **AI INFERENCE**, and **POTENTIAL RISK**.
  - Identifies signature breaks and database session locks.
  - Generates recommended test plans and automated pytest test suites.
- **Ask Your Codebase (AI Repository Chat)**:
  - Grounded in actual AST symbols and repository files via Google Gemini (`gemini-3.8-flash`).
  - Strict anti-hallucination discipline: explicitly labels verified vs inferred vs unverified context.
  - Visual request lifecycle diagrams and direct source references with clickable code locations.
  - Multiple operational modes: **Beginner**, **Technical**, **Architecture**, **Debug**, **Learning**, and **Review**.
- **Personalized Developer Onboarding**:
  - Adaptive 5 to 7-day onboarding roadmaps tailored to experience level (Beginner / Intermediate / Advanced) and learning style (Visual / Step-by-step / Documentation-first / Hands-on).
  - Interactive milestone tracking and AST target file walkthroughs.
- **Beginner Task Recommendation Engine**:
  - Identifies low-complexity, well-bounded starter issues.
  - Complete with prerequisites, required skills, estimated completion time, relevant files, and implementation hints.
- **Team & Admin Governance**:
  - Multi-tenant Organization → Teams → Repositories → Developers structure.
  - Enforced Role-Based Access Control (**Owner**, **Admin**, **Team Lead**, **Developer**, **Viewer**).
  - Realtime security audit trails and SOC-2 Type II ephemeral sandbox isolation.

---

## 2. Architecture & Tech Stack

```text
├── database/               # Database DDL schemas, types, and persistence layer
│   ├── schema.sql          # PostgreSQL DDL with 15+ production tables and indexes
│   ├── types.ts            # Strongly-typed database entity contracts
│   ├── seed.ts             # Realistic seed repository dataset (FastAPI microservice)
│   └── index.ts            # Typed database queries and repository interface
├── backend/                # Server-side API and AI reasoning engine
│   ├── app/
│   │   ├── api/            # Express RESTful endpoints (/api/*)
│   │   ├── core/           # Security RBAC, config, and Gemini API integration
│   │   └── services/       # AST Parser, Impact Engine, Onboarding Engine
│   └── server.ts           # Root entry point running Express & Vite middleware
├── src/                    # Frontend React SPA
│   ├── frontend/
│   │   ├── components/     # Overview, Code Explorer, DAG Topology, Impact, Chat
│   │   └── types.ts        # UI contracts and navigation targets
│   ├── App.tsx             # Root view router and shared application state
│   ├── main.tsx            # DOM initialization
│   └── index.css           # Tailwind CSS theme and dark styling
```

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide & Material Symbols.
- **Backend**: Node.js / Express with TypeScript execution (`tsx`), `@google/genai` TypeScript SDK.
- **Database**: PostgreSQL 16 schema with `pgcrypto` and `uuid-ossp`, supported by an in-memory transactional store for immediate zero-config demo runs.
- **AI Model**: Google Gemini `gemini-3.8-flash` on the server side with `aistudio-build` User-Agent telemetry.

---

## 3. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# GEMINI_API_KEY: Required for Gemini AI codebase queries and reasoning
GEMINI_API_KEY="your-gemini-api-key"

# Port (default 3000)
PORT=3000
```

---

## 4. Quickstart & Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Opens `http://localhost:3000` with Express backend and Vite client hot-middleware.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run TypeScript check**:
   ```bash
   npm run lint
   ```

---

## 5. Hackathon Demonstration Flow

1. **Open DevGuide AI**: Land on the Overview Dashboard displaying active repository metrics (142k LoC parsed, 82% understood).
2. **Explore System Architecture**: Navigate to **Architecture** to view the interactive hierarchical DAG canvas with live animated signal transit. Select **Auth Service** to inspect endpoints, dependencies, and low-risk test coverage.
3. **Inspect Code in 3-Pane Explorer**: Navigate to **Code Explorer**. Open `payment_service.py` to see line 14 highlighted with "AI Analysis Ready". Toggle **ELI5 / Beginner Mode** to see analogies replace technical jargon.
4. **Run Blast Radius Impact Analysis**: Navigate to **Impact Analysis**. Select `process_payment()`. Run the Deep AST Impact Scan to reveal downstream vulnerabilities (Contract Signature Mismatch, Database Session Lock). Click **Generate Automated Test Suite** to instantly produce pytest fixtures.
5. **Ask Codebase**: Navigate to **AI Copilot**. Ask:
   - *"Explain this project like I'm a beginner."*
   - *"What exceptions or failure modes should I handle when Stripe timeouts occur?"*
   Notice the structured operational layers, request lifecycle trace, and clickable AST source citations.
6. **Beginner Tasks & Onboarding**: Explore the **Onboarding Roadmap** and **Beginner Tasks** to start a curated starter issue.
