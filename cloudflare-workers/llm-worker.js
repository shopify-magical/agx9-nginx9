// Cloudflare Worker for Large Language Model (LLM) Service
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
          service: 'llm-worker',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          models: ['@cf/codellama/codellama-7b-instruct', '@cf/codellama/codellama-13b-instruct']
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Main LLM chat endpoint
      if (request.method === 'POST' && url.pathname === '/chat') {
        const body = await request.json();
        
        // Validate input
        if (!body.messages || !Array.isArray(body.messages)) {
          return new Response(JSON.stringify({
            error: 'Messages array is required'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Message validation
        if (body.messages.length === 0 || body.messages.length > 10) {
          return new Response(JSON.stringify({
            error: 'Messages array must contain 1-10 messages'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Validate message structure
        for (const msg of body.messages) {
          if (!msg.role || !msg.content) {
            return new Response(JSON.stringify({
              error: 'Each message must have role and content fields'
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
          }
          
          if (!['system', 'user', 'assistant'].includes(msg.role)) {
            return new Response(JSON.stringify({
              error: 'Message role must be system, user, or assistant'
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
          }
        }

        // Get model preference
        const model = body.model || '@cf/codellama/codellama-7b-instruct';
        
        // Enhanced system prompt for architectural context
        const enhancedMessages = body.messages.map((msg, index) => {
          if (index === 0 && msg.role === 'system') {
            return {
              ...msg,
              content: `${msg.content}

You are @Architect, an expert AI architectural assistant with deep knowledge of:
- Building codes and regulations (International Building Code, ADA, local requirements)
- Structural engineering principles and load calculations
- Sustainable design and green building practices
- Material science and construction techniques
- Architectural history and design theory
- Project management and construction timelines
- Cost estimation and budgeting
- 3D modeling and visualization
- Building information modeling (BIM)

Guidelines:
- Provide detailed, technical responses
- Include specific measurements and specifications when relevant
- Reference building codes and standards when applicable
- Consider sustainability and accessibility in all recommendations
- Use markdown formatting with headers, lists, and code blocks
- Ask clarifying questions if requirements are unclear
- Provide step-by-step guidance for complex processes
- Include safety considerations and best practices

Focus on practical, actionable advice that can be implemented in real-world architectural projects.`
            };
          }
          return msg;
        });

        // Call Cloudflare LLM API
        const response = await fetch('https://api.cloudflare.com/client/v4/accounts/' + env.CLOUDFLARE_ACCOUNT_ID + '/ai/run/' + model, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + env.CLOUDFLARE_API_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: enhancedMessages,
            max_tokens: body.max_tokens || 2048,
            temperature: body.temperature || 0.7,
            stream: false,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('LLM API Error:', errorData);
          
          // Fallback response for API failures
          return new Response(JSON.stringify({
            response: `I apologize, but I'm experiencing technical difficulties at the moment. As @Architect, I can still provide some basic guidance:

## Common Architectural Considerations

### Design Process
1. **Site Analysis**: Evaluate location, zoning, climate, and constraints
2. **Programming**: Define space requirements and user needs
3. **Concept Development**: Create initial design concepts
4. **Schematic Design**: Develop floor plans and elevations
5. **Design Development**: Refine details and specifications
6. **Construction Documents**: Create detailed drawings and specs

### Key Areas to Consider
- **Structural Systems**: Choose appropriate framing and foundation
- **Building Envelope**: Insulation, waterproofing, and exterior finishes
- **MEP Systems**: Mechanical, electrical, and plumbing design
- **Accessibility**: ADA compliance and universal design
- **Sustainability**: Energy efficiency and environmental impact

Please try again in a few moments, and I'll be able to provide more detailed assistance with your specific architectural questions.`,
            fallback: true,
            error: 'LLM service temporarily unavailable'
          }), {
            status: 200, // Return 200 with fallback instead of error
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        const result = await response.json();
        
        // Validate response structure
        if (!result.response) {
          console.error('Invalid LLM response:', result);
          return new Response(JSON.stringify({
            error: 'Invalid response from AI model'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Add metadata to response
        const enhancedResponse = {
          response: result.response,
          model: model,
          timestamp: new Date().toISOString(),
          usage: {
            prompt_tokens: result.usage?.prompt_tokens || 0,
            completion_tokens: result.usage?.completion_tokens || 0,
            total_tokens: result.usage?.total_tokens || 0
          },
          metadata: {
            service: 'llm-worker',
            version: '1.0.0',
            context: 'architectural-assistant'
          }
        };

        return new Response(JSON.stringify(enhancedResponse), {
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache', // Don't cache AI responses
            ...corsHeaders 
          }
        });
      }

      // Model info endpoint
      if (request.method === 'GET' && url.pathname === '/models') {
        const models = [
          {
            id: '@cf/codellama/codellama-7b-instruct',
            name: 'CodeLlama 7B Instruct',
            description: 'Fast and efficient model for general architectural assistance',
            max_tokens: 2048,
            recommended_for: 'Quick responses, general guidance'
          },
          {
            id: '@cf/codellama/codellama-13b-instruct',
            name: 'CodeLlama 13B Instruct',
            description: 'More detailed model for complex architectural problems',
            max_tokens: 4096,
            recommended_for: 'Detailed analysis, complex projects'
          }
        ];

        return new Response(JSON.stringify({ models }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // Architecture-specific prompts endpoint
      if (request.method === 'GET' && url.pathname === '/prompts') {
        const prompts = {
          blueprint: "Create a detailed architectural blueprint for a modern sustainable home with 3 bedrooms, 2 bathrooms, and an open-plan living area. Include structural considerations, material specifications, and building code compliance.",
          structure: "Analyze the structural requirements for a 2-story commercial building with retail space on the ground floor and offices above. Consider load-bearing walls, foundation design, and seismic requirements.",
          materials: "Recommend sustainable and eco-friendly building materials for a residential construction project in a temperate climate. Include cost estimates, durability ratings, and environmental impact assessments.",
          codes: "Explain the building code requirements and permit process for constructing a new single-family home. Include zoning considerations, inspection requirements, and common compliance issues.",
          renovation: "Provide guidance for renovating a historic residential property while preserving architectural character and meeting modern building codes.",
          landscape: "Design a sustainable landscape plan that complements the architectural style and considers local climate, native plants, and water conservation.",
          accessibility: "Ensure the building design meets ADA accessibility requirements and universal design principles for inclusive access.",
          energy: "Optimize the building design for energy efficiency including passive solar design, insulation strategies, and renewable energy integration."
        };

        return new Response(JSON.stringify({ prompts }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      // 404 for unknown endpoints
      return new Response(JSON.stringify({
        error: 'Endpoint not found',
        availableEndpoints: ['/health', '/chat', '/models', '/prompts']
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });

    } catch (error) {
      console.error('Worker Error:', error);
      
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: 'The LLM service encountered an unexpected error',
        fallback: 'I apologize, but I\'m currently experiencing technical difficulties. Please try again in a few moments.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};
