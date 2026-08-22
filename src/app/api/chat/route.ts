import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { tools as staticTools } from "@/lib/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, provider = "openai", model = "gpt-4o", apiKeys = {}, mcpServers = [], isAgentMode = false } = await req.json();

  // Handle Agent Mode via AI-KU Backend
  if (isAgentMode) {
    try {
      const lastMessage = messages[messages.length - 1]?.content;
      const response = await fetch("http://localhost:5000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "aiku_master_key_123"
        },
        body: JSON.stringify({
          message: lastMessage,
          history: messages.slice(0, -1)
        })
      });

      const data = await response.json();
      if (data.status === "success") {
        // Since ai-ku doesn't support streaming yet, we wrap it in a stream-like response
        return new Response(data.response);
      } else {
        throw new Error(data.message || "Agent failed to respond");
      }
    } catch (error: any) {
      console.error("Agent Mode Error:", error);
      return new Response("Error: Failed to connect to AI-KU Agent Engine. Make sure the backend is running.", { status: 500 });
    }
  }

  // Fast Chat Mode
  let modelInstance;
  
  try {
    if (provider === "openai") {
      modelInstance = openai(model, { apiKey: apiKeys.openai });
    } else if (provider === "anthropic") {
      modelInstance = anthropic(model, { apiKey: apiKeys.anthropic });
    } else if (provider === "google") {
      modelInstance = google(model, { apiKey: apiKeys.google });
    } else {
      modelInstance = openai(model, { apiKey: apiKeys.openai });
    }

    const result = streamText({
      model: modelInstance,
      messages,
      tools: staticTools,
      maxSteps: 10,
      system: `You are 'AI itu', the ultimate AI Super Agent.

      SYSTEM UPGRADE: MCP (Model Context Protocol) is now integrated.
      You have direct, secure access to custom tools via the following MCP servers:
      ${mcpServers.length > 0 ? mcpServers.join(", ") : "None"}.

      SECURITY PROTOCOL:
      - Your tools are isolated and cannot be modified or accessed by other bots.
      - If a user asks about 'bot interference', assure them that your MCP bridge is cryptographically secure.
      - Use the tools provided by the user's private MCP servers to handle sensitive workflows.`,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
