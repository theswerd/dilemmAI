import { redirect } from '@sveltejs/kit';
import { agents } from '../+page.server.js';

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
	// get agent_id
	const agent_id = url.searchParams.get('agent_id');
	if (!agent_id) {
		return redirect(301, '/create-agent?direct_to_tournament=true');
	}

	// get agent
	const agent = agents.find((agent) => agent.agentID === agent_id);
	if (!agent) {
		return redirect(301, '/create-agent?direct_to_tournament=true');
	}

	return {
		agent
	};
}
