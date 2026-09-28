export type UserRole = 'Owner' | 'Admin' | 'Team Lead' | 'Developer' | 'Viewer';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LearningStyle = 'Visual' | 'Step-by-step' | 'Documentation-first' | 'Hands-on';
export type RepoStatus = 'Queued' | 'Cloning' | 'Parsing' | 'Indexing' | 'Completed' | 'Failed';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type NodeType = 'Module' | 'Class' | 'Function' | 'API_Endpoint' | 'Database_Model' | 'Test_Spec' | 'Cache_Store';
export type EdgeType = 'IMPORTS' | 'CALLS' | 'DEPENDS_ON' | 'DEFINED_IN' | 'TESTED_BY' | 'EXPOSES' | 'USES' | 'REFERENCES';

export interface User {
  id: string;
  organizationId: string;
  email: string;
  username: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  experienceLevel: ExperienceLevel;
  preferredLearningStyle: LearningStyle;
  programmingLanguages: string[];
  skills: string[];
  onboardingStatus: string;
  onboardingVelocity: number;
  emailVerified: boolean;
  lastActive: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  avatarUrl: string;
  plan: string;
  createdAt: string;
}

export interface Team {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  memberCount?: number;
}

export interface Repository {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description: string;
  githubUrl: string;
  defaultBranch: string;
  isPrivate: boolean;
  isDemo: boolean;
  status: RepoStatus;
  filesCount: number;
  linesOfCode: number;
  languages: Record<string, number>;
  astQuotaUsed: number;
  astQuotaLimit: number;
  understoodPercent: number;
  lastAnalyzedAt: string;
  createdAt: string;
}

export interface RepositoryFile {
  id: string;
  repositoryId: string;
  path: string;
  filename: string;
  extension: string;
  language: string;
  sizeBytes: number;
  lineCount: number;
  content: string;
  summary: string;
  beginnerSummary: string;
  symbolsCount: number;
}

export interface CodeSymbol {
  id: string;
  repositoryId: string;
  fileId: string;
  filePath: string;
  name: string;
  symbolType: 'class' | 'function' | 'async_function' | 'endpoint' | 'model';
  lineStart: number;
  lineEnd: number;
  signature: string;
  complexity: string;
  concurrency: string;
  docstring: string;
  explanation: string;
  beginnerExplanation: string;
  dependencies: { name: string; path: string; type: string }[];
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: NodeType;
  filePath?: string;
  port?: number;
  status: 'Healthy' | 'Warning' | 'Down';
  coveragePercent: number;
  summary?: string;
  subtext?: string;
  endpoints?: { method: string; path: string; handler: string }[];
  functions?: { name: string; returns: string }[];
  linkedFiles?: { path: string; lines: number }[];
  outwardCalls?: { target: string; method: string }[];
  inboundCallers?: number;
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
  isVerified: boolean;
  animated?: boolean;
}

export interface ImpactVulnerability {
  id: string;
  title: string;
  location: string;
  description: string;
  fixSuggestion?: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  icon: string;
}

export interface RecommendedTest {
  id: string;
  title: string;
  path: string;
  status: 'Passing' | 'Failing' | 'Missing Mock' | 'Pending';
  timeEstimate: string;
  isChecked: boolean;
  badge?: string;
}

export interface ImpactSimulation {
  id: string;
  repositoryId: string;
  targetFile: string;
  targetSymbol: string;
  branchDiff: string;
  blastRadiusScore: number;
  riskLevel: RiskLevel;
  directDependenciesCount: number;
  affectedApisCount: number;
  testSpecsCount: number;
  vulnerabilities: ImpactVulnerability[];
  recommendedTests: RecommendedTest[];
  topologyNodes: {
    id: string;
    label: string;
    path: string;
    sublabel: string;
    type: 'root' | 'direct' | 'heuristic' | 'breaking';
    icon: string;
  }[];
}

export interface OnboardingMilestone {
  id: string;
  title: string;
  subtext: string;
  status: 'completed' | 'in_progress' | 'next';
}

export interface OnboardingStep {
  id: string;
  dayNumber: number;
  orderIndex: number;
  title: string;
  description: string;
  astTargetPath: string;
  estimatedMins: number;
  status: 'Completed' | 'In Progress' | 'Pending';
  milestones: OnboardingMilestone[];
}

export interface BeginnerTask {
  id: string;
  repositoryId: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate';
  estimatedTime: string;
  skills: string[];
  relevantFiles: string[];
  prerequisites: string;
  expectedOutput: string;
  hints: string[];
  status: 'Available' | 'Assigned' | 'In Progress' | 'Completed';
  assignedTo?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderType: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { path: string; lines?: string; symbol?: string; label?: string }[];
  codeBlock?: { path: string; line: number; code: string; language: string };
  lifecycleTrace?: {
    hops: string[];
    apis: { name: string; detail: string; icon: string }[];
  };
  confidence?: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ip: string;
}
