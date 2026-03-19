#!/bin/bash

# Quick deploy all workers (simplified version)
echo "🚀 Deploying ALL workers..."

# Function to deploy worker
deploy() {
    local dir=$1
    if [[ -d "$dir" && (-f "$dir/wrangler.jsonc" || -f "$dir/wrangler.toml") ]]; then
        echo "⚡ Deploying $dir..."
        (cd "$dir" && npx wrangler deploy --compatibility-date 2026-03-10) &
    fi
}

# Deploy all workers in parallel
for dir in */; do
    deploy "$dir"
done

# Wait for all deployments to complete
wait

echo "✅ All deployments complete!"
