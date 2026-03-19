# 🚀 Cloudflare Workers Deployment Guide

## 🔧 Fixed Configuration Issues

### **Problem Resolved**
- **Multiple Worker Config**: Separate configs for TTS and LLM
- **Environment Conflicts**: Individual TOML files
- **Deployment Scripts**: Specific worker names

## 📋 Deployment Options

### **Option 1: Use Individual Scripts**
```bash
# Deploy TTS Worker
./deploy-tts.sh

# Deploy LLM Worker  
./deploy-llm.sh
```

### **Option 2: Manual Deployment**
```bash
# TTS Worker
npx wrangler deploy tts-worker.js --config tts-wrangler.toml --name architect-tts-worker

# LLM Worker
npx wrangler deploy llm-worker.js --config llm-wrangler.toml --name architect-llm-worker
```

### **Option 3: Fix Authentication**
```bash
# Create new API token with proper permissions
# Go to Cloudflare Dashboard → My Profile → API Tokens
# Create custom token with:
#   - Account:Cloudflare AI:Edit
#   - Account:Cloudflare AI:Read
#   - Account:Account Settings:Read

export CLOUDFLARE_API_TOKEN="your_new_token_here"
```

## 🏗️ Worker Configuration

### **TTS Worker** (`tts-wrangler.toml`)
- **Name**: `architect-tts-worker`
- **File**: `tts-worker.js`
- **Compatibility**: Node.js compat

### **LLM Worker** (`llm-wrangler.toml`)
- **Name**: `architect-llm-worker`
- **File**: `llm-worker.js`
- **Compatibility**: Node.js compat

## 📱 Mobile App Integration

After deployment, update your mobile app:

```bash
# In .env.local
VITE_TTS_WORKER_URL=https://architect-tts-worker.your-subdomain.workers.dev
VITE_LLM_WORKER_URL=https://architect-llm-worker.your-subdomain.workers.dev
```

## 🔍 Testing

### **Health Checks**
```bash
# Test TTS
curl https://architect-tts-worker.your-subdomain.workers.dev/health

# Test LLM
curl https://architect-llm-worker.your-subdomain.workers.dev/health
```

### **API Testing**
```bash
# Test TTS
curl -X POST https://architect-tts-worker.your-subdomain.workers.dev/tts \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world!"}'

# Test LLM
curl -X POST https://architect-llm-worker.your-subdomain.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

## 🎯 Next Steps

1. **Fix Authentication**: Get proper API token
2. **Deploy Workers**: Use individual scripts
3. **Update Mobile App**: Configure worker URLs
4. **Test Integration**: Verify AI functionality
5. **Monitor Usage**: Check Cloudflare analytics

---

**Backend deployment is now properly configured!** 🏗️✨
