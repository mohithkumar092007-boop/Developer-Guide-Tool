/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  Repository,
  RepositoryFile,
  ArchitectureNode,
  ImpactSimulation,
  OnboardingStep,
  BeginnerTask,
  ChatMessage,
  AuditLog,
  Team,
  UserRole,
  NavigationPage,
  AIMode,
} from './frontend/types';
import {
  SEED_USERS,
  SEED_REPOSITORIES,
  SEED_FILES,
  SEED_ARCHITECTURE_NODES,
  SEED_IMPACT_SIMULATION,
  SEED_ONBOARDING_STEPS,
  SEED_BEGINNER_TASKS,
  SEED_CONVERSATIONS,
  SEED_AUDIT_LOGS,
  SEED_TEAMS,
} from '../database/seed';
import { Sidebar } from './frontend/components/layout/Sidebar';
import { Header } from './frontend/components/layout/Header';
import { CommandPalette } from './frontend/components/layout/CommandPalette';
import { QuestionnaireModal } from './frontend/components/onboarding/QuestionnaireModal';
import { OverviewView } from './frontend/components/overview/OverviewView';
import { CodeExplorerView } from './frontend/components/code-explorer/CodeExplorerView';
import { ArchitectureView } from './frontend/components/architecture/ArchitectureView';
import { ImpactAnalysisView } from './frontend/components/impact/ImpactAnalysisView';
import { AICopilotView } from './frontend/components/copilot/AICopilotView';
import { RepositoriesView } from './frontend/components/repositories/RepositoriesView';
import { OnboardingView } from './frontend/components/onboarding/OnboardingView';
import { BeginnerTasksView } from './frontend/components/tasks/BeginnerTasksView';
import { TeamView } from './frontend/components/team/TeamView';
import { AdminView } from './frontend/components/admin/AdminView';
import { SettingsView } from './frontend/components/settings/SettingsView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const [currentUser, setCurrentUser] = useState<User>(SEED_USERS[0]);
  const [repositories, setRepositories] = useState<Repository[]>(SEED_REPOSITORIES);
  const [files, setFiles] = useState<RepositoryFile[]>(SEED_FILES);
  const [architectureNodes, setArchitectureNodes] = useState<ArchitectureNode[]>(SEED_ARCHITECTURE_NODES);
  const [impactSimulation, setImpactSimulation] = useState<ImpactSimulation>(SEED_IMPACT_SIMULATION);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>(SEED_ONBOARDING_STEPS);
  const [tasks, setTasks] = useState<BeginnerTask[]>(SEED_BEGINNER_TASKS);
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_CONVERSATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(SEED_AUDIT_LOGS);
  const [teams, setTeams] = useState<Team[]>(SEED_TEAMS);

  const [activeFileForExplorer, setActiveFileForExplorer] = useState<string>('app/services/payment_service.py');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState<boolean>(false);

  // Sync initial state from backend API if available
  useEffect(() => {
    async function loadData() {
      try {
        const [userRes, repoRes, fileRes, archRes, chatRes, impactRes, onbRes, taskRes] = await Promise.allSettled([
          fetch('/api/auth/me').then(r => r.json()),
          fetch('/api/repositories').then(r => r.json()),
          fetch('/api/files').then(r => r.json()),
          fetch('/api/architecture').then(r => r.json()),
          fetch('/api/chat/messages').then(r => r.json()),
          fetch('/api/impact').then(r => r.json()),
          fetch('/api/onboarding/steps').then(r => r.json()),
          fetch('/api/tasks').then(r => r.json()),
        ]);

        if (userRes.status === 'fulfilled' && userRes.value?.user) {
          setCurrentUser(userRes.value.user);
        }
        if (repoRes.status === 'fulfilled' && repoRes.value?.repositories) {
          setRepositories(repoRes.value.repositories);
        }
        if (fileRes.status === 'fulfilled' && fileRes.value?.files) {
          setFiles(fileRes.value.files);
        }
        if (archRes.status === 'fulfilled' && archRes.value?.nodes) {
          setArchitectureNodes(archRes.value.nodes);
        }
        if (chatRes.status === 'fulfilled' && chatRes.value?.messages) {
          setMessages(chatRes.value.messages);
        }
        if (impactRes.status === 'fulfilled' && impactRes.value) {
          setImpactSimulation(impactRes.value);
        }
        if (onbRes.status === 'fulfilled' && onbRes.value?.steps) {
          setOnboardingSteps(onbRes.value.steps);
        }
        if (taskRes.status === 'fulfilled' && taskRes.value?.tasks) {
          setTasks(taskRes.value.tasks);
        }
      } catch (e) {
        console.warn('API sync fallback to local database state:', e);
      }
    }

    loadData();
  }, []);

  // Handlers
  const handleSendMessage = async (text: string, mode?: AIMode, scope?: string) => {
    const tempUserMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: 'conv-main',
      senderType: 'user',
      content: text,
      timestamp: 'Just now',
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await fetch('/api/chat/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, mode, scope }),
      });
      const data = await res.json();
      if (data?.assistantMessage) {
        setMessages(prev => [...prev, data.assistantMessage]);
      }
    } catch {
      // Local fallback
      const fallbackAiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        conversationId: 'conv-main',
        senderType: 'assistant',
        content: `AST Knowledge Graph Analysis for: "${text}"\n\nIn **backend-api**, this flow coordinates through \`app/services/payment_service.py\` with verified dependencies to \`OrderService\` and \`StripeGateway\`.`,
        timestamp: 'Just now',
        confidence: 98.4,
        sources: [
          { path: 'app/services/payment_service.py:12', label: 'process_payment()' },
          { path: 'app/api/v1/billing_routes.py:42', label: 'Route: POST /checkout' },
        ],
      };
      setMessages(prev => [...prev, fallbackAiMsg]);
    }
  };

  const handleConnectRepo = async (data: { githubUrl: string; name?: string; defaultBranch?: string; depth?: string }) => {
    try {
      const res = await fetch('/api/repositories/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result?.repository) {
        setRepositories(prev => [result.repository, ...prev]);
      }
    } catch {
      const newRepo: Repository = {
        id: `repo-${Date.now()}`,
        organizationId: 'org-devguide-01',
        name: data.name || data.githubUrl.split('/').pop() || 'custom-repo',
        slug: (data.name || 'custom-repo').toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        description: 'Connected via GitHub AST compiler.',
        githubUrl: data.githubUrl,
        defaultBranch: data.defaultBranch || 'main',
        isPrivate: false,
        isDemo: false,
        status: 'Completed',
        filesCount: 142,
        linesOfCode: 24500,
        languages: { Python: 82, TypeScript: 18 },
        astQuotaUsed: 1200,
        astQuotaLimit: 10000,
        understoodPercent: 65,
        lastAnalyzedAt: 'Just now',
        createdAt: new Date().toISOString(),
      };
      setRepositories(prev => [newRepo, ...prev]);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: BeginnerTask['status']) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status } : t)));
    try {
      await fetch(`/api/tasks/${taskId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Failed to persist task status:', e);
    }
  };

  const handleToggleMilestone = async (stepId: string, milestoneId: string) => {
    setOnboardingSteps(prev =>
      prev.map(step => {
        if (step.id !== stepId) return step;
        const updatedMilestones = step.milestones.map(m =>
          m.id === milestoneId ? { ...m, status: m.status === 'completed' ? ('in_progress' as const) : ('completed' as const) } : m
        );
        const allCompleted = updatedMilestones.every(m => m.status === 'completed');
        return {
          ...step,
          status: allCompleted ? 'Completed' : 'In Progress',
          milestones: updatedMilestones,
        };
      })
    );

    try {
      await fetch('/api/onboarding/milestone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId, milestoneId }),
      });
    } catch (e) {
      console.warn('Failed to persist milestone:', e);
    }
  };

  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
  };

  const handleSaveQuestionnaire = async (updated: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
    try {
      await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Profile update fallback:', e);
    }
  };

  const handleOpenCodeInExplorer = (path?: string) => {
    if (path) setActiveFileForExplorer(path);
    setCurrentPage('code-explorer');
  };

  const handleOpenImpactCheck = (file: string, symbol: string) => {
    setImpactSimulation(prev => ({
      ...prev,
      targetFile: file,
      targetSymbol: symbol,
    }));
    setCurrentPage('impact-analysis');
  };

  return (
    <div className="bg-[#0f131c] min-h-screen text-[#dfe2ee] font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentRepoName={repositories[0]?.name || 'backend-api'}
        onOpenRepoSelector={() => setCurrentPage('repositories')}
      />

      {/* Main Layout Container with 64 (16rem) padding for sidebar */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Fixed Top Header */}
        <Header
          user={currentUser}
          currentRepoName={repositories[0]?.name || 'backend-api'}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
        />

        {/* View Routing Surface */}
        <main className="relative pt-14 bg-[#0f131c] w-full flex-1">
          {currentPage === 'overview' && (
            <OverviewView
              user={currentUser}
              repositories={repositories}
              onNavigate={setCurrentPage}
              onOpenCodeInExplorer={handleOpenCodeInExplorer}
              onOpenAskCodebase={() => setCurrentPage('ai-copilot')}
            />
          )}

          {currentPage === 'code-explorer' && (
            <CodeExplorerView
              files={files}
              initialFilePath={activeFileForExplorer}
              onNavigate={setCurrentPage}
              onOpenImpactCheck={handleOpenImpactCheck}
              onAskCopilot={(query) => {
                handleSendMessage(query);
                setCurrentPage('ai-copilot');
              }}
            />
          )}

          {currentPage === 'architecture' && (
            <ArchitectureView
              nodes={architectureNodes}
              onNavigate={setCurrentPage}
              onOpenCodeInExplorer={handleOpenCodeInExplorer}
              onOpenImpactCheck={handleOpenImpactCheck}
              onAskCopilot={(query) => {
                handleSendMessage(query);
                setCurrentPage('ai-copilot');
              }}
            />
          )}

          {currentPage === 'impact-analysis' && (
            <ImpactAnalysisView
              simulation={impactSimulation}
              onNavigate={setCurrentPage}
              onOpenCodeInExplorer={handleOpenCodeInExplorer}
            />
          )}

          {currentPage === 'ai-copilot' && (
            <AICopilotView
              messages={messages}
              onSendMessage={handleSendMessage}
              onNavigate={setCurrentPage}
              onOpenCodeInExplorer={handleOpenCodeInExplorer}
              onOpenImpactCheck={handleOpenImpactCheck}
            />
          )}

          {currentPage === 'repositories' && (
            <RepositoriesView
              repositories={repositories}
              onConnectRepo={handleConnectRepo}
              onNavigate={setCurrentPage}
              onSelectRepo={(slug) => {
                const target = repositories.find(r => r.slug === slug);
                if (target) {
                  setRepositories([target, ...repositories.filter(r => r.slug !== slug)]);
                }
                setCurrentPage('overview');
              }}
            />
          )}

          {currentPage === 'onboarding-roadmap' && (
            <OnboardingView
              steps={onboardingSteps}
              onToggleMilestone={handleToggleMilestone}
              onNavigate={setCurrentPage}
              onOpenCodeInExplorer={handleOpenCodeInExplorer}
              onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
            />
          )}

          {currentPage === 'beginner-tasks' && (
            <BeginnerTasksView
              tasks={tasks}
              onUpdateStatus={handleUpdateTaskStatus}
              onNavigate={setCurrentPage}
              onOpenCodeInExplorer={handleOpenCodeInExplorer}
            />
          )}

          {currentPage === 'team' && (
            <TeamView
              users={[currentUser, ...SEED_USERS.slice(1)]}
              teams={teams}
              onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
            />
          )}

          {currentPage === 'admin' && (
            <AdminView
              users={[currentUser, ...SEED_USERS.slice(1)]}
              auditLogs={auditLogs}
              onUpdateUserRole={handleUpdateUserRole}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              user={currentUser}
              onUpdateProfile={(updates) => setCurrentUser(prev => ({ ...prev, ...updates }))}
            />
          )}
        </main>
      </div>

      {/* ⌘K / ⌘J Command Search Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setCurrentPage}
        onSelectFile={handleOpenCodeInExplorer}
        onAskCopilot={(query) => {
          handleSendMessage(query);
          setCurrentPage('ai-copilot');
        }}
      />

      {/* Onboarding Questionnaire Modal */}
      <QuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        currentUser={currentUser}
        onSave={handleSaveQuestionnaire}
      />
    </div>
  );
}
