const { MongoClient } = require("mongodb");
require('dotenv').config()
 
const client = new MongoClient(process.env.MONGODB);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log("Failed to connect to Atlas");
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);