#!/bin/bash

# Automated deployment script for sv9 worker
set -e  # Exit on any error

echo "🚀 Starting deployment of sv9 worker..."

# Check if we're in the right directory
if [[ ! -f "sv9/wrangler.jsonc" ]]; then
    echo "❌ Error: sv9/wrangler.jsonc not found!"
    exit 1
fi

# Navigate to worker directory
cd sv9

# Check if dependencies are installed
if [[ ! -d "node_modules" ]]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Deploy the worker
echo "⚡ Deploying to Cloudflare Workers..."
npx wrangler deploy

echo "✅ sv9 deployed successfully!"
