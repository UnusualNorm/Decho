import "dotenv/load.ts";

import "./services/login.ts";
import "./services/matching.ts";
import "./services/transaction.ts";
import "./services/config.ts";

export const SERVER_DEBUG = Deno.env.get("SERVER_DEBUG") === "true";
export const CLIENT_DEBUG = Deno.env.get("CLIENT_DEBUG") === "true";

// API
Deno.serve({ port: 80 }, (req) => {
  console.log(req);
  return new Response("Hello World!");
});
