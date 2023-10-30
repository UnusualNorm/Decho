import { assertEquals } from "$std/assert/mod.ts";
import {
  decodeSNSLoginSettingsPayload,
  encodeSNSLoginSettingsPayload,
  SNSLoginSettingsData,
} from "./SNSLoginSettings.ts";

// deno-fmt-ignore
const packets: [SNSLoginSettingsData, Uint8Array][] = [
  [
    {
      config_data: {
        "active_battle_pass_season": {
          "endtime":2236881600,
          "id":"battle_pass_season_00_invalid",
          "starttime":1577908800
        },
        "active_store_entry": {
          "endtime":1690911000,
          "id":"store_entry_0036",
          "starttime":1675103401
        },
        "active_store_featured_entry": {
          "endtime":1690911001,
          "id":"store_featured_entry_0013",
          "starttime":1675103402
        }
      },
      "env":"live",
      "iap_unlocked":true,
      "match_type_specific_matchmakers": {
        "ai": {
          "host_suffix": "ai",
          "match_types": [
            "echo_arena_public_ai"
          ],
          "queue_id": "1004"
        },
        "arena": {
          "host_suffix": "arena",
          "match_types": [
            "echo_arena"
          ],
          "queue_id": "1003"
        },
        "combat": {
        "host_suffix":"combat","match_types":["echo_combat"],"queue_id":"1002"},"social":{"host_suffix":"social","match_types":["social_2.0"],"queue_id":"1001"}},"matchmaker_queue_mode":"disabled","remote_log_errors":false,"remote_log_metrics":true,"remote_log_rich_presence":false,"remote_log_richpresence":false,"remote_log_social":false,"remote_log_warnings":false,"skip_combat_entitlement_checks":true},
    new Uint8Array([0xc6,0x03,0x00,0x00,0x00,0x00,0x00,0x00,0x78,0x9c,0x7d,0x92,0xdd,0x6e,0xa3,0x30,0x10,0x85,0xdf,0xc5,0xd7,0xd1,0xca,0x86,0x96,0xfc,0xbc,0xca,0x6a,0x35,0x9a,0x98,0x21,0x8c,0x62,0x6c,0xd6,0x36,0xd9,0xad,0x2a,0xde,0xbd,0x36,0x49,0xd3,0xa4,0x66,0xf7,0x06,0xa4,0x73,0x86,0xef,0x1c,0x33,0x7e,0x17,0x8c,0x23,0x4c,0xd6,0x38,0x7d,0xa6,0x56,0x1c,0xa2,0x9f,0x68,0x23,0x3c,0x0d,0x2e,0x12,0x18,0x77,0x82,0x3f,0xe8,0x2d,0xdb,0x53,0x10,0x87,0x0e,0x4d,0x78,0xf6,0x82,0xd3,0x8c,0xe6,0xee,0x0c,0x18,0x75,0x0f,0xf1,0x6d,0x24,0x08,0x23,0x69,0xee,0x58,0xc3,0xa2,0x0d,0x78,0x26,0x9f,0x08,0xef,0x02,0x39,0x3f,0x7b,0x17,0x22,0x84,0xa9,0xeb,0xf8,0xaf,0x38,0x64,0xed,0xf1,0xdb,0x34,0xf7,0x53,0x90,0xee,0x1d,0xa0,0x27,0x8b,0x30,0x4e,0x47,0x93,0x40,0x69,0xea,0xd7,0x46,0xfc,0x9e,0x68,0x22,0xe0,0x54,0x54,0x28,0x29,0x5f,0xc4,0xbc,0x11,0xcb,0xd4,0x0a,0x75,0x91,0xff,0x03,0x2e,0x71,0x75,0xc6,0x7d,0x9e,0xe9,0x3b,0xef,0xa6,0x17,0xc0,0xab,0x0e,0xd5,0x0f,0x59,0x02,0x55,0x06,0x6a,0x37,0x1c,0x31,0x96,0xc0,0x9b,0xbe,0xde,0xf0,0x66,0x16,0xc4,0x4a,0xcc,0xf3,0xd3,0x0a,0x06,0x8a,0x9e,0x75,0x58,0x59,0x5c,0x92,0x7b,0x18,0x3d,0x05,0xb2,0x9a,0xee,0x3b,0x22,0x7b,0x49,0x24,0xc3,0x17,0xfa,0x4c,0x5e,0x96,0x03,0xd7,0x98,0xc1,0xb5,0x69,0x54,0xb4,0x1c,0xf0,0x68,0xd2,0x75,0x28,0x80,0x05,0x2f,0x9c,0x79,0xbc,0xb5,0x05,0xb2,0x91,0xa3,0xa1,0x21,0xbd,0x41,0xf7,0xa4,0xcf,0x6b,0xb5,0xc8,0x7b,0xe7,0xbf,0x6e,0x93,0x76,0xb6,0xe3,0x13,0xb4,0x18,0x97,0x1d,0xa2,0x8e,0xa9,0x1a,0x24,0x5a,0x02,0xc1,0x88,0x21,0x40,0x20,0x0c,0xce,0x66,0x73,0xf9,0x09,0xa5,0x05,0x52,0x02,0xdb,0x0b,0x1a,0xce,0x85,0x43,0x44,0x1f,0x23,0x0f,0xa9,0xa2,0x7a,0xdd,0x6e,0xf7,0x72,0xb7,0x93,0x32,0x9f,0xbb,0xbd,0x8a,0x55,0x55,0x37,0xbb,0x9d,0x6a,0xa4,0xcc,0x77,0xe7,0x1a,0x17,0xa2,0xf3,0x94,0xeb,0xfb,0xb7,0x7b,0xce,0x83,0x96,0x02,0xea,0xe6,0x1b,0xba,0xd9,0xbe,0x2a,0x59,0xbf,0x48,0xf5,0x80,0x56,0xcd,0x5e,0xee,0x55,0xda,0x52,0x81,0xee,0x08,0xe3,0xe4,0xa9,0x5d,0xcd,0x78,0x36,0x53,0x98,0xaa,0xff,0x11,0x56,0xad,0x85,0xa9,0x79,0x9e,0x3f,0x00,0x5c,0xf0,0x4f,0xce])
  ],
];

for (let i = 0; i < packets.length; i++) {
  const [data, payload] = packets[i];
  // Since compression is wonky, we'll just make sure we can encode and decode into the same data
  Deno.test(`encode SNSLoginSettings payload ${i}`, () =>
    assertEquals(
      decodeSNSLoginSettingsPayload(
        encodeSNSLoginSettingsPayload(data, true),
        true,
      ),
      data,
    ));
  Deno.test(`decode SNSLoginSettings payload ${i}`, () =>
    assertEquals(
      decodeSNSLoginSettingsPayload(payload, true),
      data,
    ));
}