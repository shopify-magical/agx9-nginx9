<template>
  <div id="app" class="w-full max-w-3xl" v-cloak>
    <div class="bg-brand-base rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-brand-border flex flex-col overflow-hidden font-sans">
      
      <div class="px-5 py-3 flex items-center gap-2.5">
        
        <svg class="w-8 h-8 drop-shadow-md flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <g class="animate-spin-slow">
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

        <span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 text-sm tracking-wide">@Builder</span>
        <span class="text-sm drop-shadow-sm">🛠️</span>
      </div>

      <div class="px-3 pb-3">
        <div class="bg-gradient-to-br from-white to-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] rounded-xl border border-brand-border flex flex-col transition-all duration-300"
             :class="{'glow-focus': isFocused}">
          
          <div class="relative w-full rounded-t-xl overflow-hidden pt-3 px-1">
            <div v-if="!hasContent && !isFocused" 
                 class="absolute top-4 left-4 text-slate-400 text-sm pointer-events-none z-10 font-medium tracking-wide"
                 @click="focusEditor">
              You are chatting with Builder now
            </div>

            <div ref="editorContainer" class="w-full h-[80px]"></div>
          </div>

          <div class="flex justify-between items-center px-3 pb-3 pt-1 mt-auto">
            
            <!-- Left Tools -->
            <div class="flex items-center gap-4 text-slate-400">
              <button class="hover:text-slate-700 transition-colors font-medium text-lg" title="Mention">@</button>
              <button class="hover:text-slate-700 transition-colors font-medium text-lg" title="Reference">#</button>
              <button class="hover:text-slate-700 transition-colors" title="Upload Image">
                <i data-lucide="image" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Right Tools -->
            <div class="flex items-center gap-3">
              <button class="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors text-sm font-medium mr-1">
                GPT-4o
                <i data-lucide="chevron-down" class="w-4 h-4"></i>
              </button>
              
              <button class="text-slate-400 hover:text-orange-500 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" 
                      :class="{'text-orange-500 animate-pulse drop-shadow-[0_0_12px_rgba(251,146,60,1)]': isOptimizing}"
                      title="Auto-Optimize to Professional Design Prompt"
                      @click="optimizePrompt"
                      :disabled="isOptimizing">
                <i data-lucide="flame" class="w-5 h-5"></i>
              </button>

              <button class="bg-brand-mic text-slate-500 hover:text-slate-800 p-1.5 rounded-md transition-all border border-slate-300 hover:border-slate-400"
                    @click="handleVoiceInput"
                    :class="{ 'text-red-500 animate-pulse': isRecording }"
                    title="Voice Input (Ctrl+M)">
                <i data-lucide="mic" class="w-4 h-4"></i>
              </button>

              <button class="bg-brand-blue text-white p-1.5 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] active:scale-95"
                      @click="submitPrompt">
                <i data-lucide="arrow-up" class="w-4 h-4"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useMonacoEditor } from '../composables/useMonacoEditor';

const editorContainer = ref<HTMLElement | null>(null);
const isRecording = ref(false);
const { 
  hasContent, 
  isFocused, 
  isOptimizing, 
  submitPrompt, 
  optimizePrompt, 
  focusEditor,
  startVoiceInput,
  initializeMonaco,
  cleanup
} = useMonacoEditor(editorContainer);

onMounted(async () => {
  // Initialize Lucide icons
  if (typeof window !== 'undefined' && (window as any).lucide) {
    (window as any).lucide.createIcons();
  }
  
  // Initialize Monaco Editor
  if (editorContainer.value) {
    await initializeMonaco();
  }
});

onBeforeUnmount(() => {
  cleanup();
});

// Voice input state management
const handleVoiceInput = async () => {
  if (isRecording.value) return;
  
  isRecording.value = true;
  try {
    await startVoiceInput();
  } catch (error) {
    console.error('Voice input failed:', error);
  } finally {
    isRecording.value = false;
  }
};
</script>
