import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession, LlamaGrammar,} from "node-llama-cpp";

	
const __dirname = path.dirname(fileURLToPath(import.meta.url));
	
const model = new LlamaModel({
	modelPath: path.join(__dirname,"..","..", "models", "carl-llama-2-13b.Q8_0.gguf"),
	
});



export const callAI = async (prompts: {
	admin: string, 
	prompt: string,
}): Promise<string> => {
	const context = new LlamaContext({model });

	const session = new LlamaChatSession({context, systemPrompt: `
	You are a game playing agent. You always respond with json objects with the key 'action' and the value 'cooperate' or 'defect'. Do not include any other keys.
	`});
	// session.init();

	console.log("User: " + prompts);
	
	const a1 = await session.prompt(prompts.prompt, {
		grammar:await LlamaGrammar.getFor("json"),
		maxTokens: 300,
	});
	console.log("AI: " + a1);
	
	return a1;
}