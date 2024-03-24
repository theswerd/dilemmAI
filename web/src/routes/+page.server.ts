import { loadAgentsByPlayerID } from "$lib/database";
import type { Agent } from "$lib/types";
import { json } from "@sveltejs/kit";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
// export let agents: Agent[] = [];

/** @type {import('./$types').PageLoad} */ 
export async function load() {

	const agents = (await loadAgentsByPlayerID("testPlayer2")).map(agent => ({
		agentID: agent.agentID,
		playerID: agent.playerID,
		agentEmoji: agent.agentEmoji,
		agentColor: agent.agentColor,
		inputStrategy: agent.inputStrategy
	}));
	return {
		acc: {
			playerInfo: {},
			agents: agents
		}
	};
}
