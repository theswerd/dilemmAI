import { client } from "$lib/database";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    return json({
        message: "Hello from the server!", db: client.db().databaseName
    })
}