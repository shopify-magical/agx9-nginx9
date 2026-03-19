import { ref, type Ref } from 'vue';
import { useAIService, type TTSOptions, type LLMOptions } from '../modules';

export function useMonacoEditor(editorContainer: Ref<HTMLElement | null>) {
  const hasContent = ref(false);
  const isFocused = ref(false);
  const isOptimizing = ref(false);
  let monacoEditor: any = null;

  // Initialize AI Service with Cloudflare Workers
  const { 
    generate, 
    speak, 
    generateAndSpeak,
    isLoading: isAILoading,
    isSpeaking,
    error: aiError
  } = useAIService(
    'https://YOUR_TTS_WORKER.workers.dev', // Replace with your TTS worker URL
    'https://YOUR_LLM_WORKER.workers.dev',  // Replace with your LLM worker URL
    { voice: 'female', speed: 1.0 }, // TTS options
    { temperature: 0.7, maxTokens: 2048 } // LLM options
  );

  const submitPrompt = async () => {
    if (!monacoEditor || isOptimizing.value) return;
    
    const val = monacoEditor.getValue();
    if(val.trim() !== '') {
      console.log("Submitting prompt:", val);
      
      // Turn on the flame animation while we wait for the AI
      isOptimizing.value = true;
      
      try {
        // Use CodeLlama for intelligent responses
        const response = await generate(val, {
          systemPrompt: 'You are an expert AI design assistant named @Builder. Keep answers concise, helpful, and in markdown.',
          temperature: 0.7,
          maxTokens: 2048
        });
        
        // Append the AI's response to your editor pad
        const currentText = monacoEditor.getValue();
        const newText = `${currentText}\n\n---\n**@Builder:**\n${response.response}\n\n`;
        monacoEditor.setValue(newText);
        
        // Scroll to the bottom to see the new message
        const model = monacoEditor.getModel();
        monacoEditor.setPosition({ lineNumber: model.getLineCount(), column: 1 });
        monacoEditor.revealLine(model.getLineCount());
        
        // Optionally speak the response (uncomment to enable)
        // await speak(response.response, { voice: 'female', speed: 1.1 });
        
      } catch (error) {
        console.error("Chatbot Error:", error);
        monacoEditor.setValue(monacoEditor.getValue() + '\n\n[Error: Could not connect to AI service. Check your worker URLs!]');
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

  const optimizePrompt = async () => {
    if (!monacoEditor || isOptimizing.value) return;
    
    isOptimizing.value = true;
    const currentVal = monacoEditor.getValue().trim();
    
    try {
      let optimizedText = "";
      
      if (currentVal === '') {
        // Use CodeLlama to generate a professional prompt
        const response = await generate(
          "Generate a professional UI/UX design prompt that emphasizes modern design principles, accessibility, and user experience.",
          {
            systemPrompt: 'You are an expert design consultant. Generate professional, specific design prompts.',
            temperature: 0.8,
            maxTokens: 150
          }
        );
        optimizedText = response.response;
      } else {
        // Use CodeLlama to enhance the user's prompt
        const response = await generate(
          `Transform this design request into a professional specification:\n\n${currentVal}\n\nMake it more detailed, professional, and actionable.`,
          {
            systemPrompt: 'You are an expert design consultant. Transform basic ideas into professional design specifications.',
            temperature: 0.6,
            maxTokens: 300
          }
        );
        optimizedText = response.response;
      }
      
      monacoEditor.setValue(optimizedText);
      
      // Re-focus and set cursor to end
      monacoEditor.focus();
      const model = monacoEditor.getModel();
      monacoEditor.setPosition({ lineNumber: model.getLineCount(), column: model.getLineMaxColumn(model.getLineCount()) });
      
    } catch (error) {
      console.error("Optimization Error:", error);
      // Fallback to original optimization logic
      setTimeout(() => {
        let fallbackText = "";
        
        if (currentVal === '') {
          fallbackText = "Create a sleek, modern UI design emphasizing intuitive data visualization. Use a dark-mode theme with vibrant neon accents, ensuring high contrast and WCAG compliance. Deliver pixel-perfect layouts with subtle micro-interactions.";
        } else {
          fallbackText = `Design Request:\n${currentVal}\n\nProfessional Specifications:\n- Clean, modern, and minimalist UI/UX aesthetic\n- High-fidelity visual design with cohesive, legible typography\n- Optimized for user engagement, accessibility, and conversion\n- Incorporate subtle gradients, soft neumorphic shadows, and precise grid spacing`;
        }
        
        monacoEditor.setValue(fallbackText);
      }, 500);
    } finally {
      isOptimizing.value = false;
    }
  };

  // Voice input functionality
  const startVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      // Insert transcribed text into Monaco editor
      const currentText = monacoEditor.getValue();
      const position = monacoEditor.getPosition();
      const model = monacoEditor.getModel();
      
      // Get current line content
      const lineContent = model.getLineContent(position.lineNumber);
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
  };

  const initializeMonaco = async () => {
    if (!editorContainer.value) return;

    // Load Monaco Editor
    const monaco = await loadMonaco() as any;
    
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
      startVoiceInput();
    });

    return monacoEditor;
  };

  const loadMonaco = async () => {
    return new Promise((resolve: any) => {
      if ((window as any).monaco) {
        resolve((window as any).monaco);
        return;
      }

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
          const monaco = (window as any).monaco as any;
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
          resolve(monaco);
        });
      };
      document.head.appendChild(script);
    });
  };

  const cleanup = () => {
    if (monacoEditor) {
      monacoEditor.dispose();
    }
  };

  return {
    hasContent,
    isFocused,
    isOptimizing,
    submitPrompt,
    optimizePrompt,
    focusEditor,
    startVoiceInput,
    isAILoading,
    isSpeaking,
    aiError,
    initializeMonaco,
    cleanup
  };
}
