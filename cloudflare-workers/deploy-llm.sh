#!/bin/bash

# Deploy LLM Worker with specific configuration
echo "🤖 Deploying LLM Worker..."

npx wrangler deploy llm-worker.js --config llm-wrangler.toml --name architect-llm-worker

echo "✅ LLM Worker deployed!"
echo "📱 Update your mobile app with:"
echo "   VITE_LLM_WORKER_URL=https://architect-llm-worker.your-subdomain.workers.dev"
