import { assertEquals } from "$std/assert/mod.ts";
import {
  decodeSNSLobbyMatchmakerStatusPayload,
  encodeSNSLobbyMatchmakerStatusPayload,
  SNSLobbyMatchmakerStatusData,
} from "./SNSLobbyMatchmakerStatus.ts";

// deno-fmt-ignore
const packets: [SNSLobbyMatchmakerStatusData, Uint8Array][] = [
  [
    {
      unknownNumber: 0x00000000
    },
    new Uint8Array([0x00,0x00,0x00,0x00])
  ],
];

for (let i = 0; i < packets.length; i++) {
  const [data, payload] = packets[i];
  Deno.test(`encode SNSLobbyMatchmakerStatus payload ${i}`, () =>
    assertEquals(
      new Uint8Array(encodeSNSLobbyMatchmakerStatusPayload(data, true)),
      payload,
    ));

  Deno.test(`decode SNSLobbyMatchmakerStatus payload ${i}`, () =>
    assertEquals(
      decodeSNSLobbyMatchmakerStatusPayload(payload, true),
      data,
    ));
}
