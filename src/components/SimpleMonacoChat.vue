<template>
  <div class="w-full max-w-3xl" v-cloak>
    <div class="bg-brand-base rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-brand-border flex flex-col overflow-hidden font-sans">
      
      <div class="px-5 py-3 flex items-center gap-2.5">
        
        <svg class="w-8 h-8 drop-shadow-lg flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="blueprintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4FC3F7;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1976D2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g class="animate-spin-slow" filter="url(#glow)">
            <!-- Blueprint grid lines -->
            <line x1="20" y1="50" x2="80" y2="50" stroke="url(#blueprintGrad)" stroke-width="0.5" opacity="0.6"/>
            <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blueprintGrad)" stroke-width="0.5" opacity="0.6"/>
            <line x1="30" y1="30" x2="70" y2="70" stroke="url(#blueprintGrad)" stroke-width="0.3" opacity="0.4"/>
            <line x1="70" y1="30" x2="30" y2="70" stroke="url(#blueprintGrad)" stroke-width="0.3" opacity="0.4"/>
            
            <!-- Compass points -->
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(15 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(30 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(45 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(60 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(75 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(90 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(105 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(120 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(135 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(150 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(165 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(180 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(195 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(210 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(225 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(240 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(255 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(270 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(285 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(300 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(315 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(330 50 50)" />
            <polygon points="48.5,80 51.5,80 50,98" fill="#4FC3F7" transform="rotate(345 50 50)" />
          </g>
          
          <!-- Main blueprint circle -->
          <circle cx="50" cy="50" r="28" fill="none" stroke="url(#blueprintGrad)" stroke-width="2" stroke-dasharray="5,3" opacity="0.8"/>
          
          <!-- Inner architectural elements -->
          <rect x="35" y="35" width="30" height="30" fill="none" stroke="url(#blueprintGrad)" stroke-width="1" opacity="0.6"/>
          <circle cx="50" cy="50" r="8" fill="none" stroke="url(#blueprintGrad)" stroke-width="1.5"/>
          
          <!-- Center point -->
          <circle cx="50" cy="50" r="3" fill="#4FC3F7"/>
          
          <!-- Corner marks -->
          <path d="M 25 25 L 30 25 L 30 30" fill="none" stroke="url(#blueprintGrad)" stroke-width="1"/>
          <path d="M 70 25 L 75 25 L 75 30" fill="none" stroke="url(#blueprintGrad)" stroke-width="1"/>
          <path d="M 25 75 L 30 75 L 30 70" fill="none" stroke="url(#blueprintGrad)" stroke-width="1"/>
          <path d="M 70 75 L 75 75 L 75 70" fill="none" stroke="url(#blueprintGrad)" stroke-width="1"/>
        </svg>

        <span class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 text-sm tracking-wide">@Architect</span>
        <span class="text-sm drop-shadow-sm">�</span>
      </div>

      <div class="px-3 pb-3">
        <div class="bg-gradient-to-br from-white to-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] rounded-xl border border-brand-border flex flex-col transition-all duration-300"
             :class="{'glow-focus': isFocused}">
          
          <div class="relative w-full rounded-t-xl overflow-hidden pt-3 px-1">
            <div v-if="!hasContent && !isFocused" 
                 class="absolute top-4 left-4 text-slate-400 text-sm pointer-events-none z-10 font-medium tracking-wide"
                 @click="focusEditor">
              You are designing with Architect now
            </div>

            <div ref="editorContainer" class="w-full h-[80px]"></div>
          </div>

          <div class="flex justify-between items-center px-3 pb-3 pt-1 mt-auto">
            
            <!-- Left Tools -->
            <div class="flex items-center gap-4 text-slate-400">
              <button class="hover:text-slate-700 transition-colors font-medium text-lg" title="Layer">📋</button>
              <button class="hover:text-slate-700 transition-colors font-medium text-lg" title="Grid">⊞</button>
              <button class="hover:text-slate-700 transition-colors" title="Blueprint">
                <i data-lucide="drafting-compass" class="w-5 h-5"></i>
              </button>
            </div>

            <!-- Right Tools -->
            <div class="flex items-center gap-3">
              <button class="text-slate-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" 
                      :class="{'text-blue-500 animate-pulse drop-shadow-[0_0_12px_rgba(59,130,246,1)]': isOptimizing}"
                      title="Generate Architectural Blueprint"
                      @click="optimizePrompt"
                      :disabled="isOptimizing">
                <i data-lucide="compass" class="w-5 h-5"></i>
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

const editorContainer = ref<HTMLElement | null>(null);
const hasContent = ref(false);
const isFocused = ref(false);
const isOptimizing = ref(false);
const isRecording = ref(false);
let monacoEditor: any = null;

const submitPrompt = async () => {
  if (!monacoEditor || isOptimizing.value) return;
  
  const val = monacoEditor.getValue();
  if(val.trim() !== '') {
    console.log("Submitting architectural design:", val);
    
    // Turn on the flame animation while we wait for the AI
    isOptimizing.value = true;
    
    try {
      // Replace this URL with your actual deployed Cloudflare Worker URL
      const workerUrl = 'https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev';
      
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: '@cf/codellama/codellama-7b-instruct',
          messages: [
            { role: 'system', content: 'You are an expert AI architect and designer named @Architect. Specialize in creating detailed architectural blueprints, structural designs, and construction plans. Provide responses in markdown with technical precision.' },
            { role: 'user', content: val }
          ]
        })
      });
      
      if (!response.ok) throw new Error("API Network Error");
      const data = await response.json();
      
      // Append the AI's response to your editor pad
      const currentText = monacoEditor.getValue();
      const newText = `${currentText}\n\n---\n**@Architect:**\n${data.response}\n\n`;
      monacoEditor.setValue(newText);
      
      // Scroll to the bottom to see the new message
      const model = monacoEditor.getModel();
      monacoEditor.setPosition({ lineNumber: model.getLineCount(), column: 1 });
      monacoEditor.revealLine(model.getLineCount());
      
    } catch (error) {
      console.error("Architect Error:", error);
      monacoEditor.setValue(monacoEditor.getValue() + '\n\n[Error: Could not connect to Architect service. Check your URL!]');
    } finally {
      isOptimizing.value = false;
      monacoEditor.focus();
    }
  }
};

const focusEditor = () => {
  if (monacoEditor) {
    monacoEditor.focus();
  }
};

const optimizePrompt = () => {
  if (!monacoEditor || isOptimizing.value) return;
  
  isOptimizing.value = true;
  const currentVal = monacoEditor.getValue().trim();
  
  // Simulate an AI optimizing the architectural prompt (delay for effect)
  setTimeout(() => {
    let optimizedText = "";
    
    if (currentVal === '') {
      // Default professional architectural prompt if empty
      optimizedText = "Design a modern sustainable building with integrated smart home technology. Incorporate passive solar design, rainwater harvesting systems, and energy-efficient materials. Structure should feature open floor plans, natural lighting optimization, and biophilic design elements. Include detailed specifications for foundation, load-bearing walls, and roof systems with compliance to local building codes and ADA accessibility requirements.";
    } else {
      // Restructure user's input into a professional architectural specification
      optimizedText = ` Architectural Design Request:\n${currentVal}\n\nTechnical Specifications:\n- Structural analysis and load calculations\n- Building code compliance and permits\n- Material selection and sustainability metrics\n- HVAC, electrical, and plumbing systems integration\n- Accessibility and universal design principles\n- Site analysis and environmental impact assessment\n- Construction timeline and budget estimates\n- 3D renderings and technical drawings`;
    }
    
    monacoEditor.setValue(optimizedText);
    isOptimizing.value = false;
    
    // Re-focus and set cursor to end
    monacoEditor.focus();
    const model = monacoEditor.getModel();
    monacoEditor.setPosition({ lineNumber: model.getLineCount(), column: model.getLineMaxColumn(model.getLineCount()) });
    
  }, 1000); 
};

const handleVoiceInput = async () => {
  if (isRecording.value) return;
  
  isRecording.value = true;
  try {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      // Insert transcribed text into Monaco editor
      const position = monacoEditor.getPosition();
      const model = monacoEditor.getModel();
      const lineContent = model.getLineContent(position.lineNumber);
      
      // Get current line content
      const beforeCursor = lineContent.substring(0, position.column - 1);
      const afterCursor = lineContent.substring(position.column - 1);
      
      // Insert transcribed text
      const newLineContent = beforeCursor + transcript + afterCursor;
      model.applyEdits([{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: lineContent.length + 1
        },
        text: newLineContent
      }]);
      
      // Move cursor to end of inserted text
      monacoEditor.setPosition({
        lineNumber: position.lineNumber,
        column: position.column + transcript.length
      });
    };
    
    recognition.onerror = (error: any) => {
      console.error('Speech recognition error:', error);
    };
    
    recognition.start();
  } catch (error) {
    console.error('Voice input failed:', error);
  } finally {
    setTimeout(() => {
      isRecording.value = false;
    }, 2000);
  }
};

onMounted(() => {
  // Initialize Lucide icons
  if (typeof window !== 'undefined' && (window as any).lucide) {
    (window as any).lucide.createIcons();
  }

  // Initialize Monaco Editor
  if (editorContainer.value) {
    // Configure Monaco loader
    (window as any).require = { config: { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs' }}};
    
    // Create worker proxy
    const proxy = URL.createObjectURL(new Blob([`
      self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/'
      };
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs/base/worker/workerMain.js');
    `], { type: 'text/javascript' }));

    (window as any).MonacoEnvironment = { getWorkerUrl: () => proxy };

    // Load Monaco
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs/loader.min.js';
    script.onload = () => {
      (window as any).require(['vs/editor/editor.main'], () => {
        const monaco = (window as any).monaco;
        
        // Define custom theme
        monaco.editor.defineTheme('chatTheme', {
          base: 'vs',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#f8fafc', 
            'editor.lineHighlightBackground': '#f1f5f9', 
            'editorCursor.foreground': '#4f46e5', 
          }
        });

        // Create editor instance
        monacoEditor = monaco.editor.create(editorContainer.value, {
          value: '',
          language: 'markdown', 
          theme: 'chatTheme',
          minimap: { enabled: false },
          lineNumbers: 'off',
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden'
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: 'none',
          fontSize: 14,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
          padding: { top: 4, bottom: 4 }
        });

        // Setup event listeners
        monacoEditor.onDidChangeModelContent(() => {
          hasContent.value = monacoEditor.getValue().length > 0;
        });

        monacoEditor.onDidFocusEditorWidget(() => {
          isFocused.value = true;
        });

        monacoEditor.onDidBlurEditorWidget(() => {
          isFocused.value = false;
        });

        // Add voice input command (Ctrl+M)
        monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM, () => {
          handleVoiceInput();
        });
      });
    };
    document.head.appendChild(script);
  }
});

onBeforeUnmount(() => {
  if (monacoEditor) {
    monacoEditor.dispose();
  }
});
</script>
