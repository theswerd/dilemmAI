// src/lib/auth.js
import { get, writable } from 'svelte/store';
import {createAuth0Client, type Auth0Client} from '@auth0/auth0-spa-js';
import { PUBLIC_CLIENTID, PUBLIC_DOMAIN } from '$env/static/public';

const auth0Client = writable<Auth0Client>();
const isAuthenticated = writable(false);
const userProfile = writable({});
const redirectUri = 'http://localhost:5173/';

async function initializeAuth0() {
    const client = await createAuth0Client({
        domain: PUBLIC_DOMAIN,
        clientId: PUBLIC_CLIENTID,
        cacheLocation: 'localstorage'
    });

    auth0Client.set(client);

    // Handle the authentication result
    if (window.location.search.includes('code=')) {
        const { appState } = await client.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
        isAuthenticated.set(true);
    }

    // Set the user authentication status
    const authenticated = await client.isAuthenticated();
    console.log('Authenticated:', authenticated);
    isAuthenticated.set(authenticated);
    if (authenticated) {
        const user = await client.getUser();
        userProfile.set(user);
    }
}

async function login() {
    console.log('Attempting to login...');
    try {
        const client = get(auth0Client);
        await client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: redirectUri
        }
        });
    } catch (error) {
        console.error('Login error:', error);
    }
}

async function logout() {
    console.log('Attempting to logout...');

    await get(auth0Client).getUser().then(user => console.log('User:', user));

    try {
        const client = get(auth0Client);
        await client.logout({
            returnTo: window.location.origin
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
}

export { auth0Client, isAuthenticated, userProfile, initializeAuth0, login, logout };
