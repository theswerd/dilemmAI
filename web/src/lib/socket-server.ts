import { Server } from 'socket.io';
import { type Socket } from 'socket.io-client';
import {v4 as uuidv4} from 'uuid';
import { createServer } from 'http';
import type { ActiveTournament, Agent, Interaction, OneVOne, Player, PlayerSession, Tournament } from './types';
import { createTournament } from './game';
import { Tornado } from 'lucide-svelte';
import { callAI } from './call-ai';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// uniquePairs = [[[1,2], [3,4]], [[1,3], [2,4]], [[1,4], [2,3]]]
// oneVones is a List of Rounds of OneVOnes
// Each Round is a List of OneVOnes
// All OneVOnes in a Round are played simultaneously
// let uniquePairs: Array<Array<OneVOne>>  = []
let gameStarted: boolean = false;
let round: number = 0;
let playersQueue: Array<PlayerSession> = [];
let tournament: ActiveTournament; 
let tournamentRound: Array<OneVOne[]>;



// Player connects to Tournament
io.on('connect', (socket) => {
    // Add player to memory when they connect to lobby
    socket.on('addPlayer', (newPlayer: Player, playerAgent: Agent) => {
        playersQueue.push({
            player: newPlayer,
            agent: playerAgent,
            socketId: socket.id
        });
        
        console.log(`User ${socket.id} connected. Total players: ${Object.keys(players).length}`);
        io.emit('updatePlayers', Object.values(players));
        // io.emit('updateLeaderBoard', Object.entries(leaderBoard).sort((a, b) => b[1] - a[1]));
    });


    if (playersQueue.length === 4) {
      tournament = createTournament([...playersQueue]);
      playersQueue = [];
      // add socket by id to room

      const roomSockets = tournament.playerSessions.map(({ socketId }) => socketId);
      io.sockets.sockets.forEach((socket) => {
        if (roomSockets.includes(socket.id)) {
          socket.join(tournament.tournamentID);
      }});
      io.to(tournament.tournamentID).emit('tournamentStart', tournament);

      startTourament(io, tournament);
    }

    // start first round of tournament





    // Player disconnects
    socket.on('disconnect', () => {
        let player = players[socketIdToPublicKey[socket.id]];
        if (!player) {
            console.log(`User ${socket.id} not found.`);
            return;
        }

        delete players[player.pubKey];
        delete socketIdToPublicKey[socket.id];
        delete leaderBoard[player.pubKey];
        totalPlayers--;
        // playerIdxToPublicKey = Object.entries(playerIdxToPublicKey).reduce((acc, [idx, publicKey]) => {
        //     if (player.publicKey === publicKey) {
        //         return acc;
        //     }

        // }, {})
        if (player.isHost) {
            gameStarted = false;
        }
        console.log(`User ${socket.id} disconnected. Total players: ${Object.keys(players).length}`);
        io.emit('updatePlayers', Object.values(players));
    });

    // Listen for host starting the game
    socket.on('startRounds', () => {
        tournament = createTournament(agents)
        gameStarted = true;
        console.log(`Host ${socket.id} started the game.`)
        io.emit("promptStart");
    }); 

    
    socket.on('', () => {
      tournament = createTournament(agents);

    })



    
    
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 


async function startTourament(io: Server, tournament: ActiveTournament): Promise<void> {
  for (let i = 0; i < tournament.oneVones.length; i++) {
    tournament.round += 1;
    await runRound(io, tournament, i);
  }


}





async function runRound(io: Server, tournament: ActiveTournament, round: number) {
  const thisRound = tournament.oneVones[round];
  for (let i = 0; i < thisRound.length; i++) {
    io.to(tournament.tournamentID).emit('gameStart', thisRound[i])
    await runGame(io, tournament, round, i);
  }

}

async function interactionsToString(interactions: Interaction[], agentID: string) {
  
  const desicions = interactions.map((interaction) => {
    const yourDecision = interaction.decisions.find((decision) => decision.agentID === agentID)!.decision
    const otherDecision = interaction.decisions.find((decision) => decision.agentID !== agentID)!.decision
    return [yourDecision, otherDecision] 
  })

  return "The following is the history of the game so far:\n" + desicions.map(([yourDecision, otherDecision], idx) => {
    return `Round ${idx}: Your Action: ${yourDecision}, Their Action: ${otherDecision}\n`
  })
}



async function runGame(io:Server, tournament: ActiveTournament, round: number, game: number) {
  // let currentGame = {}
  const thisGame = tournament.oneVones[round][game];
  const { agents, interactionsLimit, interactions } = thisGame;
  const [agent1, agent2] = agents!;

  for (let i = 0; i < interactionsLimit; i++) {
    const agent1Move = await callAI(
      {
        admin: "",
        prompt: interactionsToString(interactions, agent1.agentID) + `\nYou should ${agent1.inputStrategy}\nIt is now your turn, what is your decision?`,
      }
    );

    const agent2Move = await callAI(
      {
        admin: "",
        prompt: interactionsToString(interactions, agent2.agentID) + `\nYou should ${agent2.inputStrategy}\nIt is now your turn, what is your decision?`, }
    );

    const newInteraction = {
      interactionID: uuidv4(),
      oneVoneID: thisGame.oneVoneID,
      decisions: [
        { agentID: agent1.agentID, decision: agent1Move.action },
        { agentID: agent2.agentID, decision: agent2Move.action }
      ],
      outcome: []
    }
    interactions.push(newInteraction);
    io.to(tournament.tournamentID).emit('agentDecision', newInteraction);
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


