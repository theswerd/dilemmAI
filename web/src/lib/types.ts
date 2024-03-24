import { Socket } from "socket.io-client";


export interface SocketState {
  socketState: "connecting" | "connected" | "disconnected" | "error",
  socket: Socket | null
}
export interface PlayerSession {
  player: Player;
  agent: Agent;
  socketId: string;
}

// The human user 
export interface Player {
  name: string;
  pfpEmoji: string;
}

export interface Agent {
  // Agent Profile
  agentID: string;
  playerID: string; // Owner of given agent
  inputStrategy: string; // Strategy that player/owner inputs for their agent  
}

// With 8 Agents in a tournament, each agent will play 4 OnevOnes 
export interface ActiveTournament {
  tournamentID: string;
  playerSessions: PlayerSession[];
  oneVones: Array<OneVOne[]>;
  round: number;
  summary?: string;
}

// Each OneVOne will have 7 Interactions to cooperate or defect
export interface OneVOne {
  oneVoneID: string;
  agents?: [Agent, Agent];
  
  interactions: Interaction[];
  interactionsLimit: number;
  agentScores: number[];
  winner: Agent | null;
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