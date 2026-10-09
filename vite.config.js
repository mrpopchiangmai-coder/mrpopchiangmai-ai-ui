import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Plugin to serve local AG-UI Protocol Endpoint for CopilotKit
function copilotKitLocalPlugin() {
  return {
    name: 'copilotkit-local-agent-endpoint',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.includes('/api/copilotkit')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          // Return valid CopilotKit AG-UI runtime info & session response
          res.statusCode = 200;
          res.end(JSON.stringify({
            status: "OK",
            agent: "MrPopChiangMaiAgent",
            version: "1.0.0",
            actions: [],
            messages: []
          }));
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copilotKitLocalPlugin()],
});
