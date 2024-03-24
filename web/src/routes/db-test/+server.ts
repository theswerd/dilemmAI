import { client, loadAgent, saveAgent } from "$lib/database";
import { json, type RequestHandler } from "@sveltejs/kit";

// Fake agent data for testing
const testAgent = {
    agentID: 'testAgent1',
    playerID: 'testPlayer1',
    agentEmoji: '🤖',
    agentColor: 'blue',
    inputStrategy: 'test-strategy'
};


export const GET: RequestHandler = async () => {
    try {
        // Save the fake agent
        await saveAgent(testAgent);

        // Load the fake agent
        const loadedAgent = await loadAgent(testAgent.playerID);

        // Return the result
        return json({
            message: "Hello from the server!",
            db: client.db().databaseName,
            loadedAgent: loadedAgent
        });


    } catch (e) {
        return json({
            message: "Error",
            error: e
        });
    }
};