// src/stores/socketStore.js
import { writable } from 'svelte/store';
import { io, Socket } from 'socket.io-client';
import type { Game } from '$lib/types';

const connectURL = import.meta.env.VITE_WS_URL;

if (!connectURL) {
    throw new Error('VITE_WS_URL is not defined in .env');
}

// Initial GameState
const initialState = {
    isConnected: false,
    players: [],
    currentRound: 0,
    roundScores: [],
    leaderboard: [],
};

const createWebSocketStore = () => {
    const { subscribe, set, update } = writable<Game>(initialState);

    let socket: Socket;

    const connect = () => {
        socket = io(connectURL, {
            // Optional: configuration options here
            autoConnect: true,
        });

        socket.on('connect', () => {
            update(state => ({ ...state, isConnected: true }));
        });

        // Example of handling custom message events
        // socket.on('message', (message) => {
        //     update(state => ({
        //         ...state,
        //     }));
        // });

        socket.on('connect_error', (error) => {
            console.log('connect_error', error)
        });

        socket.on('disconnect', () => {
            update(state => ({ ...state, isConnected: false }));
        });
    };

    const send = (event: string, message: unknown) => {
        if (socket && socket.connected) {
            socket.emit(event, message);
        } else {
            console.error('Socket.IO is not connected.');
        }
    };

    const disconnect = () => {
        if (socket) {
            socket.disconnect();
        }
    };

    // Reset the store to initial state upon disconnect
    const reset = () => {
        set(initialState);
    };

    return {
        subscribe,
        connect,
        send,
        disconnect,
        reset,
    };
};

export const socketStore = createWebSocketStore();
