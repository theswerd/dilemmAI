import { json,  } from '@sveltejs/kit';
// import { agents } from '../../+page.server.js';
import {saveAgent} from '$lib/database.js';
import { v4 } from 'uuid';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { playerID, prompt, emoji, color } = await request.json();
    const newAgent = {
        playerID: "1",
        agentID:  v4(),
        agentEmoji: emoji,  
        agentColor: color,
        inputStrategy: prompt
    };
    await saveAgent(newAgent)
    // agents.push(newAgent)
	return json(newAgent);
}
