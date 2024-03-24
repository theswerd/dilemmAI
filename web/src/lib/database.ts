import { MongoClient } from "mongodb"; 

// requre dotenv for typescript
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


// Connect to your Atlas cluster
export const client = new MongoClient(process.env.MONGODB as string);

// Connect to the MongoDB cluster
export async function connect() {
    await client.connect();
}

// test
connect().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error(err);
});