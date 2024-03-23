import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession, LlamaGrammar} from "node-llama-cpp";

export const callAI = async (messages: string[]): Promise<string> => {

	
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	
	const model = new LlamaModel({
		modelPath: path.join(__dirname,"..","..", "models", "carl-llama-2-13b.Q8_0.gguf"),
		
	});
	const context = new LlamaContext({model, });
	const session = new LlamaChatSession({context});
	
	
	const q1 = "Hi there, how are you? Answer in json.";
	console.log("User: " + q1);
	
	const a1 = await session.prompt(q1, {
		grammar:await LlamaGrammar.getFor("json"),
	});
	console.log("AI: " + a1);
	
	
	// const q2 = "Summerize what you said";
	// console.log("User: " + q2);
	
	// const a2 = await session.prompt(q2);
	// console.log("AI: " + a2);
 
	return a1;
}