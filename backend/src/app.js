import express from 'express';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { ENV } from './config/env.js';
import { functions, inngest } from './config/inngest.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(currentDir, '..', '..');
const adminDistPath = path.join(workspaceRoot, 'admin', 'dist');

export const app = express();

app.use(express.json());
app.use(clerkMiddleware());
app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

if (ENV.NODE_ENV === 'production' && existsSync(adminDistPath)) {
  app.use(express.static(adminDistPath));

  app.get(/^(?!\/api(?:\/|$)).*/, (req, res) => {
    res.sendFile(path.join(adminDistPath, 'index.html'));
  });
}

export default app;
