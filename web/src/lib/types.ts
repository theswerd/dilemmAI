// The human user 
export interface Player {
  playerID: string;
  name: string;
  pfpEmoji: string;
}

export interface Agent {
  // Agent Profile
  agentID: string;
  name: string;
  pfpEmoji: string;

  // 
  playerID: string; // Owner of given agent
  inputStrategy: string; // Strategy that player/owner inputs for their agent  
}

// With 8 Agents in a tournament, each agent will play 4 OnevOnes 
export interface Tournament {
  tournamentID: string;
  agents: Agent[];
  oneVones: OneVOne[];
  startTime: Date;
}

// Each OneVOne will have 7 Interactions to cooperate or defect
export interface OneVOne {
  oneVoneID: string;
  agents: [Agent, Agent];
  interactions: Interaction[];
  winner: Agent | null;
  startTime: Date;
}

// Each Interaction will encompass 2 decisions, one from each Agent
export interface Interaction {
  interactionID: string;
  oneVoneID: string;
  decisions: { agentID: string; decision: 'cooperate' | 'defect' }[];
  outcome: { agentID: string; points: number }[]; // Points gained or lost for both agents in this interaction

}

// TODO: Data type for the progress of a given OnevOne
// 


// TODO: Leaderboard data type