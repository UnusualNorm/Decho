import type { DecodedPacket, RawPacket } from "../types/packet.ts";
import { DEBUG } from "../mod.ts";
import { isArrayBuffer } from "./buffer.ts";
import {
  decodePacket,
  decodePackets,
  encodePacket,
  encodePackets,
} from "./packet.ts";
import { arrayBufferToHexString } from "./string.ts";

type PacketSender = (packet: DecodedPacket) => void;
// deno-lint-ignore no-explicit-any
type WebsocketWithData<Data extends Record<string, any>> = WebSocket & {
  data: Partial<Data>;
};

// deno-lint-ignore no-explicit-any
export const createBasicService = <Data extends Record<string, any>>(
  name: string,
  port: number,
  onConnect: (
    socket: WebsocketWithData<Data>,
    sendPacket: PacketSender,
  ) => void,
  onDisconnect: (socket: WebsocketWithData<Data>) => void,
  onPacket: (
    socket: WebsocketWithData<Data>,
    packet: DecodedPacket,
    sendPacket: PacketSender,
  ) => void,
) =>
  Deno.serve({ port }, (req) => {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req) as unknown as {
      socket: WebsocketWithData<Data>;
      response: Response;
    };
    socket.data = {};
    console.log(`[${name}] Client connecting...`);

    let collectingPackets = false;
    const collectedPackets: Uint8Array[] = [];
    const startCollectingPackets = () => (collectingPackets = true);
    const stopCollectingPackets = () => {
      if (collectedPackets.length !== 0) {
        socket.send(
          new Uint8Array([
            ...collectedPackets.flatMap((packet) => [...packet]),
          ]),
        );
      }

      collectedPackets.length = 0;
      collectingPackets = false;
    };

    const sendPacket: PacketSender = (decodedPacket) => {
      const packet = encodePacket(decodedPacket);
      const rawPacket = encodePackets([packet], true);

      DEBUG &&
        console.debug(
          `[${name}] Server: ${arrayBufferToHexString(rawPacket)}`,
        );

      if (collectingPackets) {
        collectedPackets.push(rawPacket);
      } else socket.send(rawPacket);
    };

    socket.onopen = () => {
      startCollectingPackets();
      console.info(`[${name}] Client connected!`);
      onConnect(socket, sendPacket);
      stopCollectingPackets();
    };

    socket.onmessage = (e) => {
      if (!isArrayBuffer(e.data)) {
        console.warn(`[${name}] Client sent non-binary message...`);
        return;
      }

      DEBUG &&
        console.debug(`[${name}] Client: ${arrayBufferToHexString(e.data)}`);

      let packets: RawPacket[];
      try {
        packets = decodePackets(new Uint8Array(e.data), true);
      } catch (e) {
        console.error(`[${name}] Client sent invalid packet... (${e})`);
        return;
      }

      startCollectingPackets();
      for (const rawPacket of packets) {
        let decodedPacket: DecodedPacket;
        try {
          decodedPacket = decodePacket(rawPacket);
        } catch (e) {
          console.error(`[${name}] Client sent invalid packet... (${e})`);
          return;
        }

        onPacket(socket, decodedPacket, sendPacket);
      }
      stopCollectingPackets();
    };

    socket.onclose = () => {
      console.info("[config] Client disconnected!");
      onDisconnect(socket);
    };

    return response;
  });
