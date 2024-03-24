// import { json } from "@sveltejs/kit";
import { agents } from "../+page.server";

export function load() {
    return {
        acc: {
            agents: agents,
        },
    };
}