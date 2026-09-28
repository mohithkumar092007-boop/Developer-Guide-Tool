import {
  SEED_ORGANIZATION,
  SEED_USERS,
  SEED_TEAMS,
  SEED_REPOSITORIES,
  SEED_FILES,
  SEED_SYMBOLS,
  SEED_ARCHITECTURE_NODES,
  SEED_ARCHITECTURE_EDGES,
  SEED_IMPACT_SIMULATION,
  SEED_ONBOARDING_STEPS,
  SEED_BEGINNER_TASKS,
  SEED_CONVERSATIONS,
  SEED_AUDIT_LOGS
} from './seed';

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

class DevGuideDatabase {
  private organization: Organization = { ...SEED_ORGANIZATION };
  private users: User[] = [...SEED_USERS];
  private teams: Team[] = [...SEED_TEAMS];
  private repositories: Repository[] = [...SEED_REPOSITORIES];
  private files: RepositoryFile[] = [...SEED_FILES];
  private symbols: CodeSymbol[] = [...SEED_SYMBOLS];
  private architectureNodes: ArchitectureNode[] = [...SEED_ARCHITECTURE_NODES];
  private architectureEdges: ArchitectureEdge[] = [...SEED_ARCHITECTURE_EDGES];
  private impactSimulation: ImpactSimulation = { ...SEED_IMPACT_SIMULATION };
  private onboardingSteps: OnboardingStep[] = [...SEED_ONBOARDING_STEPS];
  private tasks: BeginnerTask[] = [...SEED_BEGINNER_TASKS];
  private messages: ChatMessage[] = [...SEED_CONVERSATIONS];
  private auditLogs: AuditLog[] = [...SEED_AUDIT_LOGS];

  // Organization
  getOrganization() {
    return this.organization;
  }

  // Users
  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find(u => u.id === id);
  }

  getCurrentUser() {
    return this.users[0]; // Alex Chen by default
  }

  updateUserProfile(id: string, updates: Partial<User>) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...updates };
      return this.users[idx];
    }
    return null;
  }

  // Teams
  getTeams() {
    return this.teams;
  }

  // Repositories
  getRepositories() {
    return this.repositories;
  }

  getRepositoryBySlug(slug: string) {
    return this.repositories.find(r => r.slug === slug) || this.repositories[0];
  }

  addRepository(repo: Partial<Repository>) {
    const newRepo: Repository = {
      id: `repo-${Date.now()}`,
      organizationId: this.organization.id,
      name: repo.name || 'new-repo',
      slug: (repo.name || 'new-repo').toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      description: repo.description || 'Imported repository parsed via AST engine',
      githubUrl: repo.githubUrl || 'https://github.com/custom/repo',
      defaultBranch: repo.defaultBranch || 'main',
      isPrivate: repo.isPrivate || false,
      isDemo: repo.isDemo || false,
      status: 'Completed',
      filesCount: repo.filesCount || 42,
      linesOfCode: repo.linesOfCode || 18400,
      languages: repo.languages || { Python: 80, TypeScript: 20 },
      astQuotaUsed: 1200,
      astQuotaLimit: 10000,
      understoodPercent: 65,
      lastAnalyzedAt: 'Just now',
      createdAt: new Date().toISOString(),
      ...repo
    };
    this.repositories.unshift(newRepo);

    this.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      userName: this.getCurrentUser().name,
      action: 'REPOSITORY_CONNECTED',
      resource: newRepo.name,
      details: `Connected repo from ${newRepo.githubUrl} and parsed initial AST topology`,
      ip: '127.0.0.1',
    });

    return newRepo;
  }

  // Files
  getFiles(repoId?: string) {
    if (repoId) {
      return this.files.filter(f => f.repositoryId === repoId);
    }
    return this.files;
  }

  getFileByPath(path: string) {
    return this.files.find(f => f.path === path) || this.files[0];
  }

  // Symbols
  getSymbols(fileId?: string) {
    if (fileId) {
      return this.symbols.filter(s => s.fileId === fileId);
    }
    return this.symbols;
  }

  getSymbolByName(name: string) {
    return this.symbols.find(s => s.name === name || s.name.includes(name));
  }

  // Architecture Graph
  getArchitecture(repoId?: string) {
    return {
      nodes: this.architectureNodes,
      edges: this.architectureEdges,
    };
  }

  // Impact Simulation
  getImpactSimulation(targetFile?: string, targetSymbol?: string) {
    return this.impactSimulation;
  }

  runImpactScan(targetFile: string, targetSymbol: string): ImpactSimulation {
    this.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      userName: this.getCurrentUser().name,
      action: 'AST_SCAN_EXECUTED',
      resource: `${targetFile}::${targetSymbol}`,
      details: 'Deep AST blast radius simulation executed across dependency trees',
      ip: '127.0.0.1',
    });
    return this.impactSimulation;
  }

  // Onboarding
  getOnboardingSteps(userId?: string) {
    return this.onboardingSteps;
  }

  completeOnboardingMilestone(stepId: string, milestoneId: string) {
    const step = this.onboardingSteps.find(s => s.id === stepId);
    if (step) {
      const ms = step.milestones.find(m => m.id === milestoneId);
      if (ms) {
        ms.status = 'completed';
      }
      const allDone = step.milestones.every(m => m.status === 'completed');
      if (allDone) {
        step.status = 'Completed';
      }
    }
    return this.onboardingSteps;
  }

  // Tasks
  getTasks(repoId?: string) {
    return this.tasks;
  }

  updateTaskStatus(taskId: string, status: BeginnerTask['status']) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
    }
    return task;
  }

  // Chat
  getMessages() {
    return this.messages;
  }

  addMessage(msg: Partial<ChatMessage>) {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: msg.conversationId || 'conv-main',
      senderType: msg.senderType || 'user',
      content: msg.content || '',
      timestamp: 'Just now',
      sources: msg.sources || [],
      confidence: msg.confidence || 98.5,
      ...msg,
    };
    this.messages.push(newMsg);
    return newMsg;
  }

  // Audit Logs
  getAuditLogs() {
    return this.auditLogs;
  }

  // Global Search
  search(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return { files: [], symbols: [], tasks: [] };

    const matchingFiles = this.files.filter(f =>
      f.path.toLowerCase().includes(q) || f.filename.toLowerCase().includes(q) || f.summary.toLowerCase().includes(q)
    );
    const matchingSymbols = this.symbols.filter(s =>
      s.name.toLowerCase().includes(q) || s.signature.toLowerCase().includes(q) || s.filePath.toLowerCase().includes(q)
    );
    const matchingTasks = this.tasks.filter(t =>
      t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );

    return {
      files: matchingFiles,
      symbols: matchingSymbols,
      tasks: matchingTasks,
    };
  }
}

export const db = new DevGuideDatabase();
