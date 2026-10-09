import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { CopilotRuntime, EmptyAdapter, copilotRuntimeNodeHttpEndpoint } from '@copilotkit/runtime';

// Official CopilotRuntime Node Middleware for Vite Dev Server
function copilotRuntimeVitePlugin() {
  const serviceAdapter = new EmptyAdapter();
  const runtime = new CopilotRuntime();

  const handleCopilotRequest = copilotRuntimeNodeHttpEndpoint({
    endpoint: '/api/copilotkit',
    runtime,
    serviceAdapter,
  });

  return {
    name: 'copilotkit-runtime-vite-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/copilotkit')) {
          return handleCopilotRequest(req, res, next);
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copilotRuntimeVitePlugin()],
});
