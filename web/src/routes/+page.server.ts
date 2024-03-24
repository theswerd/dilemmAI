import type { Agent } from "$lib/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
export let agents: Agent[] = [];

/** @type {import('./$types').PageLoad} */ 
export function load() {
	return {
		acc: {
			playerInfo: {},
			agents: agents
		}
	};
}
