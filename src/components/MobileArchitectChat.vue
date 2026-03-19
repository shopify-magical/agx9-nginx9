<template>
  <div class="mobile-container mobile-safe-area">
    <!-- Mobile Header -->
    <header class="mobile-header">
      <div class="mobile-header-content">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 drop-shadow-lg flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g class="animate-spin-slow" filter="url(#glow)">
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(15 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(30 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(45 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(60 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(75 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(90 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(105 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(120 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(135 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(150 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(165 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(180 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(195 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(210 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(225 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(240 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(255 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(270 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(285 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(300 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(315 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(330 50 50)" />
              <polygon points="48.5,80 51.5,80 50,98" fill="#ff5722" transform="rotate(345 50 50)" />
            </g>
            
            <circle cx="50" cy="50" r="28" fill="#475569" stroke="#1e293b" stroke-width="1.5"/>
            
            <path d="M 24 40 Q 50 43 76 40 M 24 60 Q 50 57 76 60" fill="none" stroke="#334155" stroke-width="1" />
            <path d="M 35 26 Q 32 50 35 74 M 65 26 Q 68 50 65 74" fill="none" stroke="#334155" stroke-width="1" />

            <line x1="22.5" y1="50" x2="77.5" y2="50" stroke="#1e293b" stroke-width="3"/>
            <line x1="22.5" y1="50" x2="77.5" y2="50" stroke="#0f172a" stroke-width="1"/>

            <circle cx="64" cy="34" r="9" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <circle cx="64" cy="34" r="3" fill="#1e293b"/>
            <line x1="55" y1="34" x2="73" y2="34" stroke="#1e293b" stroke-width="1"/>
            <line x1="64" y1="25" x2="64" y2="43" stroke="#1e293b" stroke-width="1"/>
          </svg>
          <h1 class="mobile-heading-3">@Architect</h1>
        </div>
        <button class="mobile-btn mobile-btn-secondary" @click="toggleSettings">
          <i data-lucide="settings" class="w-5 h-5"></i>
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 pb-20">
      <!-- Chat Messages -->
      <div class="mobile-messages" ref="messagesContainer">
        <div 
          v-for="message in messages" 
          :key="message.id"
          :class="['mobile-message', message.role]"
        >
          <div class="mobile-message-content">
            <div class="mobile-message-text" v-html="formatMessage(message.content)"></div>
            <div class="mobile-message-time">{{ formatTime(message.timestamp) }}</div>
            <div class="mobile-message-actions" v-if="message.role === 'assistant'">
              <button class="mobile-btn mobile-btn-secondary" @click="speakMessage(message.content)" :disabled="isSpeaking">
                <i data-lucide="volume-2" class="w-4 h-4"></i>
                {{ isSpeaking ? 'Speaking...' : 'Speak' }}
              </button>
              <button class="mobile-btn mobile-btn-secondary" @click="copyMessage(message.content)">
                <i data-lucide="copy" class="w-4 h-4"></i>
                Copy
              </button>
            </div>
          </div>
        </div>
        
        <!-- Loading indicator -->
        <div v-if="isLoading" class="mobile-message assistant">
          <div class="mobile-message-content">
            <div class="flex items-center gap-3">
              <div class="mobile-spinner"></div>
              <span class="mobile-caption">Architect is thinking...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mobile-quick-actions" v-if="!hasContent">
        <div class="mobile-grid mobile-grid-2">
          <button class="mobile-card mobile-card-action" @click="quickAction('blueprint')">
            <div class="text-3xl mb-2">📐</div>
            <div class="mobile-heading-3">Create Blueprint</div>
            <div class="mobile-caption">Generate architectural designs</div>
          </button>
          <button class="mobile-card mobile-card-action" @click="quickAction('structure')">
            <div class="text-3xl mb-2">🏗️</div>
            <div class="mobile-heading-3">Structure Analysis</div>
            <div class="mobile-caption">Analyze building requirements</div>
          </button>
          <button class="mobile-card mobile-card-action" @click="quickAction('materials')">
            <div class="text-3xl mb-2">🧱</div>
            <div class="mobile-heading-3">Material Selection</div>
            <div class="mobile-caption">Choose sustainable materials</div>
          </button>
          <button class="mobile-card mobile-card-action" @click="quickAction('codes')">
            <div class="text-3xl mb-2">📋</div>
            <div class="mobile-heading-3">Building Codes</div>
            <div class="mobile-caption">Check compliance requirements</div>
          </button>
        </div>
      </div>
    </main>

    <!-- Mobile Input Area -->
    <div class="mobile-input-container">
      <div class="mobile-input-wrapper">
        <button 
          class="mobile-btn mobile-btn-secondary mobile-voice-btn"
          @click="toggleVoiceInput"
          :class="{ 'recording': isRecording }"
        >
          <i data-lucide="mic" class="w-5 h-5"></i>
        </button>
        
        <textarea
          v-model="inputText"
          @keydown.enter="handleEnter"
          @keydown.ctrl.enter="handleCtrlEnter"
          placeholder="Describe your architectural vision... (Enter to send, Shift+Enter for new line)"
          class="mobile-input mobile-textarea"
          rows="3"
          :disabled="isLoading"
          ref="messageInput"
        ></textarea>
        
        <button 
          class="mobile-btn mobile-btn-primary mobile-send-btn"
          @click="sendMessage"
          :disabled="!inputText.trim() || isLoading"
        >
          <i data-lucide="send" class="w-5 h-5"></i>
        </button>
      </div>
      
      <!-- Tool Bar -->
      <div class="mobile-toolbar">
        <button class="mobile-tool-btn" @click="attachFile">
          <i data-lucide="paperclip" class="w-4 h-4"></i>
        </button>
        <button class="mobile-tool-btn" @click="openCamera">
          <i data-lucide="camera" class="w-4 h-4"></i>
        </button>
        <button class="mobile-tool-btn" @click="openSketch">
          <i data-lucide="pen-tool" class="w-4 h-4"></i>
        </button>
        <button class="mobile-tool-btn" @click="optimizePrompt" :disabled="isOptimizing">
          <i data-lucide="compass" class="w-4 h-4"></i>
          {{ isOptimizing ? '...' : '' }}
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav">
      <div class="mobile-nav-items">
        <a href="#" class="mobile-nav-item active">
          <i data-lucide="message-square" class="mobile-nav-icon"></i>
          <span class="mobile-nav-label">Chat</span>
        </a>
        <a href="#" class="mobile-nav-item">
          <i data-lucide="folder" class="mobile-nav-icon"></i>
          <span class="mobile-nav-label">Projects</span>
        </a>
        <a href="#" class="mobile-nav-item">
          <i data-lucide="compass" class="mobile-nav-icon"></i>
          <span class="mobile-nav-label">Design</span>
        </a>
        <a href="#" class="mobile-nav-item">
          <i data-lucide="user" class="mobile-nav-icon"></i>
          <span class="mobile-nav-label">Profile</span>
        </a>
      </div>
    </nav>

    <!-- Settings Sheet -->
    <div class="mobile-sheet" :class="{ 'open': showSettings }">
      <div class="mobile-sheet-handle"></div>
      <div class="p-6">
        <h2 class="mobile-heading-2 mb-6">Settings</h2>
        
        <div class="space-y-6">
          <div>
            <label class="mobile-caption block mb-2">AI Model</label>
            <select class="mobile-input">
              <option>CodeLlama-7B (Fast)</option>
              <option>CodeLlama-13B (Detailed)</option>
              <option>CodeLlama-34B (Expert)</option>
            </select>
          </div>
          
          <div>
            <label class="mobile-caption block mb-2">Voice Settings</label>
            <div class="space-y-3">
              <label class="flex items-center gap-3">
                <input type="checkbox" v-model="autoSpeak" class="w-5 h-5">
                <span class="mobile-body">Auto-speak responses</span>
              </label>
              <label class="flex items-center gap-3">
                <input type="checkbox" v-model="voiceInput" class="w-5 h-5">
                <span class="mobile-body">Voice input enabled</span>
              </label>
            </div>
          </div>
          
          <div>
            <label class="mobile-caption block mb-2">Display</label>
            <div class="space-y-3">
              <label class="flex items-center gap-3">
                <input type="checkbox" v-model="darkMode" class="w-5 h-5">
                <span class="mobile-body">Dark mode</span>
              </label>
              <label class="flex items-center gap-3">
                <input type="checkbox" v-model="highContrast" class="w-5 h-5">
                <span class="mobile-body">High contrast</span>
              </label>
            </div>
          </div>
        </div>
        
        <button class="mobile-btn mobile-btn-primary w-full mt-8" @click="toggleSettings">
          Close Settings
        </button>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="mobile-error-toast">
      <div class="flex items-center gap-3">
        <i data-lucide="alert-circle" class="w-5 h-5 text-red-500"></i>
        <span class="mobile-body">{{ error }}</span>
        <button @click="error = null" class="mobile-btn mobile-btn-secondary">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import apiService from '../services/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Reactive state
const hasContent = computed(() => messages.value.length > 1); // More than just welcome message
const messages = ref<ChatMessage[]>([]);
const inputText = ref('');
const isLoading = ref(false);
const isSpeaking = ref(false);
const isRecording = ref(false);
const isOptimizing = ref(false);
const error = ref<string | null>(null);
const showSettings = ref(false);

// Settings
const autoSpeak = ref(false);
const voiceInput = ref(true);
const darkMode = ref(false);
const highContrast = ref(false);

// Template refs
const messagesContainer = ref<HTMLElement>();
const messageInput = ref<HTMLTextAreaElement>();

// Initialize with welcome message
onMounted(() => {
  const welcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: '👋 Welcome to @Architect! I\'m your AI architectural assistant. I can help you create blueprints, analyze structures, select materials, and ensure building code compliance.\n\nWhat architectural challenge can I help you solve today?',
    timestamp: new Date()
  };
  messages.value.push(welcomeMessage);
  
  // Initialize Lucide icons
  if (typeof window !== 'undefined' && (window as any).lucide) {
    (window as any).lucide.createIcons();
  }
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
});

// Methods
const sendMessage = async () => {
  if (!inputText.value.trim() || isLoading.value) return;
  
  const userMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    role: 'user',
    content: inputText.value.trim(),
    timestamp: new Date()
  };
  
  messages.value.push(userMessage);
  const currentInput = inputText.value;
  inputText.value = '';
  
  await scrollToBottom();
  
  try {
    isLoading.value = true;
    
    // Use real AI service
    const response = await apiService.chatWithAI({
      messages: [
        { role: 'system', content: 'You are an expert AI architect and designer named @Architect. Specialize in creating detailed architectural blueprints, structural designs, and construction plans. Provide responses in markdown with technical precision.' },
        { role: 'user', content: currentInput }
      ]
    });
    
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: response.response,
      timestamp: new Date()
    };
    
    messages.value.push(assistantMessage);
    
    if (autoSpeak.value) {
      await speakMessage(response.response);
    }
    
    // Show notification if page is not visible
    if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('New message from @Architect', {
        body: response.response.substring(0, 100) + '...',
        icon: '/architect-icon.png'
      });
    }
    
  } catch (err: any) {
    error.value = err.message || 'Failed to send message. Please try again.';
    console.error('Send message error:', err);
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
};

const generateArchitecturalResponse = async (prompt: string): Promise<string> => {
  // Simulate AI response (replace with actual API call)
  const responses = [
    `I'll help you design a comprehensive architectural solution for ${prompt}. Let me create a detailed blueprint with structural analysis, material recommendations, and building code compliance.\n\n## Design Approach\n- **Style**: Modern sustainable architecture\n- **Structure**: Steel frame with concrete core\n- **Materials**: Recycled steel, low-carbon concrete, bamboo flooring\n- **Energy**: Passive solar design with solar panels\n\n## Next Steps\n1. Site analysis and feasibility study\n2. Concept development and 3D modeling\n3. Structural engineering calculations\n4. Building permit applications`,
    
    `For your ${prompt} request, I recommend the following architectural strategy:\n\n## Planning Phase\n- Conduct thorough site analysis\n- Review local zoning regulations\n- Assess environmental impact\n- Engage stakeholders early\n\n## Design Phase\n- Develop conceptual drawings\n- Create 3D visualizations\n- Perform structural analysis\n- Select sustainable materials\n\n## Implementation\n- Obtain necessary permits\n- Schedule construction phases\n- Monitor quality control\n- Ensure timeline adherence`,
    
    `Your ${prompt} project requires careful architectural consideration. Here's my professional assessment:\n\n## Key Considerations\n- **Structural Integrity**: Load-bearing walls and foundation design\n- **Energy Efficiency**: Passive design strategies and renewable systems\n- **Accessibility**: ADA compliance and universal design\n- **Sustainability**: Green materials and waste reduction\n\n## Recommended Approach\nI suggest starting with a feasibility study, followed by schematic design, then detailed construction documents. Would you like me to elaborate on any specific aspect?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const speakMessage = async (text: string) => {
  if (!('speechSynthesis' in window)) return;
  
  isSpeaking.value = true;
  try {
    // Use real TTS service if available, fallback to browser TTS
    if (apiService.getNetworkStatus().online) {
      try {
        const audioBlob = await apiService.speakText({ text });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        return new Promise((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve(void 0);
          };
          audio.onerror = reject;
          audio.play();
        });
      } catch (ttsError) {
        console.warn('TTS service failed, using browser TTS:', ttsError);
        // Fall back to browser TTS
      }
    }
    
    // Browser TTS fallback
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    return new Promise((resolve, reject) => {
      utterance.onend = resolve;
      utterance.onerror = reject;
      speechSynthesis.speak(utterance);
    });
  } catch (error) {
    console.error('Speech synthesis error:', error);
  } finally {
    isSpeaking.value = false;
  }
};

const copyMessage = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Show toast notification (implement as needed)
  } catch (error) {
    console.error('Copy failed:', error);
  }
};

const formatMessage = (content: string) => {
  return content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="mobile-code-block"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="mobile-inline-code">$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const handleEnter = (event: KeyboardEvent) => {
  if (event.shiftKey) {
    // Allow new line with Shift+Enter
    return;
  }
  if (!inputText.value.includes('\n')) {
    sendMessage();
  }
};

const handleCtrlEnter = () => {
  inputText.value += '\n';
};

const toggleVoiceInput = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    error.value = 'Speech recognition not supported on this device';
    return;
  }
  
  if (isRecording.value) {
    stopVoiceInput();
  } else {
    startVoiceInput();
  }
};

const startVoiceInput = () => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    isRecording.value = true;
  };
  
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    inputText.value = transcript;
    isRecording.value = false;
    
    // Focus input after voice input
    if (messageInput.value) {
      messageInput.value.focus();
    }
  };
  
  recognition.onerror = () => {
    isRecording.value = false;
    error.value = 'Voice input failed. Please try again.';
  };
  
  recognition.onend = () => {
    isRecording.value = false;
  };
  
  recognition.start();
};

const stopVoiceInput = () => {
  isRecording.value = false;
};

const optimizePrompt = async () => {
  if (!inputText.value.trim() || isOptimizing.value) return;
  
  isOptimizing.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const optimized = `Architectural Design Request: ${inputText.value}\n\nPlease provide:\n- Detailed structural analysis\n- Material recommendations\n- Building code compliance\n- Cost estimates\n- Timeline projections\n- Sustainability considerations`;
    
    inputText.value = optimized;
  } catch (error: any) {
    error.value = 'Failed to optimize prompt';
  } finally {
    isOptimizing.value = false;
  }
};

const quickAction = (action: string) => {
  const prompts = {
    blueprint: 'Create a detailed architectural blueprint for a modern sustainable home with 3 bedrooms, 2 bathrooms, and an open-plan living area.',
    structure: 'Analyze the structural requirements for a 2-story commercial building with retail space on the ground floor and offices above.',
    materials: 'Recommend sustainable and eco-friendly building materials for a residential construction project in a temperate climate.',
    codes: 'Explain the building code requirements and permit process for constructing a new single-family home in California.'
  };
  
  inputText.value = prompts[action as keyof typeof prompts] || '';
  if (messageInput.value) {
    messageInput.value.focus();
  }
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

const attachFile = () => {
  // Implement file attachment
  console.log('Attach file');
};

const openCamera = () => {
  // Implement camera functionality
  console.log('Open camera');
};

const openSketch = () => {
  // Implement sketch/drawing functionality
  console.log('Open sketch');
};

// Cleanup
onBeforeUnmount(() => {
  if (isRecording.value) {
    stopVoiceInput();
  }
  if (isSpeaking.value) {
    speechSynthesis.cancel();
  }
});
</script>

<style scoped>
.mobile-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
}

.mobile-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--mobile-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--mobile-space-4);
}

.mobile-message {
  display: flex;
  gap: var(--mobile-space-3);
}

.mobile-message.user {
  flex-direction: row-reverse;
}

.mobile-message-content {
  max-width: 80%;
  padding: var(--mobile-space-4);
  border-radius: 1rem;
  position: relative;
}

.mobile-message.user .mobile-message-content {
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.mobile-message.assistant .mobile-message-content {
  background: white;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 0.25rem;
}

.mobile-message-text {
  line-height: 1.6;
  word-wrap: break-word;
}

.mobile-message-text :deep(.mobile-code-block) {
  background: #f1f5f9;
  padding: var(--mobile-space-3);
  border-radius: 0.5rem;
  font-size: var(--mobile-text-sm);
  overflow-x: auto;
  margin: var(--mobile-space-2) 0;
}

.mobile-message-text :deep(.mobile-inline-code) {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: var(--mobile-text-sm);
}

.mobile-message-time {
  font-size: var(--mobile-text-xs);
  color: #64748b;
  margin-top: var(--mobile-space-2);
  opacity: 0.7;
}

.mobile-message-actions {
  display: flex;
  gap: var(--mobile-space-2);
  margin-top: var(--mobile-space-3);
  opacity: 0;
  transition: opacity 0.2s;
}

.mobile-message-content:hover .mobile-message-actions {
  opacity: 1;
}

.mobile-quick-actions {
  padding: var(--mobile-space-4);
}

.mobile-card-action {
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}

.mobile-card-action:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: var(--mobile-space-4);
  padding-bottom: calc(var(--mobile-space-4) + env(safe-area-inset-bottom));
  z-index: 40;
}

.mobile-input-wrapper {
  display: flex;
  gap: var(--mobile-space-2);
  align-items: flex-end;
}

.mobile-voice-btn {
  flex-shrink: 0;
}

.mobile-voice-btn.recording {
  background: #ef4444;
  color: white;
  animation: pulse 1.5s infinite;
}

.mobile-send-btn {
  flex-shrink: 0;
}

.mobile-toolbar {
  display: flex;
  gap: var(--mobile-space-3);
  margin-top: var(--mobile-space-3);
  justify-content: center;
}

.mobile-tool-btn {
  width: var(--touch-target-min);
  height: var(--touch-target-min);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #64748b;
  transition: all 0.2s ease;
}

.mobile-tool-btn:active {
  background: #e2e8f0;
  transform: scale(0.95);
}

.mobile-error-toast {
  position: fixed;
  top: var(--mobile-space-4);
  left: var(--mobile-space-4);
  right: var(--mobile-space-4);
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: var(--mobile-space-3);
  z-index: 50;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive adjustments */
@media (max-width: 375px) {
  .mobile-message-content {
    max-width: 85%;
  }
  
  .mobile-toolbar {
    gap: var(--mobile-space-2);
  }
  
  .mobile-tool-btn {
    width: calc(var(--touch-target-min) - 0.5rem);
    height: calc(var(--touch-target-min) - 0.5rem);
  }
}

@media (min-width: 640px) {
  .mobile-container {
    max-width: 640px;
    margin: 0 auto;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-message-content {
    max-width: 70%;
  }
}
</style>
