// API Service for AI Architect Builder
// Connects mobile app to Cloudflare Workers backend

export interface TTSOptions {
  text: string;
  voice?: string;
  speed?: number;
}

export interface LLMOptions {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  max_tokens?: number;
  temperature?: number;
}

export interface LLMResponse {
  response: string;
  model: string;
  timestamp: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  metadata: {
    service: string;
    version: string;
    context: string;
  };
  fallback?: boolean;
  error?: string;
}

class APIService {
  private ttsWorkerUrl: string;
  private llmWorkerUrl: string;
  private isOnline: boolean;

  constructor() {
    // Get worker URLs from environment or use defaults
    this.ttsWorkerUrl = import.meta.env.VITE_TTS_WORKER_URL || 'https://architect-tts-worker.workers.dev';
    this.llmWorkerUrl = import.meta.env.VITE_LLM_WORKER_URL || 'https://architect-llm-worker.workers.dev';
    this.isOnline = navigator.onLine;
    
    // Listen for network changes
    window.addEventListener('online', () => {
      this.isOnline = true;
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Check if service is available
  async checkServiceHealth(service: 'tts' | 'llm'): Promise<boolean> {
    try {
      const url = service === 'tts' ? `${this.ttsWorkerUrl}/health` : `${this.llmWorkerUrl}/health`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      return response.ok;
    } catch (error) {
      console.warn(`Health check failed for ${service} service:`, error);
      return false;
    }
  }

  // Text-to-Speech Service
  async speakText(options: TTSOptions): Promise<Blob> {
    if (!this.isOnline) {
      throw new Error('Offline - Cannot generate speech without internet connection');
    }

    try {
      const response = await fetch(`${this.ttsWorkerUrl}/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          voice: options.voice || 'af_sky',
          speed: options.speed || 1.0,
        }),
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'TTS service failed');
      }

      return await response.blob();
    } catch (error: any) {
      console.error('TTS Error:', error);
      
      if (error && error.name === 'AbortError') {
        throw new Error('Speech generation timed out. Please try again.');
      }
      
      throw new Error('Failed to generate speech. Please check your internet connection.');
    }
  }

  // Get available voices
  async getVoices(): Promise<Array<{ id: string; name: string; language: string }>> {
    try {
      const response = await fetch(`${this.ttsWorkerUrl}/voices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Voices Error:', error);
      return []; // Return empty array on error
    }
  }

  // Large Language Model Service
  async chatWithAI(options: LLMOptions): Promise<LLMResponse> {
    if (!this.isOnline) {
      // Return offline response
      return {
        response: `I'm currently offline. As @Architect, I can still provide some basic guidance:

## Quick Architectural Tips

### Planning Phase
- Always start with site analysis and zoning requirements
- Consider local climate and environmental factors
- Plan for future expansion and flexibility

### Design Considerations
- Prioritize natural light and ventilation
- Use sustainable materials when possible
- Ensure accessibility and universal design
- Consider energy efficiency and insulation

### Common Questions
- Consult local building codes early in the process
- Budget for 10-20% contingency costs
- Plan for proper drainage and foundation
- Consider the building's lifecycle and maintenance

Please reconnect to the internet for more detailed, personalized architectural assistance!`,
        model: 'offline-mode',
        timestamp: new Date().toISOString(),
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        metadata: { service: 'offline-mode', version: '1.0.0', context: 'architectural-assistant' },
        fallback: true,
        error: 'Offline mode'
      };
    }

    try {
      const response = await fetch(`${this.llmWorkerUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: options.messages,
          model: options.model || '@cf/codellama/codellama-7b-instruct',
          max_tokens: options.max_tokens || 2048,
          temperature: options.temperature || 0.7,
        }),
        signal: AbortSignal.timeout(60000) // 60 second timeout
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI service failed');
      }

      return await response.json();
    } catch (error: any) {
      console.error('LLM Error:', error);
      
      if (error && error.name === 'AbortError') {
        throw new Error('AI response timed out. Please try again.');
      }
      
      // Return fallback response
      return {
        response: `I apologize, but I'm experiencing technical difficulties at the moment. As @Architect, here's some guidance:

## Common Architectural Solutions

### For Residential Projects
- **Foundation**: Consider soil type and local requirements
- **Structure**: Wood framing is common and cost-effective
- **Insulation**: R-13 walls, R-38 ceiling (climate-dependent)
- **Windows**: Double-pane with low-E coating
- **Roofing**: 30-year architectural shingles minimum

### For Commercial Projects
- **ADA Compliance**: Ramps, elevators, accessible restrooms
- **Fire Safety**: Sprinkler systems, proper egress
- **HVAC**: Professional sizing and installation
- **Electrical**: Professional design and installation
- **Plumbing**: Professional design and installation

### Next Steps
1. Check your internet connection
2. Try again in a few moments
3. Contact me with specific questions

I'll be back online shortly to provide more detailed assistance!`,
        model: 'fallback-mode',
        timestamp: new Date().toISOString(),
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        metadata: { service: 'fallback-mode', version: '1.0.0', context: 'architectural-assistant' },
        fallback: true,
        error: 'Service temporarily unavailable'
      };
    }
  }

  // Get available models
  async getModels(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    max_tokens: number;
    recommended_for: string;
  }>> {
    try {
      const response = await fetch(`${this.llmWorkerUrl}/models`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('Models Error:', error);
      return []; // Return empty array on error
    }
  }

  // Get architectural prompts
  async getPrompts(): Promise<Record<string, string>> {
    try {
      const response = await fetch(`${this.llmWorkerUrl}/prompts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prompts');
      }

      const data = await response.json();
      return data.prompts || {};
    } catch (error) {
      console.error('Prompts Error:', error);
      return {}; // Return empty object on error
    }
  }

  // Network status
  getNetworkStatus(): { online: boolean; type: string } {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    return {
      online: this.isOnline,
      type: connection?.effectiveType || 'unknown'
    };
  }

  // Test connection to both services
  async testConnections(): Promise<{ tts: boolean; llm: boolean }> {
    const results = await Promise.allSettled([
      this.checkServiceHealth('tts'),
      this.checkServiceHealth('llm')
    ]);

    return {
      tts: results[0].status === 'fulfilled' && results[0].value === true,
      llm: results[1].status === 'fulfilled' && results[1].value === true
    };
  }
}

// Create singleton instance
const apiService = new APIService();

export default apiService;
