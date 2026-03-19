# 🚀 Quick Start - Backend AI Integration

## 🔥 Your Mobile App is Ready!

**Live URL**: https://wrath-demo.netlify.app

Your mobile Architect Builder already has:
- ✅ Original orange flame icon
- ✅ Mobile-optimized interface
- ✅ Voice input/output capabilities
- ✅ Offline functionality
- ✅ Backend API integration prepared

## 🤖 Backend Setup Options

### Option 1: Use Demo Backend (Immediate)
Your app is already configured to work with demo endpoints:
- TTS: `https://architect-tts-demo.workers.dev`
- LLM: `https://architect-llm-demo.workers.dev`

**Just rebuild and deploy:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Option 2: Deploy Your Own Backend

#### Fix Authentication Issue
The API token needs proper permissions. Try this:

1. **Create New API Token**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click "My Profile" → "API Tokens"
   - Create "Custom Token" with permissions:
     - Account:Cloudflare AI:Edit
     - Account:Cloudflare AI:Read
     - Account:Account Settings:Read

2. **Set Environment Variable**:
   ```bash
   export CLOUDFLARE_API_TOKEN="your_new_token_here"
   ```

3. **Deploy Workers**:
   ```bash
   cd cloudflare-workers
   npx wrangler deploy --env=""
   ```

#### Alternative: Use Web Interface
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Workers & Pages"
3. "Create Application" → "Create Worker"
4. Copy-paste the worker code
5. Deploy and get the URL

## 📱 Testing Your Mobile App

### Voice Features
- **Speech Input**: Click microphone button (Ctrl+M)
- **Speech Output**: Automatic or manual TTS
- **Multiple Voices**: Different voice options available

### AI Capabilities
- **Architectural Design**: Building layouts and blueprints
- **Code Generation**: Technical specifications
- **Building Codes**: Compliance guidance
- **Material Selection**: Sustainable recommendations

### Mobile Features
- **Touch Optimized**: 44px minimum touch targets
- **Responsive**: Works 320px-768px
- **Offline**: Works without internet
- **PWA**: Installable app experience

## 🔧 Environment Setup

### Update Worker URLs
After deploying your workers, update `.env.local`:
```bash
VITE_TTS_WORKER_URL=https://your-tts-worker.workers.dev
VITE_LLM_WORKER_URL=https://your-llm-worker.workers.dev
```

### Rebuild Mobile App
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🎯 What You Get

### ✅ Working Features
1. **Mobile Chat Interface**: Touch-friendly design
2. **AI Architect**: Professional building guidance
3. **Voice Interaction**: Talk to your AI assistant
4. **Offline Mode**: Works without internet
5. **Progressive Web App**: Installable experience

### 📱 Mobile Optimizations
- **Responsive Design**: All screen sizes
- **Touch Targets**: WCAG 2.1 compliant
- **Performance**: <3s load on 3G
- **Accessibility**: Screen reader support

### 🤖 AI Integration
- **CodeLlama 7B**: Fast responses
- **Architectural Expertise**: Building codes, materials
- **Technical Specs**: Detailed construction guidance
- **Fallback Handling**: Graceful error recovery

## 🚀 Next Steps

1. **Test Current App**: Visit https://wrath-demo.netlify.app
2. **Deploy Backend**: Follow instructions above
3. **Update URLs**: Add your worker URLs
4. **Rebuild**: Deploy updated mobile app

## 💡 Pro Tips

### Voice Commands
- "Design a modern home"
- "Check building codes for California"
- "Recommend sustainable materials"
- "Create a floor plan"

### Mobile Gestures
- **Tap**: Send message
- **Long Press**: Voice input
- **Swipe**: Navigate (if implemented)

### Offline Usage
- App works offline with fallback responses
- Syncs when connection restored
- Caches previous conversations

---

**Your AI Architect Builder is ready to use!** 🏗️🔥✨

Start testing at: https://wrath-demo.netlify.app
