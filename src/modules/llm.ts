/**
 * Cloudflare CodeLlama Module
 * Uses @cf/codellama/codellama-7b-instruct model
 */

export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  systemPrompt?: string;
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  response: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  finishReason?: string;
}

export class LLMModule {
  private workerUrl: string;
  private defaultOptions: LLMOptions;

  constructor(workerUrl: string, defaultOptions: LLMOptions = {}) {
    this.workerUrl = workerUrl;
    this.defaultOptions = {
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.9,
      systemPrompt: 'You are a helpful AI assistant.',
      ...defaultOptions
    };
  }

  /**
   * Generate completion using CodeLlama
   */
  async generate(
    prompt: string, 
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    const requestOptions = { ...this.defaultOptions, ...options };
    
    try {
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '@cf/codellama/codellama-7b-instruct',
          messages: [
            {
              role: 'system',
              content: requestOptions.systemPrompt
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: requestOptions.temperature,
          max_tokens: requestOptions.maxTokens,
          top_p: requestOptions.topP
        })
      });

      if (!response.ok) {
        throw new Error(`LLM API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        response: data.response || data.choices?.[0]?.message?.content || '',
        usage: data.usage,
        model: data.model || '@cf/codellama/codellama-7b-instruct',
        finishReason: data.finish_reason
      };

    } catch (error) {
      console.error('LLM generation failed:', error);
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Chat with conversation history
   */
  async chat(
    messages: LLMMessage[], 
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    const requestOptions = { ...this.defaultOptions, ...options };
    
    // Add system message if not provided
    const chatMessages = messages.some(msg => msg.role === 'system') 
      ? messages 
      : [
          { role: 'system', content: requestOptions.systemPrompt },
          ...messages
        ];

    try {
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '@cf/codellama/codellama-7b-instruct',
          messages: chatMessages,
          temperature: requestOptions.temperature,
          max_tokens: requestOptions.maxTokens,
          top_p: requestOptions.topP
        })
      });

      if (!response.ok) {
        throw new Error(`LLM API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        response: data.response || data.choices?.[0]?.message?.content || '',
        usage: data.usage,
        model: data.model || '@cf/codellama/codellama-7b-instruct',
        finishReason: data.finish_reason
      };

    } catch (error) {
      console.error('LLM chat failed:', error);
      throw new Error(`Failed to generate chat response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Code completion specific method
   */
  async completeCode(
    code: string, 
    language?: string,
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    const codePrompt = language 
      ? `Complete the following ${language} code:\n\n${code}\n\nCompletion:`
      : `Complete the following code:\n\n${code}\n\nCompletion:`;

    const codeOptions = {
      ...options,
      systemPrompt: options.systemPrompt || 'You are an expert programmer. Complete the code accurately and efficiently.'
    };

    return this.generate(codePrompt, codeOptions);
  }

  /**
   * Code analysis and explanation
   */
  async explainCode(
    code: string, 
    language?: string,
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    const explainPrompt = language
      ? `Explain the following ${language} code in detail:\n\n${code}`
      : `Explain the following code in detail:\n\n${code}`;

    const explainOptions = {
      ...options,
      systemPrompt: options.systemPrompt || 'You are an expert programming instructor. Explain code clearly and thoroughly.'
    };

    return this.generate(explainPrompt, explainOptions);
  }

  /**
   * Generate code from description
   */
  async generateCode(
    description: string,
    language?: string,
    options: LLMOptions = {}
  ): Promise<LLMResponse> {
    const codePrompt = language
      ? `Write ${language} code for the following description:\n\n${description}\n\nCode:`
      : `Write code for the following description:\n\n${description}\n\nCode:`;

    const codeOptions = {
      ...options,
      systemPrompt: options.systemPrompt || 'You are an expert programmer. Write clean, efficient, and well-commented code.'
    };

    return this.generate(codePrompt, codeOptions);
  }

  /**
   * Stream response (if supported by worker)
   */
  async *streamGenerate(
    prompt: string, 
    options: LLMOptions = {}
  ): AsyncGenerator<string, void, unknown> {
    const requestOptions = { ...this.defaultOptions, ...options };
    
    try {
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '@cf/codellama/codellama-7b-instruct',
          messages: [
            {
              role: 'system',
              content: requestOptions.systemPrompt
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: requestOptions.temperature,
          max_tokens: requestOptions.maxTokens,
          top_p: requestOptions.topP,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`LLM API Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || parsed.response;
              if (content) yield content;
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('LLM streaming failed:', error);
      throw new Error(`Failed to stream response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Vue composable for easy integration
import { ref, readonly } from 'vue';

export function useLLM(workerUrl: string, defaultOptions?: LLMOptions) {
  const llm = new LLMModule(workerUrl, defaultOptions);
  
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const response = ref<string>('');

  const generate = async (prompt: string, options?: LLMOptions) => {
    if (!prompt.trim()) return;
    
    isLoading.value = true;
    error.value = null;
    response.value = '';
    
    try {
      const result = await llm.generate(prompt, options);
      response.value = result.response;
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'LLM generation failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const chat = async (messages: LLMMessage[], options?: LLMOptions) => {
    if (!messages.length) return;
    
    isLoading.value = true;
    error.value = null;
    response.value = '';
    
    try {
      const result = await llm.chat(messages, options);
      response.value = result.response;
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'LLM chat failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const completeCode = async (code: string, language?: string, options?: LLMOptions) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      return await llm.completeCode(code, language, options);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Code completion failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const explainCode = async (code: string, language?: string, options?: LLMOptions) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      return await llm.explainCode(code, language, options);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Code explanation failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const generateCode = async (description: string, language?: string, options?: LLMOptions) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      return await llm.generateCode(description, language, options);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Code generation failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    generate,
    chat,
    completeCode,
    explainCode,
    generateCode,
    isLoading: readonly(isLoading),
    error: readonly(error),
    response: readonly(response)
  };
}
