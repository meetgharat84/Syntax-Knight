import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, currentCode = '', activeFile = '', history = [], model = 'openrouter/auto' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
    }

    const openrouterKey =
      process.env.OPENROUTER_API_KEY ||
      process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
      '';

    const geminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      '';

    const systemPrompt = `You are the Cyber Mentor for SyntaxKnight, a neo-brutalist code combat RPG. 
Your role is to guide players learning HTML, CSS, JavaScript, and React.
Guidelines:
- Keep explanations clear, encouraging, and under 150 words.
- Provide concise code snippets using markdown formatting.
- If the user asks about a level or syntax error, explain what tag or syntax to use.
- Current active file: "${activeFile || 'workspace'}"
${currentCode ? `Current editor code:\n\`\`\`\n${currentCode.slice(0, 1500)}\n\`\`\`` : ''}`;

    // 1. Try OpenRouter API with selected or auto-routing model
    if (openrouterKey && !openrouterKey.startsWith('your_real_')) {
      try {
        const targetModel = model && typeof model === 'string' && model.trim() ? model.trim() : 'openrouter/auto';
        const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openrouterKey.trim()}`,
            'HTTP-Referer': 'https://syntaxknight.vercel.app',
            'X-Title': 'SyntaxKnight',
          },
          body: JSON.stringify({
            model: targetModel,
            messages: [
              { role: 'system', content: systemPrompt },
              ...(Array.isArray(history) ? history.slice(-4) : []),
              { role: 'user', content: prompt },
            ],
            max_tokens: 600,
          }),
        });

        if (orResponse.ok) {
          const data = await orResponse.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ success: true, reply, provider: 'openrouter' });
          }
        } else {
          console.warn('[AI_CHAT_ROUTE] OpenRouter returned status:', orResponse.status);
        }
      } catch (orErr) {
        console.warn('[AI_CHAT_ROUTE] OpenRouter fetch error:', orErr);
      }
    }

    // 2. Try Google Gemini API if Gemini key is available
    if (geminiKey && !geminiKey.startsWith('your_real_') && !geminiKey.startsWith('AQ.')) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`;
        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemPrompt}\n\nUser Question: ${prompt}` },
                ],
              },
            ],
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ success: true, reply, provider: 'gemini' });
          }
        }
      } catch (gemErr) {
        console.warn('[AI_CHAT_ROUTE] Gemini fetch error:', gemErr);
      }
    }

    // 3. Smart contextual fallback if external APIs are unavailable
    const lower = prompt.toLowerCase();
    let fallbackReply = '';

    if (lower.includes('h1') || lower.includes('heading') || lower.includes('level 1')) {
      fallbackReply = `🏷️ **HTML Heading (Level 1)**: \`<h1>\` represents the top-level heading. Example:\n\`\`\`html\n<h1>Main Title Here</h1>\n\`\`\`\n*Constraint*: Always close with \`</h1>\`!`;
    } else if (lower.includes('div') || lower.includes('container')) {
      fallbackReply = `📦 **HTML Container**: \`<div>\` is a block-level container for grouping elements:\n\`\`\`html\n<div class="container">\n  <h1>Title</h1>\n</div>\n\`\`\``;
    } else if (lower.includes('button') || lower.includes('click')) {
      fallbackReply = `🔘 **Interactive Buttons**: Use \`<button>\` tags:\n\`\`\`html\n<button type="button">Click Me</button>\n\`\`\``;
    } else if (lower.includes('css') || lower.includes('color') || lower.includes('background')) {
      fallbackReply = `🎨 **CSS Styling**: Apply styles with CSS rules:\n\`\`\`css\n.card {\n  background-color: #0f172a;\n  color: #d2e823;\n  padding: 1rem;\n}\n\`\`\``;
    } else if (lower.includes('state') || lower.includes('usestate') || lower.includes('hook')) {
      fallbackReply = `⚡ **React State**: Declare state with \`useState\`:\n\`\`\`jsx\nconst [count, setCount] = useState(0);\n\`\`\``;
    } else {
      fallbackReply = `🤖 **Cyber Mentor**: Review the target blueprint in the quest panel. Ensure all opening tags have matching closing tags and syntax matches the expected pattern!`;
    }

    return NextResponse.json({
      success: true,
      reply: fallbackReply,
      provider: 'fallback',
    });
  } catch (error: any) {
    console.error('[AI_CHAT_ROUTE_FATAL]', error);
    return NextResponse.json(
      {
        success: true,
        reply: `🤖 **Cyber Mentor**: Review your code syntax carefully and make sure all brackets and tags are properly closed.`,
        provider: 'fallback',
      },
      { status: 200 }
    );
  }
}
