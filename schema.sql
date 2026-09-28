-- ============================================================================
-- DEVGUIDE AI - DATABASE SCHEMA (PostgreSQL)
-- Platform: Multi-tenant Codebase Intelligence & Developer Onboarding Platform
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types
CREATE TYPE user_role AS ENUM ('Owner', 'Admin', 'Team Lead', 'Developer', 'Viewer');
CREATE TYPE exp_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE learning_style AS ENUM ('Visual', 'Step-by-step', 'Documentation-first', 'Hands-on');
CREATE TYPE repo_status AS ENUM ('Queued', 'Cloning', 'Parsing', 'Indexing', 'Completed', 'Failed');
CREATE TYPE node_type AS ENUM ('Module', 'Class', 'Function', 'API_Endpoint', 'Database_Model', 'Test_Spec', 'Cache_Store');
CREATE TYPE edge_type AS ENUM ('IMPORTS', 'CALLS', 'DEPENDS_ON', 'DEFINED_IN', 'TESTED_BY', 'EXPOSES', 'USES', 'REFERENCES');
CREATE TYPE risk_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- 1. Organizations
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    plan VARCHAR(32) DEFAULT 'Enterprise',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 2. Teams
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(64) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(128) NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'Developer',
    experience_level exp_level DEFAULT 'Intermediate',
    preferred_learning_style learning_style DEFAULT 'Hands-on',
    programming_languages TEXT[] DEFAULT ARRAY['Python', 'TypeScript'],
    skills TEXT[] DEFAULT ARRAY['REST APIs', 'FastAPI', 'Docker', 'PostgreSQL'],
    onboarding_status VARCHAR(64) DEFAULT 'In Progress',
    onboarding_velocity INT DEFAULT 64,
    email_verified BOOLEAN DEFAULT TRUE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 4. Team Members (Many-to-Many)
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'Developer',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, user_id)
);

-- 5. Repositories
CREATE TABLE repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) NOT NULL,
    description TEXT,
    github_url TEXT NOT NULL,
    default_branch VARCHAR(64) DEFAULT 'main',
    is_private BOOLEAN DEFAULT FALSE,
    is_demo BOOLEAN DEFAULT FALSE,
    status repo_status DEFAULT 'Completed',
    files_count INT DEFAULT 0,
    lines_of_code INT DEFAULT 0,
    languages JSONB DEFAULT '{"Python": 68, "TypeScript": 24, "SQL": 8}'::jsonb,
    ast_quota_used INT DEFAULT 8400,
    ast_quota_limit INT DEFAULT 10000,
    last_analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, slug)
);

-- 6. Repository Files
CREATE TABLE repository_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    path VARCHAR(512) NOT NULL,
    filename VARCHAR(128) NOT NULL,
    extension VARCHAR(32) NOT NULL,
    language VARCHAR(64) NOT NULL,
    size_bytes INT NOT NULL DEFAULT 0,
    line_count INT NOT NULL DEFAULT 0,
    content TEXT NOT NULL,
    summary TEXT,
    beginner_summary TEXT,
    ast_symbols_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(repository_id, path)
);

-- 7. Code Symbols (Classes, Functions, Endpoints)
CREATE TABLE code_symbols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    file_id UUID NOT NULL REFERENCES repository_files(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    symbol_type VARCHAR(64) NOT NULL, -- 'class', 'function', 'async_function', 'endpoint', 'model'
    line_start INT NOT NULL,
    line_end INT NOT NULL,
    signature TEXT NOT NULL,
    complexity VARCHAR(32) DEFAULT 'O(1)',
    concurrency VARCHAR(32) DEFAULT 'Asynchronous',
    docstring TEXT,
    explanation TEXT,
    beginner_explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Knowledge Graph Entities
CREATE TABLE knowledge_graph_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    entity_type node_type NOT NULL,
    file_path VARCHAR(512),
    port INT,
    status VARCHAR(32) DEFAULT 'Healthy',
    coverage_percent INT DEFAULT 90,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Knowledge Graph Relationships (Edges)
CREATE TABLE knowledge_graph_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    source_entity_id UUID NOT NULL REFERENCES knowledge_graph_entities(id) ON DELETE CASCADE,
    target_entity_id UUID NOT NULL REFERENCES knowledge_graph_entities(id) ON DELETE CASCADE,
    relationship_type edge_type NOT NULL,
    call_signature TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Document Chunks & Semantic Embeddings (RAG)
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    file_id UUID NOT NULL REFERENCES repository_files(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    line_start INT NOT NULL,
    line_end INT NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding VECTOR(768), -- for pgvector compatibility
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Conversations & Messages (AI Repository Chat)
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    scope VARCHAR(64) DEFAULT 'All Repo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(16) NOT NULL, -- 'user' or 'assistant'
    content TEXT NOT NULL,
    sources JSONB DEFAULT '[]'::jsonb,
    diagram_data JSONB,
    confidence NUMERIC(5,2) DEFAULT 99.4,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Onboarding Plans & Steps
CREATE TABLE onboarding_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    progress_percent INT DEFAULT 0,
    estimated_total_mins INT DEFAULT 360,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE onboarding_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES onboarding_plans(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    order_index INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    ast_target_path VARCHAR(512) NOT NULL,
    estimated_mins INT NOT NULL DEFAULT 45,
    status VARCHAR(32) DEFAULT 'Pending', -- 'Completed', 'In Progress', 'Pending'
    completed_at TIMESTAMP WITH TIME ZONE,
    milestones JSONB DEFAULT '[]'::jsonb
);

-- 13. Beginner Friendly Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(32) DEFAULT 'Beginner',
    estimated_time VARCHAR(32) DEFAULT '~30m',
    skills TEXT[] DEFAULT ARRAY['FastAPI', 'Python'],
    relevant_files TEXT[] DEFAULT ARRAY['schemas/user.py'],
    prerequisites TEXT,
    expected_output TEXT,
    hints TEXT[] DEFAULT ARRAY['Refer to RFC 5322 regex guidelines'],
    status VARCHAR(32) DEFAULT 'Available',
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Impact Analysis Simulations (Blast Radius)
CREATE TABLE impact_simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_file VARCHAR(512) NOT NULL,
    target_symbol VARCHAR(128) NOT NULL,
    branch_diff VARCHAR(64) DEFAULT 'Local Staged Diff',
    blast_radius_score INT DEFAULT 68,
    risk_level risk_level DEFAULT 'MEDIUM',
    direct_dependencies_count INT DEFAULT 4,
    affected_apis_count INT DEFAULT 3,
    test_specs_count INT DEFAULT 12,
    vulnerabilities JSONB DEFAULT '[]'::jsonb,
    recommended_tests JSONB DEFAULT '[]'::jsonb,
    topology_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(128) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(128),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast lookups
CREATE INDEX idx_users_org ON users(organization_id);
CREATE INDEX idx_repos_org ON repositories(organization_id);
CREATE INDEX idx_files_repo ON repository_files(repository_id);
CREATE INDEX idx_symbols_repo ON code_symbols(repository_id);
CREATE INDEX idx_symbols_file ON code_symbols(file_id);
CREATE INDEX idx_kg_entities_repo ON knowledge_graph_entities(repository_id);
CREATE INDEX idx_kg_rel_source ON knowledge_graph_relationships(source_entity_id);
CREATE INDEX idx_kg_rel_target ON knowledge_graph_relationships(target_entity_id);
CREATE INDEX idx_messages_conv ON messages(conversation_id);
CREATE INDEX idx_onboarding_plan_user ON onboarding_plans(user_id);
CREATE INDEX idx_tasks_repo ON tasks(repository_id);
CREATE INDEX idx_audit_org ON audit_logs(organization_id);
