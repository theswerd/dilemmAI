import { loadAgentByID, loadAgentsByPlayerID, saveAgent } from "$lib/database";
import { json, type RequestHandler } from "@sveltejs/kit";

// Fake agent data for testing
const testAgent1 = {
    agentID: 'testAgent1_loadedByID',
    playerID: 'testPlayer1',
    agentEmoji: '🤖',
    agentColor: 'blue',
    inputStrategy: 'test-strategy'
};

const testAgent2 = {
    agentID: 'testAgent2_loadedByPlayerID',
    playerID: 'testPlayer2',
    agentEmoji: '💀',
    agentColor: 'red',
    inputStrategy: 'test-strategy'
};

const testAgent3 = {
    agentID: 'testAgent3_loadedByPlayerID',
    playerID: 'testPlayer2',
    agentEmoji: '🤗',
    agentColor: 'green',
    inputStrategy: 'test-strategy'
};


export const GET: RequestHandler = async () => {
    try {
        // Save all test Agents
        await saveAgent(testAgent1);
        await saveAgent(testAgent2);
        await saveAgent(testAgent3);

        // Load one Agent by agentID
        const loadedAgentByID = await loadAgentByID(testAgent1.agentID);

        // Load all Agents by playerID
        const loadedAgentsByPlayerID = await loadAgentsByPlayerID(testAgent2.playerID);

        // Return the loaded agent data
        return json({
            message: "Success",
            loadedAgentByID,
            loadedAgentsByPlayerID
        });
        



    } catch (e) {
        return json({
            message: "Error",
            error: e
        });
    }
};