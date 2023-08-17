import { decodePackets, Packet } from "../encoder.ts";
import { encodeIpListPacket } from "../encoders/matchmaking/iplist.ts";
import {
  matchMakerTest,
  matchMakerTest2,
  matchMakerTest2Header,
  matchMakerTest3,
  matchMakerTest3Header,
  matchMakerTestHeader,
} from "../example.ts";
import { DEBUG } from "../mod.ts";
import { encodeUint, UintSize } from "../utils/endian.ts";
import { arrayBufferToHexString } from "../utils/string.ts";
import { isBinaryMessage } from "../utils/websocket.ts";

Deno.serve({ port: 8001 }, (req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  console.log(`[matchmaking] Client connecting...`);

  ws.onopen = () => {
    console.log("[matchmaking] Client connected!");
  };

  const ws_send = ws.send;
  ws.send = (data: ArrayBuffer) => {
    DEBUG &&
      console.debug(`[matchmaking] Server: ${arrayBufferToHexString(data)}`);
    ws_send.call(ws, data);
  };

  let count = 0;
  ws.onmessage = (e) => {
    if (!isBinaryMessage(e.data)) {
      console.warn(`[matchmaking] Client sent non-binary message!`);
      return;
    }

    DEBUG &&
      console.debug(`[matchmaking] Client: ${arrayBufferToHexString(e.data)}`);

    let packets: Packet[];
    try {
      packets = decodePackets(e.data);
    } catch (e) {
      console.warn(`[matchmaking] Client sent invalid packet! (${e})`);
      return;
    }

    for (const packet of packets) {
      if (packet.header === matchMakerTestHeader) {
        // if (count === 0) {
        console.log("test");
        ws.send(matchMakerTest[0]);
        ws.send(encodeIpListPacket());
        ws.send(matchMakerTest[1]);
        count++;
      } else if (packet.header === matchMakerTest2Header) {
        // } else if (count === 1) {
        console.log("test2");
        for (const packet of matchMakerTest2) {
          ws.send(packet);
        }
        count++;
      } else if (packet.header === matchMakerTest3Header) {
        // } else if (count === 2) {
        console.log("test3");
        for (const packet of matchMakerTest3) {
          ws.send(packet);
        }
        count++;
      } else {
        console.warn(
          `[matchmaking] Client sent unknown packet! ${
            arrayBufferToHexString(
              encodeUint(UintSize.Uint64, packet.header),
            )
          }`,
        );
      }
    }
  };

  ws.onclose = () => {
    console.log("[matchmaking] Client disconnected!");
  };

  return response;
});
