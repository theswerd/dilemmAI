import { Server as SocketIOServer } from 'socket.io';


import type { Tournament, OneVOne, Agent, Interaction, Player } from './types';
import { v4 as uuidv4 } from 'uuid';


export function createTournament(agents: Agent[]): Tournament {
    // For a given agent, "schedule" oneVones with n / 2 other agents
    // For example: with 8 agents, each agent will play 4 OnevOnes
    
    const oneVones: OneVOne[] = [];
    for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
            oneVones.push(createOneVOne([agents[i], agents[j]]));
        }
    }

    return {
        tournamentID: uuidv4(),
        agents: agents,
        oneVones: oneVones,
        startTime: new Date()
    };
}

// Helper function for createTournament
function createOneVOne(agents: [Agent, Agent]): OneVOne {
    return {
        oneVoneID: uuidv4(),
        agents: agents,
        interactions: [],
        interactionsLimit: 7,
        winner: null,
        startTime: new Date()
    };
}

export function createInteraction(oneVoneID: string, decisions: { agentID: string; decision: 'cooperate' | 'defect' }[]): Interaction {
    // Calculate the outcome of the interaction
    const outcome = calculateOutcome(decisions);

    return {
        interactionID: uuidv4(), 
        oneVoneID,
        decisions,
        outcome
    };
}


function calculateOutcome(decisions: { agentID: string; decision: 'cooperate' | 'defect' }[]): { agentID: string; points: number }[] {
    // Point calculation based on the Prisoner's Dilemma payoff matrix
    const [firstDecision, secondDecision] = decisions;

    // Both cooperate: 3 points each
    if (firstDecision.decision === 'cooperate' && secondDecision.decision === 'cooperate') {
        return [{ agentID: firstDecision.agentID, points: 3 }, { agentID: secondDecision.agentID, points: 3 }];
    } 
    
    // Both defect: -1 point each
    else if (firstDecision.decision === 'defect' && secondDecision.decision === 'defect') {
        return [{ agentID: firstDecision.agentID, points: -1 }, { agentID: secondDecision.agentID, points: -1 }];
    } 
    
    // One cooperates, the other defects: 5 points for the defector, -1 point for the cooperator
    else if (firstDecision.decision === 'cooperate' && secondDecision.decision === 'defect') {
        return [{ agentID: firstDecision.agentID, points: -1 }, { agentID: secondDecision.agentID, points: 5 }];
    } 
    
    // One defects, the other cooperates: 5 points for the defector, -1 point for the cooperator
    else { // firstDecision.defect && secondDecision.cooperate
        return [{ agentID: firstDecision.agentID, points: 5 }, { agentID: secondDecision.agentID, points: -1 }];
    }
}


// Simultaneously start all OnevOnes in the tournament
function startTournament(tournament: Tournament): void {
    tournament.oneVones.forEach(oneVone => {
        startOneVOne(oneVone);
    });
}

function startOneVOne(oneVone: OneVOne): void {
    // Start the OnevOne process, possibly with time delays between interactions
    oneVone.startTime = new Date();

    // Conduct interactions here

    // OneVOne ends when the interactions limit is reached...
    const interactionsLimit = oneVone.interactionsLimit
    if (oneVone.interactions.length >= interactionsLimit) {
        // End the OnevOne
        return;
    }

    // ...otherwise...
    const decisions = getDecisionsForOneVOne(oneVone);
    const interaction = createInteraction(oneVone.oneVoneID, decisions);
    oneVone.interactions.push(interaction);
}


function getDecisionsForOneVOne(oneVOne: OneVOne): { agentID: string; decision: 'cooperate' | 'defect' }[] {
    // Placeholder for the decision-making logic
    // In the real application, this would involve fetching decisions from the agents
    return [
        { agentID: oneVOne.agents[0].agentID, decision: 'cooperate' },
        { agentID: oneVOne.agents[1].agentID, decision: 'defect' }
    ];
}