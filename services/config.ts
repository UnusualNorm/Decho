import { Packet, decodePackets } from "../encoder.ts";
import {
  ConfigRequest,
  decodeConfigRequestPayload,
} from "../encoders/config/request.ts";
import { ServiceType, encodeMagicPacket } from "../encoders/magic_packet.ts";
import { headerLookup } from "../packet.ts";
import { getConfig } from "../utils/config.ts";
import { arrayBufferToHexString } from "../utils/string.ts";
import { isBinaryMessage } from "../utils/websocket.ts";

Deno.serve({ port: 8003 }, (req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  console.log(`[config] Client connecting...`);

  ws.onopen = () => {
    console.log("[config] Client connected!");
  };

  const ws_send = ws.send;
  ws.send = (data: ArrayBuffer) => {
    // console.debug(`[config] Server: ${arrayBufferToHexString(data)}`);
    ws_send.call(ws, data);
  };

  ws.onmessage = (e) => {
    if (!isBinaryMessage(e.data)) {
      console.warn(`[config] Client sent non-binary message!`);
      return;
    }

    console.debug(`[config] Client: ${arrayBufferToHexString(e.data)}`);

    let packets: Packet[];
    try {
      packets = decodePackets(e.data);
    } catch (e) {
      console.warn(`[config] Client sent invalid packet! (${e})`);
      return;
    }

    for (const packet of packets) {
      if (packet.header === headerLookup.config.request) {
        let request: ConfigRequest;
        try {
          request = decodeConfigRequestPayload(packet.payload);
        } catch (e) {
          console.warn(`[config] Client sent invalid request! (${e})`);
          return;
        }

        console.log(
          `[config] Client requested config type=${request.type} id=${request.id}`
        );

        let config: object;
        try {
          config = getConfig(request.type, request.id);
        } catch (e) {
          console.warn(`[config] Failed to get config! (${e})`);
          return;
        }

        ws.send(encodeMagicPacket(ServiceType.Config));
      }
    }
  };

  ws.onclose = () => {
    console.log("[config] Client disconnected!");
  };

  return response;
});
