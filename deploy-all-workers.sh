#!/bin/bash

# Massive deployment script for ALL workers
set -e

echo "🚀 MASSIVE DEPLOYMENT STARTING..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Find all workers
echo "🔍 Discovering workers..."
workers=$(find . -maxdepth 2 -name "wrangler.jsonc" -o -name "wrangler.toml" | sed 's|^\./||' | sed 's|/wrangler.*||' | sort -u)

echo -e "${BLUE}Found ${#workers[@]} workers:${NC}"
for worker in $workers; do
    echo "  - $worker"
done

echo ""
echo "⚡ Starting parallel deployment..."

# Function to deploy single worker
deploy_worker() {
    local worker=$1
    echo -e "${YELLOW}Deploying $worker...${NC}"
    
    cd "$worker"
    
    # Check if wrangler config exists
    if [[ ! -f "wrangler.jsonc" && ! -f "wrangler.toml" ]]; then
        echo -e "${RED}❌ No wrangler config found for $worker${NC}"
        cd ..
        return 1
    fi
    
    # Add account_id if missing
    if [[ -f "wrangler.jsonc" ]]; then
        if ! grep -q "account_id" wrangler.jsonc; then
            echo -e "${BLUE}Adding account_id to $worker...${NC}"
            jq '. + {"account_id": "5f67b9fe81880bb705be33df7ac44c56"}' wrangler.jsonc > temp.json && mv temp.json wrangler.jsonc
        fi
    fi
    
    # Install dependencies if package.json exists
    if [[ -f "package.json" && ! -d "node_modules" ]]; then
        echo -e "${BLUE}Installing dependencies for $worker...${NC}"
        npm install --silent
    fi
    
    # Deploy
    echo -e "${BLUE}Deploying $worker to Cloudflare...${NC}"
    if npx wrangler deploy --compatibility-date 2026-03-10 2>/dev/null; then
        echo -e "${GREEN}✅ $worker deployed successfully!${NC}"
        echo "$worker: SUCCESS" >> ../deployment-results.txt
    else
        echo -e "${RED}❌ $worker deployment failed!${NC}"
        echo "$worker: FAILED" >> ../deployment-results.txt
    fi
    
    cd ..
}

# Export function for parallel execution
export -f deploy_worker

# Deploy up to 5 workers in parallel
max_parallel=5
workers_array=($workers)
total_workers=${#workers_array[@]}

for ((i=0; i<total_workers; i+=max_parallel)); do
    echo ""
    echo -e "${BLUE}Batch $((i/max_parallel + 1)): Deploying workers $((i+1))-$((i+max_parallel > total_workers ? total_workers : i+max_parallel))${NC}"
    
    # Run up to max_parallel workers in background
    for ((j=0; j<max_parallel; j++)); do
        idx=$((i+j))
        if [[ $idx -ge $total_workers ]]; then
            break
        fi
        deploy_worker "${workers_array[$idx]}" &
    done
    
    # Wait for all background jobs to complete
    wait
done

echo ""
echo "=================================="
echo -e "${GREEN}🎉 MASSIVE DEPLOYMENT COMPLETE!${NC}"

# Show results
if [[ -f "deployment-results.txt" ]]; then
    echo ""
    echo -e "${BLUE}📊 DEPLOYMENT SUMMARY:${NC}"
    success_count=$(grep -c "SUCCESS" deployment-results.txt || echo "0")
    failed_count=$(grep -c "FAILED" deployment-results.txt || echo "0")
    
    echo -e "${GREEN}✅ Successful: $success_count${NC}"
    echo -e "${RED}❌ Failed: $failed_count${NC}"
    
    echo ""
    echo -e "${YELLOW}📋 Detailed Results:${NC}"
    cat deployment-results.txt
    
    rm deployment-results.txt
fi
