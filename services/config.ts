import { decodePackets, Packet } from "../encoder.ts";
import {
  ConfigRequest,
  decodeConfigRequestPayload,
} from "../encoders/config/request.ts";
import { encodeMagicPacket, ServiceType } from "../encoders/magic_packet.ts";
import { log } from "../utils/logging.ts";
import { DEBUG } from "../mod.ts";
import { headerLookup } from "../packet.ts";
import { Config, getConfig } from "../utils/config.ts";
import { arrayBufferToHexString } from "../utils/string.ts";
import { isBinaryMessage } from "../utils/websocket.ts";
import { encodeConfigResponsePacket } from "../encoders/config/response.ts";
import { decodeUint, UintSize } from "../utils/endian.ts";

Deno.serve({ port: 8003 }, (req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  log(`[config] Client connecting...`);

  ws.onopen = () => {
    log("[config] Client connected!");
  };

  const ws_send = ws.send;
  ws.send = (data: ArrayBuffer) => {
    DEBUG && console.debug(`[config] Server: ${arrayBufferToHexString(data)}`);
    ws_send.call(ws, data);
  };

  ws.onmessage = (e) => {
    if (!isBinaryMessage(e.data)) {
      console.warn(`[config] Client sent non-binary message!`);
      return;
    }

    DEBUG &&
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
          continue;
        }

        log(
          `[config] Client requested config type=${request.type} id=${request.id}`,
        );

        let config: Config;
        try {
          config = getConfig(request.type, request.id);
        } catch (e) {
          console.warn(`[config] Failed to get config! (${e})`);
          continue;
        }

        ws.send(
          encodeConfigResponsePacket(
            decodeUint(
              UintSize.Uint64,
              new Uint8Array([0x7b, 0x1d, 0x0e, 0x44, 0x27, 0xee, 0x09, 0x15]),
            ),
            decodeUint(
              UintSize.Uint64,
              new Uint8Array([0x7b, 0x1d, 0x0e, 0x44, 0x27, 0xee, 0x09, 0x15]),
            ),
            decodeUint(
              UintSize.Uint32,
              new Uint8Array([0x59, 0x02, 0x00, 0x00]),
            ),
            config,
            request.unknownByte2,
          ),
        );
        ws.send(encodeMagicPacket(ServiceType.Config));
      } else {
        console.warn(`[config] Client sent unknown packet!`);
      }
    }
  };

  ws.onclose = () => {
    log("[config] Client disconnected!");
  };

  return response;
});
