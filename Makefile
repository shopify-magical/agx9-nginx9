.PHONY: help deploy-all deploy-parallel deploy-single clean-results

# Default target
help:
	@echo "🚀 MASSIVE DEPLOYMENT SYSTEM"
	@echo "================================"
	@echo ""
	@echo "Available commands:"
	@echo "  make deploy-all      - Deploy all workers sequentially"
	@echo "  make deploy-parallel - Deploy all workers in parallel (5 at a time)"
	@echo "  make deploy-single WORKER=sv9 - Deploy specific worker"
	@echo "  make clean-results   - Clean deployment results"
	@echo ""

# Deploy all workers sequentially
deploy-all:
	@echo "🔍 Finding workers..."
	@workers=$$(find . -maxdepth 2 -name "wrangler.jsonc" -o -name "wrangler.toml" | sed 's|^\./||' | sed 's|/wrangler.*||' | sort -u); \
	for worker in $$workers; do \
		echo "⚡ Deploying $$worker..."; \
		if [[ -d "$$worker" ]]; then \
			cd "$$worker" && npx wrangler deploy --compatibility-date 2026-03-10 && cd ..; \
		fi; \
	done

# Deploy all workers in parallel (5 at a time)
deploy-parallel:
	@echo "🚀 MASSIVE PARALLEL DEPLOYMENT..."
	@./deploy-all-workers.sh

# Deploy specific worker
deploy-single:
	@if [[ -z "$(WORKER)" ]]; then \
		echo "❌ Please specify WORKER=workername"; \
		exit 1; \
	fi
	@if [[ ! -d "$(WORKER)" ]]; then \
		echo "❌ Worker $(WORKER) not found"; \
		exit 1; \
	fi
	@echo "⚡ Deploying $(WORKER)..."
	@cd "$(WORKER)" && npx wrangler deploy --compatibility-date 2026-03-10

# Clean results
clean-results:
	@rm -f deployment-results.txt
	@echo "🧹 Cleaned deployment results"

# Show worker status
status:
	@echo "📊 Worker Status:"
	@workers=$$(find . -maxdepth 2 -name "wrangler.jsonc" -o -name "wrangler.toml" | sed 's|^\./||' | sed 's|/wrangler.*||' | sort -u); \
	for worker in $$workers; do \
		if [[ -d "$$worker" ]]; then \
			echo "  📁 $$worker"; \
		fi; \
	done
