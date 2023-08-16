// deno-lint-ignore-file

import "dotenv/load.ts";

import "./services/config.ts";
// import "./services/login.ts";
import "./services/matchmaking.ts";
// import "./services/transaction.ts";


export const DEBUG = Deno.env.get("DEBUG") === "true";

// API
Deno.serve({ port: 80 }, (req) => {
  console.log(req);
  return new Response("Hello World!");
});
