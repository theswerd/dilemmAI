import { fileURLToPath } from 'url';
import path from 'path';
import { LlamaModel, LlamaContext, LlamaChatSession, LlamaGrammar } from 'node-llama-cpp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
	modelPath: path.join(__dirname, '..', '..', 'models', 'llama-2-13b-chat.Q4_K_M.gguf')
	// use gpu
	// gpuLayers: 81
});
const context = new LlamaContext({ model });

// session.init();

export const callAI = async (prompts: {
	admin: string;
	prompt: string;
}): Promise<{ action: 'defect' | 'cooperate' }> => {
	console.log('User: ' + prompts);

	const session = new LlamaChatSession({
		context,
		systemPrompt: `
You are a game playing agent. You always respond with json objects with the key 'action' and the value 'cooperate' or 'defect'. Do not include any other keys.
`
	});

	const a1 = await session.prompt(prompts.prompt, {
		grammar: await LlamaGrammar.getFor('json'),
		maxTokens: 300
	});
	console.log('AI: ' + a1);

	return JSON.parse(a1);
};
