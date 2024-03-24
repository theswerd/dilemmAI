import type { RequestHandler } from "@sveltejs/kit";
import { agents } from "../../+page.server";


export const GET: RequestHandler = async () => {
    while (agents.length > 0) {
        agents.pop();
    }
    return new Response("Hello, world!", {
        headers: {
            "content-type": "text/plain",
        },
        status: 200,
    })
}