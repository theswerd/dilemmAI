// src/lib/service/auth.ts
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { PUBLIC_CLIENTID, PUBLIC_DOMAIN } from '$env/static/public';

const domain = PUBLIC_DOMAIN;
const clientId = PUBLIC_CLIENTID;
const redirectUri = 'http://localhost:5173/';

export let auth0: Auth0Client;

export async function initializeAuth0() {
    auth0 = await createAuth0Client({
        domain,
        clientId: clientId,
    });
}

export async function login() {
    await auth0.loginWithRedirect({
        authorizationParams: {
            redirect_uri: redirectUri
        }
    });

    // Get the user profile after login
    // const user = await auth0.getUser();
    const user = await auth0.checkSession();
    console.log("User", user);
    

}

export async function logout() {
    const user = await auth0.getUser();
    console.log("User", user);
    await auth0.logout({
      logoutParams: {
        returnTo: redirectUri
      }
    });
}
