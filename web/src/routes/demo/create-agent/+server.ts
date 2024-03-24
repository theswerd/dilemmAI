import type { RequestHandler } from "@sveltejs/kit";
import { agents } from "../../+page.server";


export const GET: RequestHandler = async () => {
    agents.push({
        agentEmoji: "🤗",
        agentColor: "#7161EF",
        agentID: "1",
        playerID: "1",
        inputStrategy: "Be nice but hold grudges. If they defect then defect back at least once",
    });

    return new Response("Hello, world!", {
        headers: {
            "content-type": "text/plain",
        },
        status: 200,
    })
}