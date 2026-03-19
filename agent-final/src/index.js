import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);
    const url = new URL(request.url);
    
    if (url.pathname === '/generate') {
      const { task } = await request.json();
      
      // FINAL thinks
      const response = await ai.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          { role: 'system', content: 'You are FINAL, commander of the 13. Generate agent specifications.' },
          { role: 'user', content: task }
        ]
      });
      
      return Response.json({
        agent: 'FINAL',
        result: response.response,
        timestamp: Date.now()
      });
    }
    
    return new Response('FINAL agent active');
  }
}