import { context, getOctokit } from "@actions/github";

console.log("Hello via Bun!");

console.log("eventName", context.eventName);

console.log("payload", context.payload);

console.log("context", context);
