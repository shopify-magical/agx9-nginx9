#!/bin/bash

# Cloudflare Workers Deployment Script
# Uses npx instead of global installation to avoid permission issues

echo "🚀 Deploying AI Architect Backend Workers..."

# Check if wrangler is available via npx
if ! npx wrangler --version > /dev/null 2>&1; then
    echo "📦 Installing Wrangler locally..."
    npm install wrangler
fi

# Check if user is logged in
echo "🔐 Checking Cloudflare authentication..."
if npx wrangler whoami 2>/dev/null; then
    echo "✅ Already authenticated"
else
    echo "❌ Not authenticated. Please run:"
    echo "   npx wrangler login"
    echo "   or set CLOUDFLARE_API_TOKEN environment variable"
    exit 1
fi

# Deploy TTS Worker
echo "🗣️ Deploying TTS Worker..."
npx wrangler deploy tts-worker.js --name architect-tts-worker

# Deploy LLM Worker  
echo "🤖 Deploying LLM Worker..."
npx wrangler deploy llm-worker.js --name architect-llm-worker

echo "✅ Backend deployment complete!"
echo ""
echo "📱 Update your mobile app environment variables:"
echo "   VITE_TTS_WORKER_URL=https://architect-tts-worker.your-subdomain.workers.dev"
echo "   VITE_LLM_WORKER_URL=https://architect-llm-worker.your-subdomain.workers.dev"
echo ""
echo "🔧 Set secrets in Cloudflare dashboard:"
echo "   CLOUDFLARE_ACCOUNT_ID"
echo "   CLOUDFLARE_API_TOKEN"
