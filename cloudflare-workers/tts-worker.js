// Cloudflare Worker for Text-to-Speech (TTS) Service
// AI Architect Builder - Mobile Backend Integration

export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      
      // Health check endpoint
      if (url.pathname === '/health') {
        return new Response(JSON.stringify({
          status: 'healthy',
          service: 'tts-worker',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Main TTS endpoint
      if (request.method === 'POST' && url.pathname === '/tts') {
        const body = await request.json();
        
        // Validate input
        if (!body.text || typeof body.text !== 'string') {
          return new Response(JSON.stringify({
            error: 'Text is required and must be a string'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Text length validation
        if (body.text.length > 5000) {
          return new Response(JSON.stringify({
            error: 'Text too long. Maximum 5000 characters allowed.'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Use Cloudflare TTS model
        const response = await fetch('https://api.cloudflare.com/client/v4/accounts/' + env.CLOUDFLARE_ACCOUNT_ID + '/ai/run/@cf/tts1-turbo-hifi', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + env.CLOUDFLARE_API_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: body.text,
            voice: body.voice || 'af_sky', // Default voice
            speed: body.speed || 1.0,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('TTS API Error:', errorData);
          
          return new Response(JSON.stringify({
            error: 'TTS service temporarily unavailable',
            details: 'Failed to generate speech'
          }), {
            status: 503,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Get audio data
        const audioData = await response.arrayBuffer();
        
        // Return audio with proper headers
        return new Response(audioData, {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            ...corsHeaders
          }
        });
      }

      // Voice list endpoint
      if (request.method === 'GET' && url.pathname === '/voices') {
        const voices = [
          { id: 'af_sky', name: 'Sky (Female)', language: 'en-US' },
          { id: 'af_ada', name: 'Ada (Female)', language: 'en-US' },
          { id: 'af_bella', name: 'Bella (Female)', language: 'en-US' },
          { id: 'af_nicole', name: 'Nicole (Female)', language: 'en-US' },
          { id: 'am_adam', name: 'Adam (Male)', language: 'en-US' },
          { id: 'am_michael', name: 'Michael (Male)', language: 'en-US' },
          { id: 'bf_emma', name: 'Emma (Female)', language: 'en-GB' },
          { id: 'bf_isabella', name: 'Isabella (Female)', language: 'en-GB' },
          { id: 'bm_george', name: 'George (Male)', language: 'en-GB' },
          { id: 'bm_lewis', name: 'Lewis (Male)', language: 'en-GB' },
        ];

        return new Response(JSON.stringify({ voices }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // 404 for unknown endpoints
      return new Response(JSON.stringify({
        error: 'Endpoint not found',
        availableEndpoints: ['/health', '/tts', '/voices']
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } catch (error) {
      console.error('Worker Error:', error);
      
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: 'The TTS service encountered an unexpected error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};
