import { Router, Request, Response } from 'express';
import { db } from '../../../database/index';
import { askCodebaseWithGemini, AIMode } from '../core/gemini';
import { calculateBlastRadius, generateAutomatedTestSuite } from '../services/impactEngine';
import { generateCustomOnboardingRoadmap } from '../services/onboardingEngine';
import { parseSourceCodeAST } from '../services/astParser';
import { hasPermission } from '../core/security';

export const apiRouter = Router();

// ---------------------------------------------------------------------------
// 1. AUTHENTICATION & USER PROFILE
// ---------------------------------------------------------------------------
apiRouter.get('/auth/me', (req: Request, res: Response) => {
  const user = db.getCurrentUser();
  const org = db.getOrganization();
  res.json({ user, organization: org });
});

apiRouter.post('/auth/update-profile', (req: Request, res: Response) => {
  const { name, experienceLevel, preferredLearningStyle, programmingLanguages } = req.body;
  const currentUser = db.getCurrentUser();
  const updated = db.updateUserProfile(currentUser.id, {
    name: name || currentUser.name,
    experienceLevel: experienceLevel || currentUser.experienceLevel,
    preferredLearningStyle: preferredLearningStyle || currentUser.preferredLearningStyle,
    programmingLanguages: programmingLanguages || currentUser.programmingLanguages,
  });
  res.json({ user: updated });
});

// ---------------------------------------------------------------------------
// 2. REPOSITORIES
// ---------------------------------------------------------------------------
apiRouter.get('/repositories', (req: Request, res: Response) => {
  const repos = db.getRepositories();
  res.json({ repositories: repos });
});

apiRouter.get('/repositories/:slug', (req: Request, res: Response) => {
  const repo = db.getRepositoryBySlug(req.params.slug);
  res.json({ repository: repo });
});

apiRouter.post('/repositories/connect', (req: Request, res: Response) => {
  const { githubUrl, name, defaultBranch, isPrivate, depth } = req.body;
  const user = db.getCurrentUser();

  if (!hasPermission(user.role, 'CONNECT_REPOSITORIES')) {
    return res.status(403).json({ error: 'Permission denied: Cannot connect repositories' });
  }

  const repoName = name || (githubUrl ? githubUrl.split('/').pop().replace(/\.git$/, '') : 'custom-repo');
  const newRepo = db.addRepository({
    name: repoName,
    githubUrl: githubUrl || 'https://github.com/custom/repo',
    defaultBranch: defaultBranch || 'main',
    isPrivate: Boolean(isPrivate),
    description: `Imported repository with ${depth || 'Deep'} AST analysis.`,
    filesCount: 142,
    linesOfCode: 24500,
    languages: { Python: 82, TypeScript: 18 },
  });

  res.json({ repository: newRepo, message: 'Repository connected and AST parsing initiated' });
});

// ---------------------------------------------------------------------------
// 3. FILE EXPLORER & AST SYMBOLS
// ---------------------------------------------------------------------------
apiRouter.get('/files', (req: Request, res: Response) => {
  const files = db.getFiles();
  res.json({ files });
});

apiRouter.get('/files/content', (req: Request, res: Response) => {
  const path = req.query.path as string;
  const file = db.getFileByPath(path);
  const symbols = db.getSymbols(file.id);
  res.json({ file, symbols });
});

apiRouter.post('/files/explain', async (req: Request, res: Response) => {
  const { path, lineStart, lineEnd } = req.body;
  const file = db.getFileByPath(path || 'app/services/payment_service.py');

  const explanation = await askCodebaseWithGemini({
    prompt: `Explain the file ${file.path} and particularly lines ${lineStart || 1} to ${lineEnd || file.lineCount}`,
    mode: 'Technical',
    targetFile: file.path,
  });

  res.json({ explanation });
});

// ---------------------------------------------------------------------------
// 4. ARCHITECTURE TOPOLOGY (DAG)
// ---------------------------------------------------------------------------
apiRouter.get('/architecture', (req: Request, res: Response) => {
  const arch = db.getArchitecture();
  res.json(arch);
});

// ---------------------------------------------------------------------------
// 5. AI REPOSITORY COPILOT CHAT
// ---------------------------------------------------------------------------
apiRouter.get('/chat/messages', (req: Request, res: Response) => {
  const messages = db.getMessages();
  res.json({ messages });
});

apiRouter.post('/chat/query', async (req: Request, res: Response) => {
  const { prompt, mode, scope, targetFile } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Record user query in conversation
  const userMsg = db.addMessage({
    senderType: 'user',
    content: prompt,
  });

  // Query server-side Gemini AI engine
  const aiResponse = await askCodebaseWithGemini({
    prompt,
    mode: (mode as AIMode) || 'Technical',
    scope: scope || 'All Repo',
    targetFile,
  });

  const assistantMsg = db.addMessage({
    senderType: 'assistant',
    content: aiResponse.content,
    sources: aiResponse.sources,
    confidence: aiResponse.confidence,
  });

  res.json({ userMessage: userMsg, assistantMessage: assistantMsg });
});

// ---------------------------------------------------------------------------
// 6. CODE IMPACT & BLAST RADIUS ANALYZER
// ---------------------------------------------------------------------------
apiRouter.get('/impact', (req: Request, res: Response) => {
  const sim = db.getImpactSimulation();
  res.json(sim);
});

apiRouter.post('/impact/scan', (req: Request, res: Response) => {
  const { targetFile, targetSymbol } = req.body;
  const user = db.getCurrentUser();

  if (!hasPermission(user.role, 'RUN_IMPACT_SCAN')) {
    return res.status(403).json({ error: 'Permission denied: Cannot execute AST impact scans' });
  }

  const result = calculateBlastRadius(
    targetFile || 'app/services/payment_service.py',
    targetSymbol || 'process_payment(order_id, payment_method_id)'
  );
  db.runImpactScan(result.targetFile, result.targetSymbol);

  res.json(result);
});

apiRouter.post('/impact/generate-tests', (req: Request, res: Response) => {
  const { targetFile, targetSymbol } = req.body;
  const testSuiteCode = generateAutomatedTestSuite(
    targetFile || 'app/services/payment_service.py',
    targetSymbol || 'process_payment'
  );
  res.json({ code: testSuiteCode, filename: 'tests/unit/test_payment_generated.py' });
});

// ---------------------------------------------------------------------------
// 7. ONBOARDING ROADMAP
// ---------------------------------------------------------------------------
apiRouter.get('/onboarding/steps', (req: Request, res: Response) => {
  const steps = db.getOnboardingSteps();
  res.json({ steps });
});

apiRouter.post('/onboarding/milestone', (req: Request, res: Response) => {
  const { stepId, milestoneId } = req.body;
  const updatedSteps = db.completeOnboardingMilestone(stepId, milestoneId);
  res.json({ steps: updatedSteps });
});

apiRouter.post('/onboarding/customize', (req: Request, res: Response) => {
  const { experienceLevel, learningStyle, primaryLanguage } = req.body;
  const customRoadmap = generateCustomOnboardingRoadmap(
    experienceLevel || 'Intermediate',
    learningStyle || 'Visual',
    primaryLanguage || 'Python'
  );
  res.json({ steps: customRoadmap });
});

// ---------------------------------------------------------------------------
// 8. BEGINNER TASKS
// ---------------------------------------------------------------------------
apiRouter.get('/tasks', (req: Request, res: Response) => {
  const tasks = db.getTasks();
  res.json({ tasks });
});

apiRouter.post('/tasks/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = db.updateTaskStatus(id, status);
  res.json({ task });
});

// ---------------------------------------------------------------------------
// 9. TEAM DASHBOARD & ADMIN
// ---------------------------------------------------------------------------
apiRouter.get('/team/members', (req: Request, res: Response) => {
  const users = db.getUsers();
  const teams = db.getTeams();
  res.json({ users, teams });
});

apiRouter.get('/admin/audit-logs', (req: Request, res: Response) => {
  const logs = db.getAuditLogs();
  res.json({ auditLogs: logs });
});

// ---------------------------------------------------------------------------
// 10. GLOBAL SEARCH
// ---------------------------------------------------------------------------
apiRouter.get('/search', (req: Request, res: Response) => {
  const q = req.query.q as string;
  const results = db.search(q || '');
  res.json(results);
});
