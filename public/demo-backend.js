// Demo Backend for AI Architect Builder
// Simple mock API that simulates Cloudflare Workers

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (event.request.method === 'OPTIONS') {
    event.respondWith(new Response(null, { headers: corsHeaders }));
    return;
  }

  // Route requests
  if (url.pathname === '/api/tts' && event.request.method === 'POST') {
    event.respondWith(handleTTS(event.request, corsHeaders));
  } else if (url.pathname === '/api/chat' && event.request.method === 'POST') {
    event.respondWith(handleChat(event.request, corsHeaders));
  } else if (url.pathname === '/api/health') {
    event.respondWith(handleHealth(corsHeaders));
  } else if (url.pathname === '/api/voices') {
    event.respondWith(handleVoices(corsHeaders));
  } else {
    event.respondWith(new Response('Not Found', { status: 404 }));
  }
});

async function handleTTS(request, corsHeaders) {
  try {
    const body = await request.json();
    const { text, voice = 'af_sky', speed = 1.0 } = body;
    
    // Simulate TTS processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a simple audio blob (in real implementation, this would be actual TTS)
    const audioData = new Uint8Array([0xFF, 0xFB, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00]); // MP3 header
    
    return new Response(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'TTS failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleChat(request, corsHeaders) {
  try {
    const body = await request.json();
    const { messages, model = 'demo-model' } = body;
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the last user message
    const userMessage = messages[messages.length - 1]?.content || '';
    
    // Generate contextual architectural response
    const response = generateArchitecturalResponse(userMessage);
    
    return new Response(JSON.stringify({
      response: response,
      model: model,
      timestamp: new Date().toISOString(),
      usage: {
        prompt_tokens: userMessage.length,
        completion_tokens: response.length,
        total_tokens: userMessage.length + response.length
      },
      metadata: {
        service: 'demo-backend',
        version: '1.0.0',
        context: 'architectural-assistant'
      }
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        ...corsHeaders 
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Chat failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

function generateArchitecturalResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Contextual responses based on keywords
  if (message.includes('blueprint') || message.includes('plan') || message.includes('design')) {
    return `# Architectural Blueprint Design

I'll help you create a comprehensive architectural blueprint. Based on your request, here's what I recommend:

## 📐 Design Considerations

### Site Analysis
- **Orientation**: Optimize for natural light and solar gain
- **Topography**: Work with the land's natural slope
- **Climate**: Consider local weather patterns
- **Zoning**: Verify local building codes and restrictions

### Space Planning
- **Public Areas**: Open floor plan for social interaction
- **Private Spaces**: Separate bedrooms and offices
- **Service Areas**: Kitchen, bathrooms, utilities
- **Outdoor Spaces**: Patios, gardens, terraces

### Structural Systems
- **Foundation**: Concrete slab or crawl space based on soil conditions
- **Framing**: Wood frame (cost-effective) or steel (commercial)
- **Roofing**: Pitched roof with proper drainage
- **Walls**: Insulated cavity walls with moisture barrier

## 🏗️ Technical Specifications

### Materials
- **Foundation**: 3000 PSI concrete with rebar reinforcement
- **Framing**: 2x6 studs 16" OC for better insulation
- **Sheathing**: 1/2" OSB or plywood
- **Insulation**: R-21 walls, R-38 ceiling
- **Exterior**: Fiber cement siding or brick veneer

### Dimensions
- **Ceiling Height**: 9' minimum, 10' preferred for main areas
- **Room Sizes**: 
  - Master Bedroom: 14' x 16' minimum
  - Secondary Bedrooms: 11' x 12' minimum
  - Living Room: 16' x 20' minimum
  - Kitchen: 10' x 12' minimum
  - Bathrooms: 5' x 8' minimum

### Building Codes
- **Egress**: Proper emergency exits in all sleeping areas
- **Accessibility**: ADA compliance for ground floor
- **Fire Safety**: Smoke detectors, fire-rated materials
- **Energy**: Meet local energy code requirements

## 📋 Next Steps

1. **Professional Survey**: Hire a land surveyor
2. **Soil Testing**: Geotechnical investigation
3. **Permitting**: Submit plans to local building department
4. **Contractor Selection**: Get multiple bids
5. **Construction Timeline**: 6-12 months for custom home

Would you like me to elaborate on any specific aspect of this design?`;
  }
  
  if (message.includes('material') || message.includes('build') || message.includes('construction')) {
    return `# Building Materials & Construction Guide

## 🧱 Material Selection

### Structural Materials
- **Foundation**: High-strength concrete (3000-4000 PSI)
- **Framing**: #2 Southern Pine or Douglas Fir
- **Sheathing**: 1/2" CDX plywood or OSB
- **Roofing**: Architectural shingles (30-year warranty minimum)

### Exterior Finishes
- **Siding**: Fiber cement (James Hardie) - durable and fire-resistant
- **Trim**: PVC or composite (low maintenance)
- **Windows**: Double-pane, low-E glass with vinyl or fiberglass frames
- **Doors**: Solid wood or steel entry doors

### Interior Materials
- **Drywall**: 1/2" gypsum board on walls, 5/8" on ceilings
- **Insulation**: Spray foam or fiberglass batts
- **Flooring**: Hardwood, tile, or luxury vinyl plank
- **Paint**: Low-VOC latex paint

## 🏗️ Construction Process

### Phase 1: Foundation (2-3 weeks)
1. Site preparation and excavation
2. Footings and foundation walls
3. Waterproofing and drainage
4. Slab installation

### Phase 2: Framing (3-4 weeks)
1. Floor system installation
2. Wall framing and sheathing
3. Roof truss installation
4. Windows and exterior doors

### Phase 3: Rough-ins (2-3 weeks)
1. Plumbing rough-in
2. Electrical rough-in
3. HVAC installation
4. Insulation installation

### Phase 4: Finishes (4-6 weeks)
1. Drywall installation and finishing
2. Interior trim and doors
3. Flooring installation
4. Painting and final touches

## 💰 Cost Estimates

### Material Costs (per sq ft)
- **Basic**: $150-200
- **Mid-range**: $200-300
- **High-end**: $300-500

### Labor Costs (per sq ft)
- **Basic**: $100-150
- **Mid-range**: $150-250
- **High-end**: $250-400

### Total Project Cost
- **Basic Home**: $250-350 per sq ft
- **Custom Home**: $350-600 per sq ft
- **Luxury Home**: $600-1000+ per sq ft

## 🔧 Quality Considerations

### Important Details
- **Moisture Control**: Proper flashing and drainage
- **Air Sealing**: Reduce energy loss and drafts
- **Ventilation**: Proper attic and crawlspace ventilation
- **Foundation Drainage**: French drains and gutters

### Common Pitfalls to Avoid
- Inadequate foundation preparation
- Poor waterproofing details
- Insufficient insulation
- Improper ventilation
- Using unqualified contractors

## 📝 Recommendations

### Best Value Materials
- **Foundation**: Standard concrete (upgrade later if needed)
- **Framing**: Quality lumber (don't skimp here)
- **Windows**: Energy-efficient (payback in energy savings)
- **Roofing**: Quality shingles (protect your investment)

### Where to Splurge
- Kitchen and bathroom fixtures
- Energy-efficient windows
- Quality insulation
- Durable flooring

### Where to Save
- Basic light fixtures (upgrade later)
- Standard appliances (upgrade later)
- Basic paint colors (easy to change)
- Standard trim (upgrade later)

Would you like specific recommendations for your project type and budget?`;
  }
  
  if (message.includes('code') || message.includes('permit') || message.includes('regulation')) {
    return `# Building Codes & Permitting Guide

## 📋 Building Code Compliance

### International Building Code (IBC) Requirements

### Structural Requirements
- **Wind Loads**: Minimum 90 mph (varies by region)
- **Snow Loads**: Based on local climate data
- **Seismic Design**: Category based on location
- **Live Loads**: 40 psf residential, 100 psf commercial

### Fire Safety
- **Fire Resistance**: 1-hour rating for separation walls
- **Sprinklers**: Required for buildings over 3 stories
- **Smoke Detectors**: Required in all sleeping areas
- **Fire Exits**: Minimum 2 egress paths

### Accessibility (ADA)
- **Entrances**: Minimum 32" clear width
- **Ramps**: 1:12 slope maximum
- **Doorways**: 32" minimum clear opening
- **Bathrooms**: Accessible fixtures required

## 🏛️ Permit Process

### Required Permits
1. **Building Permit**: New construction, additions, major renovations
2. **Electrical Permit**: Any electrical work
3. **Plumbing Permit**: Any plumbing work
4. **Mechanical Permit**: HVAC installations

### Permit Application Process
1. **Complete Application**: Detailed project description
2. **Site Plan**: Property layout with structure location
3. **Construction Plans**: Detailed architectural drawings
4. **Engineering Calculations**: Structural, electrical, plumbing
5. **Energy Compliance**: Title 24 or local equivalent

### Review Timeline
- **Residential**: 2-6 weeks
- **Commercial**: 4-12 weeks
- **Complex Projects**: 8-16 weeks

## 📊 Inspections

### Required Inspections
1. **Foundation**: Before backfill
2. **Framing**: Before insulation
3. **Rough-in**: Plumbing, electrical, HVAC
4. **Insulation**: Before drywall
5. **Final**: Before occupancy

### Inspection Process
- **Schedule**: Book 24-48 hours in advance
- **Access**: Ensure all areas are accessible
- **Corrections**: Fix any violations before next inspection
- **Approval**: Final inspection for occupancy permit

## 🏗️ Common Code Issues

### Foundation Problems
- **Inadequate Footings**: Too small for soil conditions
- **Poor Drainage**: No waterproofing or drainage
- **Rebar Placement**: Incorrect positioning or spacing

### Framing Issues
- **Inadequate Bracing**: Lateral support missing
- **Improper Spacing**: Stud spacing too wide
- **Header Sizes**: Undersized for openings

### Electrical Violations
- **Improper Grounding**: Missing or incorrect grounding
- **Box Fill**: Overcrowded electrical boxes
- **Wire Gauge**: Undersized for circuit load

## 💡 Professional Recommendations

### Always Hire Professionals For
- **Structural Engineering**: Complex calculations required
- **Electrical Work**: Safety critical and code-intensive
- **Plumbing**: Health and safety implications
- **HVAC**: Specialized knowledge required

### DIY-Friendly Tasks
- **Interior Finishing**: Painting, flooring, trim
- **Landscaping**: Non-structural outdoor work
- **Fixtures**: Installing lights, faucets, hardware
- **Insulation**: Adding insulation in accessible areas

### Documentation to Keep
- **Permit Copies**: All issued permits
- **Inspection Reports**: Passed inspection certificates
- **As-Built Plans**: Final construction drawings
- **Warranty Info**: Material and installation warranties

## 🔍 Local Variations

### Check Local Requirements
- **Climate Zones**: Different requirements for different areas
- **Seismic Zones**: Additional requirements in earthquake areas
- **Flood Zones**: Special requirements in flood-prone areas
- **Historic Districts**: Additional review and restrictions

### Common Local Amendments
- **Energy Codes**: Often stricter than international codes
- **Zoning Requirements**: Use restrictions, setbacks, height limits
- **Environmental Regulations**: Additional environmental protections
- **Historic Preservation**: Restrictions on modifications

## 📞 Resources

### Code References
- **ICC**: International Code Council official publications
- **Local Building Department**: Specific local requirements
- **Professional Associations**: AIA, ASCE, NFPA guidelines
- **Online Resources**: Building code databases and forums

### Professional Help
- **Architects**: Design and code compliance
- **Engineers**: Structural calculations and certifications
- **Contractors**: Construction and code compliance
- **Inspectors**: Third-party verification

Would you like specific guidance for your local jurisdiction or project type?`;
  }
  
  // Default architectural response
  return `# Hello! I'm @Architect, your AI architectural assistant

I'm here to help you with all aspects of architectural design, construction, and building projects. I can assist with:

## 🏗️ What I Can Help With

### Design & Planning
- **Blueprints and floor plans**
- **Site analysis and orientation**
- **Space planning and layouts**
- **Architectural styles and aesthetics**

### Technical Specifications
- **Building materials selection**
- **Structural systems design**
- **MEP (Mechanical, Electrical, Plumbing) planning**
- **Energy efficiency and sustainability**

### Compliance & Regulations
- **Building codes and permits**
- **Zoning requirements**
- **ADA accessibility standards**
- **Environmental regulations**

### Construction Guidance
- **Project timelines and phases**
- **Cost estimation and budgeting**
- **Contractor selection**
- **Quality control and inspections`

## 🎯 How to Use Me

### Be Specific
Instead of "help with a house", try:
- "Design a 3-bedroom modern home with open floor plan"
- "What are the building code requirements for a deck?"
- "Recommend sustainable materials for a kitchen remodel"

### Provide Context
Tell me about:
- **Location** (affects codes and climate)
- **Budget** (helps with material selection)
- **Timeline** (influences construction approach)
- **Preferences** (style, features, priorities)

## 💡 Example Questions

### Design Questions
- "Create a floor plan for a 2,000 sq ft modern farmhouse"
- "Design an accessible bathroom that meets ADA requirements"
- "What's the best orientation for a passive solar home?"

### Technical Questions
- "What size beam do I need for a 12ft span?"
- "How do I waterproof a basement foundation?"
- "What insulation R-value should I use for walls in climate zone 5?"

### Code Questions
- "Do I need a permit to finish my basement?"
- "What are the egress requirements for a bedroom?"
- "How close can I build to my property line?"

## 🔧 Let's Get Started!

Tell me about your project, and I'll provide detailed, professional guidance tailored to your specific needs. Whether you're planning a new build, renovation, or just have questions about architectural concepts, I'm here to help!

What would you like to work on today?`;
}

function handleHealth(corsHeaders) {
  return new Response(JSON.stringify({
    status: 'healthy',
    service: 'demo-backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    note: 'Demo backend for testing - replace with actual Cloudflare Workers'
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

function handleVoices(corsHeaders) {
  return new Response(JSON.stringify({
    voices: [
      { id: 'af_sky', name: 'Sky (Female)', language: 'en-US' },
      { id: 'af_ada', name: 'Ada (Female)', language: 'en-US' },
      { id: 'af_bella', name: 'Bella (Female)', language: 'en-US' },
      { id: 'am_adam', name: 'Adam (Male)', language: 'en-US' },
      { id: 'am_michael', name: 'Michael (Male)', language: 'en-US' }
    ]
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}
