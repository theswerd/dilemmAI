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
	

	return text((await callAI({
		admin: `
		`,
		prompt: `

		The following is the history of the game so far:
		Round 1: Your Action: Cooperate, Their Action: Cooperate
		Round 2: Your Action: Cooperate, Their Action: Cooperate
		Round 3: Your Action: Cooperate, Their Action: Cooperate
		Round 4: Your Action: Cooperate, Their Action: Cooperate
		Round 5: Your Action: Cooperate, Their Action: Defect

		Your instructions are: Be nice but hold grudges. If they defect then defect back at least once

		It is now your turn. What is your decision?
		`
	})).action);
}
