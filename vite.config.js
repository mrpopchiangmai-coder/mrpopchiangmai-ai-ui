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
      server.middlewares.use('/api/copilotkit', (req, res, next) => {
        handleCopilotRequest(req, res, next);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copilotRuntimeVitePlugin()],
});
