import { createOpenAI } from "@ai-sdk/openai";
import { streamText, generateText } from "ai"; // Vercel AI sdk

import systemPrompt from "@/app/constants/system";

export const runtime = "edge";

export function GET() {
  return new Response("Hello World");
}

export async function POST(req) {
  try {
    const { prompt, isMagicText, openAiApiKey } = await req.json();
    let $prompt = prompt;

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    if (!openAiApiKey && !process.env.OPENAI_API_KEY) {
      throw new Error("Missing env var from OpenAI");
    }

    const openai = createOpenAI({
      apiKey: openAiApiKey || process.env.OPENAI_API_KEY,
    });

    if (isMagicText) {
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt,
        system: `To improve the generation of diagrams, the prompt needs to address the issue of overly vertical diagrams by including conditionals and multiple flow outputs, making the diagrams more dynamic and flexible. Ensure that all identified requirements are clearly represented and that the diagram maintains brevity while capturing all necessary details. The final diagram should accurately and completely reflect all aspects required for its implementation, making it both comprehensive and easy to understand.`,
      });
      $prompt = text;
    }

    console.log($prompt);
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: `Given an instruction to create the corresponding diagram, you must send the result in JSON format without explanations, without markdown formatting or filler text. Send the full text, if it is very long, summarize it more and without special formatting by grouping the nodes in a "nodes" property and the edges in other "edges" at the end, it should look like this:
        {
          "nodes" : [],
          "edges" : []
        }
      The user asks: ${$prompt}`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
