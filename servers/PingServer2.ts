// Server configuration
const HOST = "0.0.0.0";
const PORT = 35098  ;

class PingServer {
  private udpServer: Deno.DatagramConn | null = null;

  async start(): Promise<void> {
    try {
      console.log(`[Ping Server] Online! ${HOST}:${PORT}`);
      this.udpServer = await Deno.listenDatagram({ hostname: HOST, port: PORT, transport: "udp" });

      for await (const [data, addr] of this.udpServer) {
        this.datagramReceived(data, addr);
      }
    } catch (error) {
      console.error(`[Ping Server] Error: ${error}`);
    }
  }

  datagramReceived(data: Uint8Array, addr: Deno.Addr): void {
    const message = new TextDecoder().decode(data);
    const netAddr = addr as Deno.NetAddr; // Convert to Deno.NetAddr to access the port
    const port = netAddr.port;
    console.log(`[Ping Server] Received message from ${addr.transport}:${port}: ${message}`);

    // Process the message and perform any game-related logic here
    // Update game state, respond to the client, etc.

    // Send a packet containing the letter "a"
    const responseMessage = new TextEncoder().encode("a");
    this.udpServer?.send(responseMessage, addr);
  }
}

async function main() {
  const server = new PingServer();
  await server.start();
}

if (import.meta.main) {
  main();
}
