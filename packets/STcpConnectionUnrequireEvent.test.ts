import { assertEquals } from "$std/assert/mod.ts";
import {
  decodeSTcpConnectionUnrequireEventPayload,
  encodeSTcpConnectionUnrequireEventPayload,
  STcpConnectionUnrequireEventData,
} from "./STcpConnectionUnrequireEvent.ts";

// deno-fmt-ignore
const packets: [STcpConnectionUnrequireEventData, Uint8Array][] = [
  [
    {
      unknownByte: 0x4b,
    },
    new Uint8Array([0x4b])
  ],
];

for (let i = 0; i < packets.length; i++) {
  const [data, payload] = packets[i];
  Deno.test(`encode STcpConnectionUnrequireEvent payload ${i}`, () =>
    assertEquals(
      new Uint8Array(encodeSTcpConnectionUnrequireEventPayload(data, true)),
      payload,
    ));

  Deno.test(`decode STcpConnectionUnrequireEvent payload ${i}`, () =>
    assertEquals(
      decodeSTcpConnectionUnrequireEventPayload(payload, true),
      data,
    ));
}
