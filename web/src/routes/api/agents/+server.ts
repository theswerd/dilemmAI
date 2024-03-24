import { json,  } from '@sveltejs/kit';
import { agents } from '../../+page.server.js';
import { v4 } from 'uuid';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { prompt, emoji, color } = await request.json();
    const newAgent = {
        playerID: "1",
        agentID:  v4(),
        agentEmoji: emoji,  
        agentColor: color,
        inputStrategy: prompt
    };
    agents.push(newAgent)
	return json(newAgent);
}