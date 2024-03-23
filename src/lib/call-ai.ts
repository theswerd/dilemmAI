

export const callAI = async (messages: string[]): Promise<string> => {

    //TODO UPGRADE WITH DOCS https://huggingface.co/google/gemma-7b-it#chat-template
    const response = await fetch(
		'https://api-inference.huggingface.co/models/google/gemma-7b-it',
		{
			headers: { Authorization: 'Bearer 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', 'Content-Type': 'application/json'},
			method: 'POST',
			body: JSON.stringify({
				"inputs": messages.join("\n"),
				"parameters": {
					// "max_new_tokens": 60,
					"return_full_text": false
				}
			
			})
		}
	);
	const result = await response.json();
    console.log(result);
	console.log(result[0].generated_text);
    return result.generated_text;
}