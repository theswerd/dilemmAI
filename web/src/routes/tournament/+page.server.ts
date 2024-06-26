import { loadAgentByID } from '$lib/database.js';
import { redirect } from '@sveltejs/kit';
// import { agents } from '../+page.server.js';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	// get agent_id
	const agent_id = url.searchParams.get('agent_id');
	if (!agent_id) {
		return redirect(302, '/create-agent?direct_to_tournament=true');
	}

	// get agent
	const {_id, ...agent} = await  loadAgentByID(agent_id);
	if (!agent) {
		return redirect(302, '/create-agent?direct_to_tournament=true');
	}

	return {
		agent
	};
}