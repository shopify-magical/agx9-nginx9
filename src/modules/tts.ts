/**
 * Cloudflare Text-to-Speech Module
 * Uses @cf/tts1-turbo-hifi model
 */

export interface TTSOptions {
  voice?: 'female' | 'male';
  speed?: number;
  language?: string;
}

export interface TTSResponse {
  audio: ArrayBuffer;
  duration?: number;
  sampleRate?: number;
}

export class TTSModule {
  private workerUrl: string;
  private defaultOptions: TTSOptions;

  constructor(workerUrl: string, defaultOptions: TTSOptions = {}) {
    this.workerUrl = workerUrl;
    this.defaultOptions = {
      voice: 'female',
      speed: 1.0,
      language: 'en',
      ...defaultOptions
    };
  }

  /**
   * Convert text to speech using Cloudflare TTS
   */
  async synthesize(text: string, options: TTSOptions = {}): Promise<TTSResponse> {
    const requestOptions = { ...this.defaultOptions, ...options };
    
    try {
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: '@cf/tts1-turbo-hifi',
          input: text,
          voice: requestOptions.voice,
          speed: requestOptions.speed,
          language: requestOptions.language
        })
      });

      if (!response.ok) {
        throw new Error(`TTS API Error: ${response.status} ${response.statusText}`);
      }

      // Get audio data as ArrayBuffer
      const audioBuffer = await response.arrayBuffer();
      
      return {
        audio: audioBuffer,
        duration: this.estimateDuration(audioBuffer),
        sampleRate: 24000 // TTS1-turbo-hifi sample rate
      };

    } catch (error) {
      console.error('TTS synthesis failed:', error);
      throw new Error(`Failed to synthesize speech: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Play synthesized audio directly
   */
  async play(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      const { audio } = await this.synthesize(text, options);
      await this.playAudio(audio);
    } catch (error) {
      console.error('Failed to play TTS audio:', error);
      throw error;
    }
  }

  /**
   * Create audio element from ArrayBuffer and play it
   */
  private async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    const blob = new Blob([audioBuffer], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);
    
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      
      audio.play().catch(reject);
    });
  }

  /**
   * Estimate audio duration from buffer size
   */
  private estimateDuration(audioBuffer: ArrayBuffer): number {
    // Rough estimation: 16-bit PCM, 24kHz sample rate
    const bytesPerSecond = 24000 * 2; // sample rate * bytes per sample
    return audioBuffer.byteLength / bytesPerSecond;
  }

  /**
   * Get available voices
   */
  getAvailableVoices(): string[] {
    return ['female', 'male'];
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): string[] {
    return ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'];
  }
}

// Vue composable for easy integration
import { ref, readonly } from 'vue';

export function useTTS(workerUrl: string, defaultOptions?: TTSOptions) {
  const tts = new TTSModule(workerUrl, defaultOptions);
  
  const isPlaying = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const speak = async (text: string, options?: TTSOptions) => {
    if (!text.trim()) return;
    
    isLoading.value = true;
    error.value = null;
    isPlaying.value = true;
    
    try {
      await tts.play(text, options);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'TTS failed';
      throw err;
    } finally {
      isLoading.value = false;
      isPlaying.value = false;
    }
  };

  const synthesize = async (text: string, options?: TTSOptions) => {
    if (!text.trim()) return null;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      return await tts.synthesize(text, options);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'TTS synthesis failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    speak,
    synthesize,
    isPlaying: readonly(isPlaying),
    isLoading: readonly(isLoading),
    error: readonly(error),
    getAvailableVoices: tts.getAvailableVoices.bind(tts),
    getSupportedLanguages: tts.getSupportedLanguages.bind(tts)
  };
}
