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
  oneVones: OnevOne[];
  startTime: Date;
}

// Each OnevOne will have 7 Interactions to cooperate or defect
export interface OnevOne {
  onevOneID: string;
  agents: [Agent, Agent];
  interactions: Interaction[];
  winner: Agent | null;
  startTime: Date;
}

// Each Interaction will encompass 2 decisions, one from each Agent
export interface Interaction {
  interactionID: string;
  onevOneID: string;
  decisions: { agentID: string; decision: 'cooperate' | 'defect' }[];
}

// TODO: Data type for the progress of a given OnevOne
// 


// TODO: Leaderboard data type