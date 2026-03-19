<template>
  <div class="ai-chat-container">
    <!-- Chat Messages -->
    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', message.role]"
      >
        <div class="message-content">
          <div class="message-text" v-html="formatMessage(message.content)"></div>
          <div class="message-actions" v-if="message.role === 'assistant'">
            <button @click="speakMessage(message.content)" :disabled="isSpeaking" class="action-btn">
              <i data-lucide="volume-2" class="w-4 h-4"></i>
              {{ isSpeaking ? 'Speaking...' : 'Speak' }}
            </button>
            <button @click="copyMessage(message.content)" class="action-btn">
              <i data-lucide="copy" class="w-4 h-4"></i>
              Copy
            </button>
          </div>
        </div>
      </div>
      
      <!-- Loading indicator -->
      <div v-if="isLoading" class="message assistant loading">
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-container">
      <div class="input-wrapper">
        <textarea
          v-model="inputText"
          @keydown.enter.prevent="handleEnter"
          @keydown.ctrl.enter="handleCtrlEnter"
          placeholder="Type your message... (Ctrl+Enter for new line)"
          class="message-input"
          rows="3"
          :disabled="isLoading"
        ></textarea>
        
        <div class="input-actions">
          <!-- Voice Input -->
          <button 
            @click="toggleVoiceInput" 
            :class="['voice-btn', { 'recording': isRecording }]"
            title="Voice Input"
          >
            <i data-lucide="mic" class="w-5 h-5"></i>
          </button>
          
          <!-- Send Button -->
          <button 
            @click="sendMessage"
            :disabled="!inputText.trim() || isLoading"
            class="send-btn"
          >
            <i data-lucide="send" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
      
      <!-- Model Selection -->
      <div class="model-selector">
        <label>Model:</label>
        <select v-model="selectedModel" class="model-select">
          <option value="codellama">CodeLlama-7B</option>
          <option value="custom">Custom Model</option>
        </select>
        
        <label class="voice-option">
          <input type="checkbox" v-model="autoSpeak" />
          Auto-speak responses
        </label>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="error-message">
      <i data-lucide="alert-circle" class="w-4 h-4"></i>
      {{ error }}
      <button @click="error = null" class="close-btn">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useAIService } from '../modules';
import type { LLMMessage } from '../modules';

interface ChatMessage extends LLMMessage {
  id: string;
  timestamp: Date;
}

// Props
interface Props {
  ttsWorkerUrl: string;
  llmWorkerUrl: string;
  initialMessages?: LLMMessage[];
}

const props = withDefaults(defineProps<Props>(), {
  initialMessages: () => []
});

// AI Service
const { 
  generateAndSpeak, 
  generate, 
  speak, 
  isLoading, 
  isSpeaking, 
  error 
} = useAIService(props.ttsWorkerUrl, props.llmWorkerUrl);

// Reactive state
const messages = ref<ChatMessage[]>([]);
const inputText = ref('');
const selectedModel = ref('codellama');
const autoSpeak = ref(false);
const isRecording = ref(false);
const messagesContainer = ref<HTMLElement>();

// Initialize messages
onMounted(() => {
  messages.value = props.initialMessages.map((msg, index) => ({
    ...msg,
    id: `msg-${index}`,
    timestamp: new Date()
  }));
  
  // Initialize Lucide icons
  if (typeof window !== 'undefined' && (window as any).lucide) {
    (window as any).lucide.createIcons();
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
    if (autoSpeak.value) {
      await generateAndSpeak(currentInput);
    } else {
      const response = await generate(currentInput);
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };
      messages.value.push(assistantMessage);
    }
  } catch (err) {
    console.error('Failed to send message:', err);
  }
  
  await scrollToBottom();
};

const speakMessage = async (text: string) => {
  try {
    await speak(text);
  } catch (err) {
    console.error('Failed to speak message:', err);
  }
};

const copyMessage = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy message:', err);
  }
};

const formatMessage = (content: string) => {
  // Basic markdown formatting for code blocks
  return content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const handleEnter = () => {
  if (!inputText.value.includes('\n')) {
    sendMessage();
  }
};

const handleCtrlEnter = () => {
  inputText.value += '\n';
};

const toggleVoiceInput = () => {
  if (isRecording.value) {
    stopVoiceInput();
  } else {
    startVoiceInput();
  }
};

const startVoiceInput = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.error('Speech recognition not supported');
    return;
  }
  
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
  };
  
  recognition.onerror = () => {
    isRecording.value = false;
  };
  
  recognition.onend = () => {
    isRecording.value = false;
  };
  
  recognition.start();
};

const stopVoiceInput = () => {
  isRecording.value = false;
  // Speech recognition will stop automatically
};

// Cleanup
onBeforeUnmount(() => {
  if (isRecording.value) {
    stopVoiceInput();
  }
});
</script>

<style scoped>
.ai-chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: #1b1e2a;
  border-radius: 12px;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.message.user {
  flex-direction: row-reverse;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.message.user .message-content {
  background: #3b4b72;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: #f8fafc;
  color: #1b1e2a;
  border-bottom-left-radius: 4px;
}

.message-text {
  line-height: 1.5;
  word-wrap: break-word;
}

.message-text :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.message-text :deep(pre) {
  background: rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 8px 0;
}

.message-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.message-content:hover .message-actions {
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.2);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #666;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.input-container {
  border-top: 1px solid #323748;
  padding: 16px;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #323748;
  border-radius: 8px;
  padding: 12px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
}

.message-input:focus {
  outline: none;
  border-color: #3b4b72;
}

.message-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-actions {
  display: flex;
  gap: 8px;
}

.voice-btn {
  padding: 8px;
  background: #e2e8f0;
  border: 1px solid #323748;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.voice-btn:hover {
  background: #cbd5e1;
}

.voice-btn.recording {
  background: #ef4444;
  color: white;
  animation: pulse 1.5s infinite;
}

.send-btn {
  padding: 8px;
  background: #3b4b72;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #2c3e50;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.model-selector {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  font-size: 12px;
  color: #94a3b8;
}

.model-select {
  background: #f8fafc;
  border: 1px solid #323748;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
}

.voice-option {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #ef4444;
  color: white;
  margin: 0 16px 16px;
  border-radius: 8px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
}
</style>
