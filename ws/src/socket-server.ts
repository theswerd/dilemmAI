import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
import type {
  ActiveTournament,
  Agent,
  Interaction,
  MatchHistory,
  OneVOne,
  Player,
  PlayerSession,
  TournamentStats,
} from "../../web/src/lib/types";
import { createTournament, calAgentScores } from "../../web/src/lib/game";
import { callAI } from "../../web/src/lib/call-ai";
import { createAdapter } from "@socket.io/mongo-adapter";
import { client } from "./database";

export const main = () => {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: "*",
    },
  });

  io.adapter(createAdapter(client.db().collection("sockets")));

  // uniquePairs = [[[1,2], [3,4]], [[1,3], [2,4]], [[1,4], [2,3]]]
  // oneVones is a List of Rounds of OneVOnes
  // Each Round is a List of OneVOnes
  // All OneVOnes in a Round are played simultaneously
  // let uniquePairs: Array<Array<OneVOne>>  = []
  // let gameStarted: boolean = false;
  let playersQueue: Array<PlayerSession> = [];
  let tournament: ActiveTournament;
  // let tournamentRound: Array<OneVOne[]>;
  
  // Player connects to Tournament
  io.on("connect",async (socket) => {
    
    // Add player to memory when they connect to lobby
    socket.on("selectAgent", (playerInfo: Player, agent: Agent) => {
      playersQueue.push({
        player: playerInfo,
        agent: agent,
        socketId: socket.id,
      });
      
    io.emit("queueUpdate", playersQueue.map(({ agent }) => agent));
    });

    if (playersQueue.length === 4) {
      tournament = createTournament([...playersQueue]);
      playersQueue = [];
      // add socket by id to room

      const roomSockets = tournament.playerSessions.map(
        ({ socketId }) => socketId
      );
      io.sockets.sockets.forEach((socket) => {
        if (roomSockets.includes(socket.id)) {
          socket.join(tournament.tournamentID);
        }
      });
      io.to(tournament.tournamentID).emit("tournamentStart", tournament);

      runTourament(io, tournament);
    }

    // start first round of tournament

    // Player disconnects
    socket.on("disconnect", () => {
      console.log("Player disconnected");
      playersQueue = playersQueue.filter(
        (player) => player.socketId !== socket.id
      );
    });

    while (socket.connected){
      // await
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("STILL CONNECTED")
      socket.emit("time", new Date().toTimeString());
    }


  });

  const PORT = process.env.PORT || 3001;
  httpServer.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));

  async function runTourament(
    io: Server,
    tournament: ActiveTournament
  ): Promise<void> {
    for (let i = 0; i < tournament.oneVones.length; i++) {
      tournament.round += 1;
      await runRound(io, tournament, i);
    }
    const tournamentStats = generateTournamentStats(tournament);

    io.to(tournament.tournamentID).emit("tournamentFinish", tournamentStats);
  }

  function generateTournamentStats(
    tournament: ActiveTournament
  ): TournamentStats {
    const agents = tournament.playerSessions.map(({ agent }) => agent);
    const agentsInfo: { agent: Agent; playerScore: number }[] = [];
    const matchHistories: {
      agent: Agent;
      opponents: MatchHistory;
    }[] = [];
    agents.forEach((agent) => {
      const agentGames = tournament.oneVones.map((round) => {
        return round.find((game) => {
          return game.agents?.includes(agent);
        })!;
      });
      const [matchHistory, totalScore] = generateMatchHistorys(
        agent,
        agentGames
      );
      matchHistories.push({
        agent: agent,
        opponents: matchHistory,
      });
      agentsInfo.push({
        agent,
        playerScore: totalScore,
      });

      // start from the first one
    });
    return {
      tournamentID: tournament.tournamentID,
      agentsInfo,
      matchHistory: matchHistories,
    };
  }

  function generateMatchHistorys(
    agent: Agent,
    games: OneVOne[]
  ): [MatchHistory, number] {
    return games.reduce(
      (acc, game: OneVOne) => {
        const interactions = game.interactions;
        const newScore = calAgentScores(agent, interactions);
        const agentGameScore = acc[1] + newScore;

        return [
          [
            ...acc[0],
            {
              opponent: game.agents!.find(
                (gameAgent) => gameAgent.agentID !== agent.agentID
              )!,
              result:
                newScore > 0 ? "increase" : newScore < 0 ? "decrease" : "draw",
            },
          ],
          agentGameScore,
        ];
      },
      [[], 100] as [MatchHistory, number]
    );
  }

  async function runRound(
    io: Server,
    tournament: ActiveTournament,
    round: number
  ) {
    const thisRound = tournament.oneVones[round];
    for (let i = 0; i < thisRound.length; i++) {
      io.to(tournament.tournamentID).emit("gameStart", thisRound[i]);
      await runGame(io, tournament, round, i);
    }
  }

  async function interactionsToString(
    interactions: Interaction[],
    agentID: string
  ) {
    const desicions = interactions.map((interaction) => {
      const yourDecision = interaction.decisions.find(
        (decision) => decision.agentID === agentID
      )!.decision;
      const otherDecision = interaction.decisions.find(
        (decision) => decision.agentID !== agentID
      )!.decision;
      return [yourDecision, otherDecision];
    });

    return (
      "The following is the history of the game so far:\n" +
      desicions.map(([yourDecision, otherDecision], idx) => {
        return `Round ${idx}: Your Action: ${yourDecision}, Their Action: ${otherDecision}\n`;
      })
    );
  }

  async function runGame(
    io: Server,
    tournament: ActiveTournament,
    round: number,
    game: number
  ) {
    // let currentGame = {}
    const thisGame = tournament.oneVones[round][game];
    const { agents, interactionsLimit, interactions } = thisGame;
    const [agent1, agent2] = agents!;

    for (let i = 0; i < interactionsLimit; i++) {
      const agent1Move = await callAI({
        admin: "",
        prompt:
          interactionsToString(interactions, agent1.agentID) +
          `\nYou should ${agent1.inputStrategy}\nIt is now your turn, what is your decision?`,
      });

      const agent2Move = await callAI({
        admin: "",
        prompt:
          interactionsToString(interactions, agent2.agentID) +
          `\nYou should ${agent2.inputStrategy}\nIt is now your turn, what is your decision?`,
      });

      const newInteraction = {
        interactionID: uuidv4(),
        oneVoneID: thisGame.oneVoneID,
        decisions: [
          { agentID: agent1.agentID, decision: agent1Move.action },
          { agentID: agent2.agentID, decision: agent2Move.action },
        ],
        outcome: [],
      };
      interactions.push(newInteraction);
      io.to(tournament.tournamentID).emit("agentDecision", newInteraction);
    }
  }

  // async function broadcastToPairs(io: Server, pair: OneVOne) {
  //   const {interactions, agents, interactionsLimit } = pair;

  //   const [agent1, agent2] = agents!;
  //   // if (!agent1 || !agent2) {
  //   //   throw new Error('Agent not found');
  //   // }

  //   for (let i = 0; i < interactionsLimit; i++) {
  //     const result = await fetch("dsdas");

  //     io.to([agent1.playerID, agent2.playerID]).emit('agentDecision', );
  //   }

  //   io.to([agent1.playerID, agent2.playerID]).emit('roundFinish', );

  // }
};
