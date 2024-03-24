import type { OneVOne } from "$lib/types";
import { writable } from "svelte/store";
import { socketStore } from "./socketState";


const intialGameState: OneVOne = {
  oneVoneID: "",
  interactions: [],
  interactionsLimit: 5,
  winner: null,
  startTime: new Date(),
}


function createGameStore() {
  const { subscribe, set, update } = writable<OneVOne>(intialGameState);

  $socketStore.socket.on('gameStart', ()) => {

  })
}