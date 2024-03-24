import { MongoClient, Collection } from "mongodb";
import dotenv from "dotenv";
import type { Agent } from "./types";
import { PUBLIC_MONGODB } from '$env/static/public';

dotenv.config();

export const client = new MongoClient(PUBLIC_MONGODB);

export async function connect() {
  await client.connect();
}

const getAgentsCollection = (): Collection<Agent> => {
  return client.db("agents").collection("agents");
}

// Ensure collections are created and the database is connected
connect().then(() => {
  console.log("Connected to MongoDB");

  client.db().listCollections({ name: "agents" }).toArray().then(collections => {
    if (!collections.length) {
      client.db().createCollection("agents", {
        capped: false,
      }).then(() => console.log("Created collection for agents"))
        .catch(console.error);
    }
  });
}).catch(console.error);

export async function saveAgent(agent: Agent): Promise<void> {
  const collection = getAgentsCollection();
  await collection.updateOne({ agentID: agent.agentID }, { $set: agent }, { upsert: true });
}

// Load all Agents by playerID
export async function loadAgentsByPlayerID(playerID: string): Promise<Agent[]> {
  const collection = getAgentsCollection();
  return collection.find<Agent>({ playerID,  }, {
    limit:100
  }).toArray();
}

// Load Agent by agentID
export async function loadAgentByID(agentID: string): Promise<Agent | null> {
  const collection = getAgentsCollection();
  return collection.findOne<Agent>({ agentID });
}