import { assertEquals } from "$std/assert/mod.ts";
import { init } from "zstd_wasm";
import {
  decodeSNSConfigRequestv2Payload,
  encodeSNSConfigRequestv2Payload,
  SNSConfigRequestv2Data,
} from "./SNSConfigRequestv2.ts";
import { typeStringToInt } from "../utils/config.ts";
import { toUint8Array, UintSize } from "../utils/endian.ts";

await init();

// deno-fmt-ignore
const packets: [SNSConfigRequestv2Data, Uint8Array][] = [
  [
    {
      type: toUint8Array(UintSize.Uint64, typeStringToInt("main_menu")!, true)[0],
      config: {
        type: "main_menu",
        id: "main_menu"
      },
    },
    new Uint8Array([0x7b,0x7b,0x22,0x74,0x79,0x70,0x65,0x22,0x3a,0x22,0x6d,0x61,0x69,0x6e,0x5f,0x6d,0x65,0x6e,0x75,0x22,0x2c,0x22,0x69,0x64,0x22,0x3a,0x22,0x6d,0x61,0x69,0x6e,0x5f,0x6d,0x65,0x6e,0x75,0x22,0x7d,0x00])
  ],
];

for (let i = 0; i < packets.length; i++) {
  const [data, payload] = packets[i];
  Deno.test(`encode SNSConfigRequestv2 payload ${i}`, () =>
    assertEquals(
      new Uint8Array(encodeSNSConfigRequestv2Payload(data, true)),
      payload,
    ));

  Deno.test(`decode SNSConfigRequestv2 payload ${i}`, () =>
    assertEquals(
      decodeSNSConfigRequestv2Payload(payload, true),
      data,
    ));
}
