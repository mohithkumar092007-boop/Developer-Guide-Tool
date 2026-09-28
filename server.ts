import express from 'express';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './backend/app/api/routes';
import { CONFIG } from './backend/app/core/config';

async function startServer() {
  const app = express();
  const PORT = CONFIG.PORT;

  app.use(express.json());

  // Mount backend API routes under /api
  app.use('/api', apiRouter);

  // Healthcheck endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: CONFIG.APP_NAME,
      version: CONFIG.APP_VERSION,
      timestamp: new Date().toISOString(),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DevGuide AI Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start DevGuide AI server:', err);
  process.exit(1);
});
