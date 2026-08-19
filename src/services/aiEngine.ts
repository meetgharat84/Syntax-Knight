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
 * Invokes the Server AI Generator API to generate a coding challenge blueprint.
 * Intercepts any missing keys or parse issues with a robust fallback guard.
 */
export async function generateQuestWithGemini(userPrompt: string): Promise<GeneratedQuest> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.quest) {
        return data.quest;
      }
    }
  } catch (err) {
    console.error('[AI_QUEST_GEN_CLIENT_ERROR]', err);
  }

  return {
    ...EMERGENCY_FALLBACK_QUEST,
    title: `🏰 Quest: ${userPrompt.slice(0, 30) || 'Dynamic Sandbox'}`,
    instructions: `Render an element to fulfill the prompt: "${userPrompt || 'Castle Foundation'}".`,
  };
}
