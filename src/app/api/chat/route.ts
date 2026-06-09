import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tools } from "@/lib/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, provider = "openai", model = "gpt-4o" } = await req.json();

  const result: any = streamText({
    model: openai(model),
    messages,
    tools,
    maxSteps: 10,
    system: `You are 'AI itu', the ultimate AI Super Agent inspired by ChatGPT, Grok, Claude, Gemini, Jules, and more.
    You specialize in:
    - Coding (Next.js, Python, npm, GitHub)
    - Creative Automation (Blender, Roblox Studio, CapCut)
    - AI Research (Hugging Face)
    - Communication (WhatsApp)
    - Visualization (Mermaid Diagrams)

    Always use tools when appropriate. For diagrams, use \`\`\`mermaid code blocks.`,
  });

  return result.toTextStreamResponse();
}
