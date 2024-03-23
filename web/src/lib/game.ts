// src/lib/gameLogic.ts

import type { Tournament, OnevOne, Agent, Interaction, Player } from './types';


export function createTournament(agents: Agent[]): Tournament {
    // For a given agent, "schedule" oneVones with n / 2 other agents
    // For example: with 8 agents, each agent will play 4 OnevOnes
    
    const oneVones: OnevOne[] = [];
    for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
            oneVones.push(createOnevOne([agents[i], agents[j]]));
        }
    }

    return {
        tournamentID: Math.random().toString(36).substring(2, 15),
        agents: agents,
        oneVones: oneVones,
        startTime: new Date()
    };
}

// Helper function for createTournament
function createOnevOne(agents: [Agent, Agent]): OnevOne {
    return {
        onevOneID: Math.random().toString(36).substring(2, 15),
        agents: agents,
        interactions: [],
        winner: null,
        startTime: new Date()
    };
}


// Create a new Interaction after both Agents have made their decisions
export function createInteraction(onevOneID: string, decisions: { agentID: string; decision: 'cooperate' | 'defect' }[]): Interaction {

    return {
    interactionID: Math.random().toString(36).substring(2, 15),
    onevOneID,
    decisions,
  };

}