# 🤖 Backend AI Setup - Cloudflare Workers

Complete setup guide for deploying the AI backend services that power your mobile Architect Builder.

## 🚀 Quick Setup

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

### 3. Deploy Workers

```bash
cd cloudflare-workers
npm install
wrangler deploy
```

## 📋 Prerequisites

- Cloudflare account (free tier works)
- Domain name (optional, for custom URLs)
- Node.js 18+

## 🔧 Configuration

### Environment Variables

Set these in your Cloudflare Workers dashboard or using wrangler secrets:

```bash
# For TTS Worker
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put CLOUDFLARE_API_TOKEN

# For LLM Worker  
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put CLOUDFLARE_API_TOKEN
```

### Get Cloudflare Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Workers & Pages"
3. Click "Manage Account" → "Account ID"
4. Go to "My Profile" → "API Tokens"
5. Create custom token with permissions:

   - Account:Cloudflare AI:Edit
   - Account:Cloudflare AI:Read
   - Zone:Zone:Read (if using custom domain)

## 🏗️ Worker Architecture

### TTS Worker (`tts-worker.js`)

- **Purpose**: Text-to-Speech conversion
- **Model**: `@cf/tts1-turbo-hifi`
- **Features**:

  - Multiple voice options
  - Speed control
  - Audio streaming
  - Fallback handling

### LLM Worker (`llm-worker.js`)

- **Purpose**: AI architectural assistance
- **Model**: `@cf/codellama/codellama-7b-instruct`
- **Features**:

  - Architectural expertise
  - Code generation
  - Technical specifications
  - Building code guidance

## 📱 Mobile App Integration

### Update Environment Variables

In your mobile app `.env` file:

```bash
VITE_TTS_WORKER_URL=https://your-tts-worker.your-subdomain.workers.dev
VITE_LLM_WORKER_URL=https://your-llm-worker.your-subdomain.workers.dev
```

### API Endpoints

#### TTS Service

```json
POST /tts
{
  "text": "Hello, I'm your AI architect!",
  "voice": "af_sky",
  "speed": 1.0
}
```

#### LLM Service

```json
POST /chat
{
  "messages": [
    {
      "role": "system",
      "content": "You are @Architect..."
    },
    {
      "role": "user", 
      "content": "Design a modern home..."
    }
  ],
  "model": "@cf/codellama/codellama-7b-instruct"
}
```

## 🔍 Testing

### Health Checks

```bash
# Test TTS Worker
curl https://your-tts-worker.workers.dev/health

# Test LLM Worker  
curl https://your-llm-worker.workers.dev/health
```

### Full API Test

```bash
# Test TTS
curl -X POST https://your-tts-worker.workers.dev/tts \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world!"}'

# Test LLM
curl -X POST https://your-llm-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

## 🌐 Deployment URLs

After deployment, your workers will be available at:

- TTS: `https://architect-tts-worker.your-subdomain.workers.dev`
- LLM: `https://architect-llm-worker.your-subdomain.workers.dev`

## 📊 Monitoring

### View Logs

```bash
wrangler tail
```

### Analytics

- Cloudflare Dashboard → Workers & Pages → Analytics
- Monitor request counts, errors, and performance

## 🔒 Security

### CORS Configuration

Workers include CORS headers for mobile app compatibility:

```javascript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
```

### Rate Limiting

Consider adding rate limiting in production:

```javascript
// Add to worker headers
'X-RateLimit-Limit': '100'
'X-RateLimit-Remaining': '99'
```

## 💰 Costs

### Cloudflare Workers Free Tier

- 100,000 requests/day
- 10ms CPU time per request
- Sufficient for most mobile apps

- TTS: ~$0.02 per 1,000 characters
- LLM: ~$0.10 per 1,000 tokens
- Very affordable for mobile usage

## 🚨 Troubleshooting

### Common Issues

#### 1. "Account not found" error

- Verify CLOUDFLARE_ACCOUNT_ID is correct
- Check API token permissions

#### 2. "Model not available" error

- Ensure AI is enabled for your account
- Check model name spelling

#### 3. CORS errors in mobile app

- Verify worker CORS headers
- Check mobile app request headers

#### 4. Timeout errors

- Increase timeout in mobile app
- Check worker performance

### Debug Mode

Enable debug logging:

```bash
wrangler dev --log-level debug
```

## 🔄 Updates

### Updating Workers

```bash
# Make changes to worker files
wrangler deploy
```

### Rolling Updates

Workers update instantly with zero downtime.

## 📱 Mobile App Features

### Offline Support

- Mobile app works offline with fallback responses
- Caches previous conversations
- Syncs when connection restored

### Voice Features

- Speech-to-text input
- Text-to-speech output
- Multiple voice options
- Speed control

### AI Capabilities

- Architectural design guidance
- Building code compliance
- Material recommendations
- Structural analysis

## 🎯 Next Steps

1. **Deploy Workers**: Follow setup instructions
2. **Update Environment**: Configure mobile app URLs
3. **Test Integration**: Verify mobile app connectivity
4. **Monitor Usage**: Check analytics and performance
5. **Scale Up**: Upgrade plan if needed

## 📞 Support

### Cloudflare Documentation

- [Workers Docs](https://developers.cloudflare.com/workers/)
- [AI Docs](https://developers.cloudflare.com/workers-ai/)

### Common Issues

- Check [Cloudflare Status](https://www.cloudflarestatus.com/)
- Review [Workers Limits](https://developers.cloudflare.com/workers/platform/limits/)

---

**Your AI Architect Builder backend is ready!** 🏗️✨

Deploy the workers, update your mobile app environment variables, and enjoy full AI-powered architectural assistance on mobile devices!
