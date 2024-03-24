// import { json } from "@sveltejs/kit";
// import { agents } from '../+page.server';

import { loadAgentsByPlayerID } from '$lib/database';

export async function load() {
	return {
		agents: (await loadAgentsByPlayerID('1')).map((agent) => {
			const { _id, ...rest } = agent;
			return rest;
		})
	};
}
