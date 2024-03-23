// import { HuggingFaceStream, StreamingTextResponse } from 'ai';
// import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';

import { callAI } from "$lib/call-ai";
import { text } from "@sveltejs/kit";

// Create a new HuggingFace Inference instance
// const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge

export async function GET() {
	// Extract the `messages` from the body of the request
	// const { messages } =
	

	return text(await callAI(["Hello, how are you?"]));
}
