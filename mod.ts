import "./services/config.ts";
// import "./services/login.ts";
// import "./services/matchmaking.ts";
// import "./services/transaction.ts";

// API
Deno.serve({ port: 80 }, (req) => {
  console.log(req);
  return new Response("Hello World!");
});
