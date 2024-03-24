import { MongoClient, Collection } from "mongodb";
import dotenv from "dotenv";
import type { Agent } from "./types";

dotenv.config();

// export const client = new MongoClient(process.env.MONGODB as string);
export const client = new MongoClient("mongodb+srv://user:dilemmai@serverlessinstance0.kj5ngp8.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0");

export async function connect() {
  await client.connect();
}

const getAgentsCollection = (): Collection<Agent> => {
  return client.db().collection("agents");
}

// Ensure collections are created and the database is connected
await connect().then(() => {
  // console.log("server state:",client.db().serverStatus());
  console.log("Connected to MongoDB");
}).catch(console.error);

export async function saveAgent(agent: Agent): Promise<void> {
  const collection = getAgentsCollection();
  await collection.updateOne({ agentID: agent.agentID }, { $set: agent }, { upsert: true });
}

// Load all Agents by playerID
export async function loadAgentsByPlayerID(playerID: string): Promise<Agent[]> {
  const collection = getAgentsCollection();
  return collection.find<Agent>({ playerID }).toArray();
}

// Load Agent by agentID
export async function loadAgentByID(agentID: string): Promise<Agent | null> {
  const collection = getAgentsCollection();
  return collection.findOne<Agent>({ agentID });
}