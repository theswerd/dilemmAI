// src/stores/socketStore.js
import { writable } from 'svelte/store';
import { io, Socket } from 'socket.io-client';
import type { SocketState } from '$lib/types';

const connectURL = 'http://localhost:3001';

if (!connectURL) {
	throw new Error('VITE_WS_URL is not defined in .env');
}

// Initial GameState
const initialState = {
	socket: null,
    isConnected: false
};

const createWebSocketStore = () => {
	const { subscribe, set, update } = writable<SocketState>(initialState);

	let socket: Socket;
	const ping = () => {
		socket.emit('ping');
		return  new Promise((resolve) => {
			socket.on('pong', () => {
				resolve(null);
			});
		});
	}
	const connect = async () => {
		await new Promise( (resolve, reject) => {
			socket = io(connectURL, {
				// Optional: configuration options here
				retries: 1
			});

			socket.connect();

			socket.on('connect', () => {
        
				update((state) => {
					state.isConnected = true;
					state.socket = socket;
					return state;
				});
				resolve(null);
				// update(state => ({ ...state, isConnected: true }));

				// resolve(null);
			});

	
			// Example of handling custom message events
			// socket.on('message', (message) => {
			//     update(state => ({
			//         ...state,
			//     }));
			// });

			socket.on('connect_error', (error) => {
				console.log('connect_error', error);
				reject(error);
			});

			socket.on('disconnect', () => {
				console.log('disconnected');
				update((state) => ({ ...state, isConnected: false }));
				reject(null);
			});

			
		});
		
	};

    const listen = (event: string, callback: (message: unknown) => void) => {
        if (socket) {
            socket.on(event, callback);
        }
    }

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
		ping,
        listen
	};
};

export const socketStore = createWebSocketStore();