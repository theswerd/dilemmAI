

//TODO: discuss this a bit
export interface Player {
  name: string;
  score: number;
  avatar: string;
}

//TODO: discuss this a bit
export interface Game {
  isConnected: boolean;
  players: Player[];
  currentRound: number;
  roundScores: Array<[number, number]>;
  leaderboard: Array<[string, number]>;
}