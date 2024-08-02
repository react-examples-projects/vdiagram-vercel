import { createOpenAI } from "@ai-sdk/openai";
import { streamText, generateText } from "ai"; // Vercel AI sdk

import systemPrompt from "@/app/constants/system";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export function GET() {
  return new Response("Hello World");
}

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    console.log({ prompt });

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system: `Extract all the requirements needed to create this diagram. Ensure the diagram is complete and detailed, including all identified requirements. Do not leave out any details and make sure that each requirement is clearly represented in the diagram, keep in mind that the diagram should be brief and short but with the requirements captured. The goal is to obtain a final diagram that accurately and completely reflects all the aspects necessary for its implementation. Send only the plain text of the requirements using a list format with arrows (not markdown or other special formatting)`,
    });

    const result = await streamText({
      model: openai("gpt-4o"),
      prompt: `Given an instruction to create the corresponding diagram, you must send the result in JSON format without explanations, without markdown formatting or filler text. Send the full text, if it is very long, summarize it more and without special formatting by grouping the nodes in a "nodes" property and the edges in other "edges" at the end, it should look like this:
        {
          "nodes" : [],
          "edges" : []
        }
          
      The user asks: ${text}`,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}