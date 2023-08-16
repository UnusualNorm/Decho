// Server configuration
const HOST = '0.0.0.0';
const PORT = 6739;

class GameServer {
  private udpServer: Deno.DatagramConn | null = null;

  async start(): Promise<void> {
    try {
      console.log(`[Game Server] Online! ${HOST}:${PORT}`);
      this.udpServer = await Deno.listenDatagram({ hostname: HOST, port: PORT, transport: "udp" });

      for await (const [data, addr] of this.udpServer) {
        this.datagramReceived(data, addr);
      }
    } catch (error) {
      console.error(`[Game Server] Error: ${error}`);
    }
  }

  datagramReceived(data: Uint8Array, addr: Deno.Addr): void {
    const decoder = new TextDecoder();
    const message = decoder.decode(data);

    // Extract port number from string representation of addr
    const portMatch = addr.toString().match(/:(\d+)$/);
    const port = portMatch ? portMatch[1] : "unknown";

    console.log(`[Game Server] Received message from ${addr}:${port}: ${message}`);

    // Process the message and perform any game-related logic here
    // Update game state, respond to the client, etc.

    // Do not send a response back to the client, just print to server console
  }
}

async function main() {
  const server = new GameServer();
  await server.start();
}

if (import.meta.main) {
  main();
}
