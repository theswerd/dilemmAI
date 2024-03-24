import { MongoClient } from "mongodb";

// requre dotenv for typescript
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


// Connect to your Atlas cluster
export const client = new MongoClient('mongodb+srv://user:dilemmai@serverlessinstance0.kj5ngp8.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0');

// Connect to the MongoDB cluster
export async function connect() {
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
  } catch (e) {
    // collection already exists
  }
}).catch((err) => {
  console.error(err);
});

// function to upload Agents to database