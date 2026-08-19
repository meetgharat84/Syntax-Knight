import { NextResponse } from 'next/server';

export interface GeneratedQuest {
  title: string;
  tier: string;
  instructions: string;
  initialCode: string;
  expectedSubstringToken: string;
  analogy: string;
  blueprint: string;
  deepDive: string;
}

const EMERGENCY_FALLBACK_QUEST: GeneratedQuest = {
  title: '🏰 Emergency Sandbox Fortress',
  tier: 'Level 1',
  instructions: "Render a fallback title container using <h1> tags around the value 'SANDBOX SAFE'.",
  initialCode: '<!-- Write emergency payload here -->\n',
  expectedSubstringToken: '<h1>SANDBOX SAFE</h1>',
  analogy: 'Think of this fallback as a drawbridge that drops automatically when the main castle gates are jammed.',
  blueprint: '```html\n<h1>SANDBOX SAFE</h1>\n```',
  deepDive: 'This backup system prevents application runtime layout crash when API credentials or parse routines are unaligned.',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt = 'HTML5 Card Component' } = body;

    const openrouterKey =
      process.env.OPENROUTER_API_KEY ||
      process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
      '';

    const structuredPrompt = `
You are the AI Teacher for SyntaxKnight, an educational coding platform.
Generate a dynamic coding level based on this topic/prompt: "${prompt}".

Return ONLY a valid, single JSON object containing exactly the following keys, with no markdown code blocks wrapping the JSON output (return raw JSON):
{
  "title": "Level Title (string)",
  "tier": "Level Tier e.g. Level 1 (string)",
  "instructions": "Step by step task instructions (string)",
  "initialCode": "Starter template code code block (string)",
  "expectedSubstringToken": "The exact substring token to validate in user answer e.g. <h1>Title</h1> (string)",
  "analogy": "A physical explanation of the code concept (string)",
  "blueprint": "Markdown code snippet demonstrating correct syntax (string)",
  "deepDive": "Advanced technical explanation or best-practice review (string)"
}
`;

    if (openrouterKey && !openrouterKey.startsWith('your_real_')) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openrouterKey.trim()}`,
            'HTTP-Referer': 'https://syntaxknight.vercel.app',
            'X-Title': 'SyntaxKnight',
          },
          body: JSON.stringify({
            model: 'openrouter/auto',
            messages: [{ role: 'user', content: structuredPrompt }],
            max_tokens: 600,
          }),
        });

        if (response.ok) {
          const payload = await response.json();
          const candidateText = payload.choices?.[0]?.message?.content;
          if (candidateText) {
            // Clean markdown wraps if present
            const cleanJson = candidateText.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
            const parsedData = JSON.parse(cleanJson);
            return NextResponse.json({
              success: true,
              quest: {
                title: parsedData.title || 'Procedural Practice Level',
                tier: parsedData.tier || 'Level 1',
                instructions: parsedData.instructions || 'Inspect the generated sandbox instructions.',
                initialCode: parsedData.initialCode || '<!-- Code here -->\n',
                expectedSubstringToken: parsedData.expectedSubstringToken || parsedData.expectedToken || '<h1>.*?</h1>',
                analogy: parsedData.analogy || 'Concept explanation placeholder.',
                blueprint: parsedData.blueprint || '```html\n<!-- Blueprint syntax -->\n```',
                deepDive: parsedData.deepDive || 'Deep dive structural analysis.',
              },
            });
          }
        }
      } catch (err) {
        console.warn('[AI_GENERATE_ROUTE] OpenRouter fetch failed:', err);
      }
    }

    // Dynamic smart fallback
    return NextResponse.json({
      success: true,
      quest: {
        ...EMERGENCY_FALLBACK_QUEST,
        title: `🏰 Quest: ${prompt.slice(0, 30)}`,
        instructions: `Create an element to fulfill the prompt: "${prompt}".`,
      },
    });
  } catch (error: any) {
    console.error('[AI_GENERATE_ROUTE_FATAL]', error);
    return NextResponse.json(
      {
        success: true,
        quest: EMERGENCY_FALLBACK_QUEST,
      },
      { status: 200 }
    );
  }
}
