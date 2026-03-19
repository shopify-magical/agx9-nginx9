#!/bin/bash

# Deploy TTS Worker with specific configuration
echo "🗣️ Deploying TTS Worker..."

npx wrangler deploy tts-worker.js --config tts-wrangler.toml --name architect-tts-worker

echo "✅ TTS Worker deployed!"
echo "📱 Update your mobile app with:"
echo "   VITE_TTS_WORKER_URL=https://architect-tts-worker.your-subdomain.workers.dev"
