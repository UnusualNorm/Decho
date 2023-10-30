import { assertEquals } from "$std/assert/mod.ts";
import { init } from "zstd_wasm";
import {
  decodeSNSDocumentSuccessPayload,
  encodeSNSDocumentSuccessPayload,
  SNSDocumentSuccessData,
} from "./SNSDocumentSuccess.ts";
import { PrEfIxeula } from "../types/document.ts";

await init();

// deno-fmt-ignore
const packets: [SNSDocumentSuccessData, Uint8Array][] = [
  [
    {
        prefix: PrEfIxeula,
        document: {
          link_cc: "https://bit.ly/EchoVR_COCReporting",
          mark_as_read_profile_key: "legal|eula_version",
          version: 1,
          link_pp: "http://www.readyatdawn.com/privacy-policy/",
          mark_as_read_profile_key_ga: "legal|game_admin_version",
          version_ga: 1,
          text: "By playing Echo VR, you agree to the Echo VR End User License Agreement, Terms of Service, and Privacy Policy contained in the links below.",
          link_vr: "http://www.readyatdawn.com/eula-echo-vr/",
          link_cp: "https://bit.ly/3TMjub6",
          link_ec: "http://www.readyatdawn.com/eula-echo-combat/",
          link_ea: "http://www.readyatdawn.com/eula-echo-arena/",
          lang: "en",
          link_ga: "http://www.readyatdawn.com/game-admins/",
          text_ga: "As a reminder, to ensure the safety of players in Echo VR, Game Admins may remotely monitor and record your gameplay for inappropriate behavior or content. Game Admins may monitor players while they are in any lobby or participating in a match to help maintain an enjoyable in-game environment and ensure the players are following the Echo VR Code of Conduct and Conduct in VR Policy. Note that in certain instances, you may not be aware of a Game Admin's presence. Anyone who does not follow the Rules and the Conduct in VR Policy, may be temporarily banned to keep Echo VR fun and welcoming for all players.",
          link_tc: "http://www.readyatdawn.com/terms-conditions/",
          type: "eula"
        }
    },
    new Uint8Array([0xb1,0x12,0x66,0x3f,0x48,0x3e,0xc3,0xc8,0x3f,0x05,0x00,0x00,0x28,0xb5,0x2f,0xfd,0x60,0x3f,0x04,0xcd,0x14,0x00,0xa6,0x2d,0x7b,0x24,0x20,0x8f,0x9b,0x03,0x07,0x32,0xde,0xd6,0xce,0x2d,0xb2,0xc3,0xa3,0xb6,0x4f,0x23,0xa4,0x2b,0xd8,0x03,0xbd,0xa8,0x97,0x64,0xca,0xea,0x38,0xd0,0x02,0x40,0x4c,0x20,0x01,0x80,0x35,0x02,0x7e,0x00,0x70,0x00,0x67,0x00,0x5e,0x20,0x12,0xde,0x47,0x21,0xd8,0xd1,0x15,0x93,0x39,0x47,0x83,0xf4,0x48,0x90,0xe2,0x30,0x2d,0x02,0xba,0x5a,0x93,0x91,0xb7,0x74,0xd2,0x89,0x38,0xa2,0x5a,0x6c,0x1d,0x23,0xaa,0xa4,0xac,0xe7,0x1c,0x6d,0x55,0x43,0x2b,0xd9,0xc0,0x8c,0x4d,0xfe,0x35,0x2a,0x95,0x8a,0xc3,0xf1,0x70,0x6e,0x11,0x78,0xa4,0x25,0xe9,0x2e,0xe8,0x9d,0x12,0x49,0x16,0xdd,0x82,0xa5,0x73,0x96,0x1e,0x29,0x7e,0x12,0x39,0x5b,0x92,0x7d,0x2e,0xd2,0xe4,0x5f,0x04,0xca,0xc8,0xe4,0x65,0x4b,0x4b,0x72,0x74,0xc1,0xb7,0xee,0x90,0x83,0x86,0x83,0x08,0x44,0x62,0x1f,0x85,0xe0,0x88,0xac,0x01,0x17,0xe3,0x70,0x3c,0x20,0x07,0xe1,0x93,0x1e,0x49,0xa9,0xc8,0x44,0x17,0x4b,0x15,0x01,0x11,0x5e,0x92,0xd0,0x5f,0x04,0xe9,0xbd,0xd0,0xcb,0x7b,0xa3,0xab,0xfd,0x39,0x0d,0x15,0xa4,0xe4,0x80,0x18,0x6f,0xe9,0x38,0xfa,0xf4,0x48,0x8e,0x66,0xea,0x5f,0xe6,0x61,0x32,0x6d,0x95,0x3a,0x01,0x13,0x4d,0x2c,0x40,0x0c,0x38,0xe5,0x78,0x14,0xc6,0x3e,0xea,0x8c,0x64,0xd1,0x1f,0x25,0x35,0x2a,0xcb,0xce,0x18,0x9a,0xe8,0x62,0xba,0xdc,0x5c,0x57,0x42,0x5d,0x65,0x07,0x3b,0xb8,0xd1,0xf4,0x72,0xb5,0x28,0xef,0x0f,0x96,0xac,0xa1,0xf6,0x0e,0xe1,0x05,0xea,0xdb,0xff,0x9c,0x02,0x1f,0xd2,0xab,0xa5,0xe0,0x77,0x28,0xc2,0x8d,0x22,0xf8,0x0f,0xf4,0x42,0xff,0xcf,0x49,0x47,0x1b,0x03,0x09,0xf5,0x4d,0xf7,0x2d,0x8a,0xde,0x6f,0xe9,0x30,0x74,0xf9,0x8c,0xc9,0xb8,0x13,0x7a,0x6b,0x7a,0x65,0xb3,0x63,0x7f,0xbc,0xd0,0x8f,0x82,0xd9,0xec,0xe8,0x82,0xe9,0x96,0x5a,0xf0,0xa5,0xf3,0x5b,0x47,0x86,0x59,0xe6,0xa8,0x69,0x5d,0xfe,0x4b,0x47,0xb6,0x9e,0x4a,0x03,0xea,0xdf,0xfa,0xed,0xa2,0xe4,0x73,0xc6,0x87,0xb9,0x9e,0xdb,0xe7,0x5c,0xea,0xf2,0x5b,0x89,0x63,0x32,0xf7,0x96,0x8e,0x5f,0xb4,0xd1,0xcd,0x5b,0xf5,0xf7,0x16,0x2e,0xdd,0xe6,0xc8,0x0e,0xb7,0xfd,0x39,0x66,0x73,0x81,0xdf,0x32,0xc1,0x8b,0x2e,0x43,0xef,0x92,0x75,0x00,0x17,0x29,0x59,0xf4,0xf4,0x48,0x77,0x71,0x17,0x5c,0x8d,0xae,0x62,0x40,0xed,0x1d,0x2a,0xc8,0x58,0x3a,0xba,0xda,0x2a,0xf6,0x8a,0x46,0x12,0xbb,0x7f,0xe2,0x85,0x6e,0xae,0x9a,0x8c,0x23,0x5b,0x2f,0xdf,0xba,0x76,0xe8,0x33,0xcb,0x1f,0x08,0x9d,0x45,0x10,0xe8,0xdb,0x78,0x9f,0x8a,0xaf,0x1b,0xb5,0xc0,0x8d,0x2b,0x3d,0xf4,0xe7,0x0c,0x05,0xe4,0xcb,0x4a,0xfa,0x8c,0xe1,0xaa,0x63,0x36,0xe8,0x4a,0x13,0x42,0xba,0xde,0x55,0x3e,0xd0,0x87,0xcb,0xe0,0x06,0x44,0xc2,0xba,0x54,0xd4,0xe8,0x1e,0x58,0xb2,0x7e,0xb3,0x07,0x76,0x74,0x55,0x96,0xb1,0x95,0xf8,0x2f,0x44,0x20,0x50,0x22,0x21,0xe4,0x18,0x1f,0xaa,0x92,0xa9,0x0a,0xd4,0x2b,0x3a,0xd4,0x88,0xc6,0x37,0x77,0x9e,0x37,0x12,0x82,0x9f,0x47,0x47,0xb8,0x0b,0x78,0x18,0xa1,0xc6,0x04,0xa7,0x25,0xb4,0x40,0x01,0x02,0xf8,0xe6,0x22,0x8a,0x57,0x67,0x51,0x63,0x6a,0x24,0x05,0x9e,0xdb,0x69,0xdd,0x56,0x72,0x7a,0xbe,0x80,0x10,0x17,0xc8,0x5c,0x6b,0xde,0x9e,0xd0,0x8b,0x8d,0x46,0x90,0xe6,0xe5,0x99,0x21,0x17,0x16,0x6a,0x84,0x15,0x91,0x90,0x92,0xd8,0x24,0x00,0xf9,0x24,0x92,0x8c,0xc0,0xa5,0x1f,0xbb,0x6e,0x3c,0x96,0x57,0x90,0xcb,0x49,0xe8,0x9b,0x56,0x9b,0x0d,0x0d,0x87,0x2d,0x5a,0xad,0xb1,0xe3,0x14,0x37,0x5e,0xcf,0x33,0x2c,0x0e,0x7f,0xeb,0xda,0xd8,0xe0,0xad,0x15,0xd4,0x61,0xe3,0xb3,0x5b,0x46,0x00,0x87,0x61,0xbd,0x3f,0x81,0x5d,0xec,0xbe,0x6e,0xf2,0xbb,0x98,0x86,0x7e,0x40,0xf7,0x50,0xad,0x2e,0xfb,0xef,0x51,0xce,0x62,0xd8,0x56,0x78,0x38,0xec,0x2e,0x3c,0x61,0x09,0x6e,0x06])
  ],
];

for (let i = 0; i < packets.length; i++) {
  const [data, payload] = packets[i];
  // Since compression is wonky, we'll just make sure we can encode and decode into the same data
  Deno.test(`encode SNSDocumentSuccess payload ${i}`, () =>
    assertEquals(
      decodeSNSDocumentSuccessPayload(
        encodeSNSDocumentSuccessPayload(data, true),
        true,
      ),
      data,
    ));
  Deno.test(`decode SNSDocumentSuccess payload ${i}`, () =>
    assertEquals(
      decodeSNSDocumentSuccessPayload(payload, true),
      data,
    ));
}
