import "dotenv/load.ts";

import "./services/login.ts";
import "./services/matching.ts";
import "./services/transaction.ts";
import "./services/config.ts";

export const DEBUG = Deno.env.get("DEBUG") === "true";

// API
Deno.serve({ port: 80 }, (req) => {
  console.log(req);
  return new Response("Hello World!");
});
