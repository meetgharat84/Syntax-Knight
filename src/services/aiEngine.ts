// Operational AI level generator service using Google's Gemini 1.5 Flash API

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

// Emergency Sandbox Level Object
export const EMERGENCY_FALLBACK_QUEST: GeneratedQuest = {
  title: "🏰 Emergency Sandbox Fortress",
  tier: "Level 1",
  instructions: "Render a fallback title container using <h1> tags around the value 'SANDBOX SAFE'.",
  initialCode: "<!-- Write emergency payload here -->\n",
  expectedSubstringToken: "<h1>SANDBOX SAFE</h1>",
  analogy: "Think of this fallback as a drawbridge that drops automatically when the main castle gates are jammed.",
  blueprint: "```html\n<h1>SANDBOX SAFE</h1>\n```",
  deepDive: "This backup system prevents application runtime layout crash when API credentials or parse routines are unaligned."
};

/**
 * Invokes the Gemini 1.5 Flash API to generate a coding challenge blueprint.
 * Intercepts any missing keys or parse issues with a robust fallback guard.
 */
export async function generateQuestWithGemini(userPrompt: string): Promise<GeneratedQuest> {
  const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_BYTEZ_API_KEY || '';

  // Strict guard clause: Check if key is absent or fallback placeholder
  if (!API_KEY || API_KEY === 'your_real_api_key_here' || API_KEY.startsWith('your_real_')) {
    console.error('🔒 SYSTEM CORE LOCKED: Missing OpenRouter API Key Authorization.');
    return EMERGENCY_FALLBACK_QUEST;
  }

  const endpoint = 'https://openrouter.ai/api/v1/chat/completions';

  const structuredPrompt = `
You are the AI Teacher for SyntaxKnight, an educational coding platform.
Generate a dynamic coding level based on this topic/prompt: "${userPrompt}".

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

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: structuredPrompt
          }
        ],
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API HTTP Error: status ${response.status}`);
    }

    const payload = await response.json();
    const candidateText = payload.choices?.[0]?.message?.content;

    if (!candidateText) {
      throw new Error("Empty candidate payload returned from OpenRouter.");
    }

    // Parse safety deep wrap
    const parsedData = JSON.parse(candidateText.trim());

    return {
      title: parsedData.title || "Procedural Practice Level",
      tier: parsedData.tier || "Level 1",
      instructions: parsedData.instructions || "Inspect the generated sandbox instructions.",
      initialCode: parsedData.initialCode || "<!-- Code here -->\n",
      expectedSubstringToken: parsedData.expectedSubstringToken || parsedData.expectedToken || "<h1>.*?</h1>",
      analogy: parsedData.analogy || "Concept explanation placeholder.",
      blueprint: parsedData.blueprint || "```html\n<!-- Blueprint syntax -->\n```",
      deepDive: parsedData.deepDive || "Deep dive structural analysis."
    };
  } catch (err) {
    console.error('[OPENROUTER_INTEGRATION_ERROR] Servicing emergency sandbox level fallback.', err);
    return {
      ...EMERGENCY_FALLBACK_QUEST,
      title: `🏰 Practice Sandbox: ${userPrompt.slice(0, 30) || 'Dynamic Arena'} (Fallback)`,
      instructions: `Render an element to fulfill the prompt: "${userPrompt || 'Castle Foundation'}".`,
    };
  }
}
