import { MongoClient } from "mongodb";

// requre dotenv for typescript
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


// Connect to your Atlas cluster
export const client = new MongoClient('mongodb+srv://user:dilemmai@cluster0.0r8l7nq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Connect to the MongoDB cluster
export async function connect() {
  console.log("Connecting to MongoDB");
  await client.connect();
}

// test
connect().then(async () => {
  console.log("Connected to MongoDB");

  try {
    await client.db().createCollection("sockets", {
      capped: true,
      size: 1e6
    });

    console.log("Created collection for sockets");

  } catch (e) {
    // collection already exists
  }
}).catch((err) => {
  console.error(err);
});

// function to upload Agents to database