/**
 * Cloudflare AI Modules Index
 * Exports TTS and LLM modules for easy integration
 */

import { ref, readonly } from 'vue';
import { TTSModule, useTTS, type TTSOptions, type TTSResponse } from './tts';
import { LLMModule, useLLM, type LLMOptions, type LLMMessage, type LLMResponse } from './llm';

export { TTSModule, useTTS };
export type { TTSOptions, TTSResponse };

export { LLMModule, useLLM };
export type { LLMOptions, LLMMessage, LLMResponse };

/**
 * Combined AI Service for both TTS and LLM
 */
export class AIService {
  public tts: TTSModule;
  public llm: LLMModule;

  constructor(
    ttsWorkerUrl: string,
    llmWorkerUrl: string,
    ttsOptions?: TTSOptions,
    llmOptions?: LLMOptions
  ) {
    this.tts = new TTSModule(ttsWorkerUrl, ttsOptions);
    this.llm = new LLMModule(llmWorkerUrl, llmOptions);
  }

  /**
   * Generate response and speak it
   */
  async speakResponse(
    prompt: string,
    ttsOptions?: TTSOptions,
    llmOptions?: LLMOptions
  ): Promise<void> {
    try {
      // Generate response
      const llmResult = await this.llm.generate(prompt, llmOptions);
      
      // Speak the response
      await this.tts.play(llmResult.response, ttsOptions);
    } catch (error) {
      console.error('Failed to speak response:', error);
      throw error;
    }
  }

  /**
   * Generate response and return both text and audio
   */
  async generateSpokenResponse(
    prompt: string,
    ttsOptions?: TTSOptions,
    llmOptions?: LLMOptions
  ): Promise<{ text: string; audio: ArrayBuffer }> {
    try {
      // Generate response
      const llmResult = await this.llm.generate(prompt, llmOptions);
      
      // Synthesize audio
      const ttsResult = await this.tts.synthesize(llmResult.response, ttsOptions);
      
      return {
        text: llmResult.response,
        audio: ttsResult.audio
      };
    } catch (error) {
      console.error('Failed to generate spoken response:', error);
      throw error;
    }
  }
}

/**
 * Vue composable for combined AI service
 */
export function useAIService(
  ttsWorkerUrl: string,
  llmWorkerUrl: string,
  ttsOptions?: TTSOptions,
  llmOptions?: LLMOptions
) {
  const aiService = new AIService(ttsWorkerUrl, llmWorkerUrl, ttsOptions, llmOptions);
  
  const isLoading = ref(false);
  const isSpeaking = ref(false);
  const error = ref<string | null>(null);
  const response = ref<string>('');

  const generateAndSpeak = async (
    prompt: string,
    ttsOptions?: TTSOptions,
    llmOptions?: LLMOptions
  ) => {
    if (!prompt.trim()) return;
    
    isLoading.value = true;
    error.value = null;
    response.value = '';
    
    try {
      // Generate text response
      const llmResult = await aiService.llm.generate(prompt, llmOptions);
      response.value = llmResult.response;
      
      // Speak the response
      isSpeaking.value = true;
      await aiService.tts.play(llmResult.response, ttsOptions);
      
      return llmResult;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'AI service failed';
      throw err;
    } finally {
      isLoading.value = false;
      isSpeaking.value = false;
    }
  };

  const generateSpokenResponse = async (
    prompt: string,
    ttsOptions?: TTSOptions,
    llmOptions?: LLMOptions
  ) => {
    if (!prompt.trim()) return null;
    
    isLoading.value = true;
    error.value = null;
    response.value = '';
    
    try {
      const result = await aiService.generateSpokenResponse(prompt, ttsOptions, llmOptions);
      response.value = result.text;
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to generate spoken response';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Individual module methods
  const speak = async (text: string, options?: TTSOptions) => {
    isSpeaking.value = true;
    try {
      await aiService.tts.play(text, options);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'TTS failed';
      throw err;
    } finally {
      isSpeaking.value = false;
    }
  };

  const generate = async (prompt: string, options?: LLMOptions) => {
    isLoading.value = true;
    try {
      const result = await aiService.llm.generate(prompt, options);
      response.value = result.response;
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'LLM failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    generateAndSpeak,
    generateSpokenResponse,
    speak,
    generate,
    isLoading: readonly(isLoading),
    isSpeaking: readonly(isSpeaking),
    error: readonly(error),
    response: readonly(response),
    tts: aiService.tts,
    llm: aiService.llm
  };
}
