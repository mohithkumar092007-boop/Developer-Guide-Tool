# DevGuide AI - Architecture Specification

## 1. System Topology & Information Flow

```text
       [Developer Web Client (React SPA)]
                       │
                       ▼
       [Express Gateway / Router (/api/*)]
           │           │              │
           ▼           ▼              ▼
   [RBAC Security] [AST Parser] [RAG & Vector Retrieval]
           │           │              │
           └───────────┼──────────────┘
                       ▼
          [Google Gemini 3.8 Flash]
                       │
                       ▼
         [PostgreSQL Database & Store]
```

## 2. Codebase Knowledge Graph (AST)

DevGuide AI parses repository source trees using semantic node extraction:
- **Entities**:
  - `Module`: File-level boundary
  - `Class`: Type declaration with encapsulated attributes and methods
  - `Function`: Synchronous / Asynchronous callable unit
  - `API_Endpoint`: Route handler with HTTP verb, path, and Pydantic schema
  - `Database_Model`: SQLAlchemy / ORM table mapping
  - `Test_Spec`: Pytest fixture or assertion assertion suite
- **Relationships**:
  - `IMPORTS`: Source file loads module
  - `CALLS`: Function invokes another function
  - `DEPENDS_ON`: Dependency injection token (e.g. `Depends()`)
  - `EXPOSES`: Route decorator binds handler to public ingress
  - `TESTED_BY`: Assertion spec asserts behavior

## 3. Impact Analysis Pipeline

1. **Target Selection**: User chooses a file and symbol (e.g., `process_payment`).
2. **Upstream Call Graph Search**: Traverses caller-callee hierarchies up to 2 hops.
3. **Contract Comparison**: Compares parameter signatures, return types, and async decorators against registered callers.
4. **Vulnerability Assessment**: Detects unhandled coroutines, missing mocks, and transaction deadlocks.
5. **Blast Radius Scoring**: Computes risk score between 0 and 100 categorized into LOW, MEDIUM, HIGH, or CRITICAL.
