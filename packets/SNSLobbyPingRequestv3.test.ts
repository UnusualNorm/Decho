import { assertEquals } from "$std/assert/mod.ts";
import {
  decodeSNSLobbyPingRequestv3Payload,
  encodeSNSLobbyPingRequestv3Payload,
  SNSLobbyPingRequestv3Data,
} from "./SNSLobbyPingRequestv3.ts";

// deno-fmt-ignore
const packets: [SNSLobbyPingRequestv3Data, Uint8Array][] = [
  [
    {
      unknownHeader: 4294967558144n,
      servers: [
        {
          privateOctet1: 10,
          privateOctet2: 203,
          privateOctet3: 205,
          privateOctet4: 77,
          publicOctet1: 13,
          publicOctet2: 239,
          publicOctet3: 17,
          publicOctet4: 183,
          port: 36122,
        },
        {
          privateOctet1: 10,
          privateOctet2: 247,
          privateOctet3: 78,
          privateOctet4: 67,
          publicOctet1: 3,
          publicOctet2: 70,
          publicOctet3: 236,
          publicOctet4: 122,
          port: 35098,
        },
        {
          privateOctet1: 10,
          privateOctet2: 247,
          privateOctet3: 69,
          privateOctet4: 12,
          publicOctet1: 3,
          publicOctet2: 75,
          publicOctet3: 191,
          publicOctet4: 159,
          port: 36122,
        },
        {
          privateOctet1: 10,
          privateOctet2: 247,
          privateOctet3: 94,
          privateOctet4: 108,
          publicOctet1: 54,
          publicOctet2: 93,
          publicOctet3: 55,
          publicOctet4: 75,
          port: 35354,
        },
        {
          privateOctet1: 10,
          privateOctet2: 245,
          privateOctet3: 94,
          privateOctet4: 216,
          publicOctet1: 13,
          publicOctet2: 214,
          publicOctet3: 193,
          publicOctet4: 255,
          port: 35354,
        },
        {
          privateOctet1: 10,
          privateOctet2: 74,
          privateOctet3: 142,
          privateOctet4: 25,
          publicOctet1: 3,
          publicOctet2: 9,
          publicOctet3: 135,
          publicOctet4: 241,
          port: 36122,
        },
        {
          privateOctet1: 10,
          privateOctet2: 74,
          privateOctet3: 133,
          privateOctet4: 93,
          publicOctet1: 3,
          publicOctet2: 9,
          publicOctet3: 177,
          publicOctet4: 121,
          port: 35610,
        },
        {
          privateOctet1: 10,
          privateOctet2: 74,
          privateOctet3: 151,
          privateOctet4: 203,
          publicOctet1: 35,
          publicOctet2: 176,
          publicOctet3: 139,
          publicOctet4: 81,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 74,
          privateOctet3: 139,
          privateOctet4: 132,
          publicOctet1: 18,
          publicOctet2: 133,
          publicOctet3: 228,
          publicOctet4: 194,
          port: 35354,
        },
        {
          privateOctet1: 10,
          privateOctet2: 242,
          privateOctet3: 194,
          privateOctet4: 124,
          publicOctet1: 54,
          publicOctet2: 95,
          publicOctet3: 38,
          publicOctet4: 194,
          port: 36122,
        },
        {
          privateOctet1: 10,
          privateOctet2: 43,
          privateOctet3: 220,
          privateOctet4: 111,
          publicOctet1: 13,
          publicOctet2: 56,
          publicOctet3: 230,
          publicOctet4: 234,
          port: 35098,
        },
        {
          privateOctet1: 10,
          privateOctet2: 43,
          privateOctet3: 213,
          privateOctet4: 79,
          publicOctet1: 3,
          publicOctet2: 101,
          publicOctet3: 86,
          publicOctet4: 67,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 43,
          privateOctet3: 204,
          privateOctet4: 87,
          publicOctet1: 54,
          publicOctet2: 183,
          publicOctet3: 222,
          publicOctet4: 46,
          port: 35866,
        },
        {
          privateOctet1: 10,
          privateOctet2: 43,
          privateOctet3: 216,
          privateOctet4: 230,
          publicOctet1: 3,
          publicOctet2: 101,
          publicOctet3: 190,
          publicOctet4: 3,
          port: 35354,
        },
        {
          privateOctet1: 10,
          privateOctet2: 1,
          privateOctet3: 105,
          privateOctet4: 127,
          publicOctet1: 54,
          publicOctet2: 166,
          publicOctet3: 228,
          publicOctet4: 104,
          port: 35610,
        },
        {
          privateOctet1: 10,
          privateOctet2: 1,
          privateOctet3: 71,
          privateOctet4: 131,
          publicOctet1: 44,
          publicOctet2: 204,
          publicOctet3: 7,
          publicOctet4: 27,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 1,
          privateOctet3: 86,
          privateOctet4: 18,
          publicOctet1: 18,
          publicOctet2: 215,
          publicOctet3: 162,
          publicOctet4: 44,
          port: 35610,
        },
        {
          privateOctet1: 10,
          privateOctet2: 1,
          privateOctet3: 78,
          privateOctet4: 161,
          publicOctet1: 44,
          publicOctet2: 202,
          publicOctet3: 67,
          publicOctet4: 252,
          port: 35354,
        },
        {
          privateOctet1: 10,
          privateOctet2: 160,
          privateOctet3: 64,
          privateOctet4: 247,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 199,
          publicOctet4: 51,
          port: 36122,
        },
        {
          privateOctet1: 10,
          privateOctet2: 160,
          privateOctet3: 64,
          privateOctet4: 246,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 199,
          publicOctet4: 131,
          port: 35098,
        },
        {
          privateOctet1: 10,
          privateOctet2: 160,
          privateOctet3: 73,
          privateOctet4: 226,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 199,
          publicOctet4: 212,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 160,
          privateOctet3: 70,
          privateOctet4: 176,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 201,
          publicOctet4: 85,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 100,
          privateOctet3: 205,
          privateOctet4: 101,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 178,
          publicOctet4: 17,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 100,
          privateOctet3: 192,
          privateOctet4: 220,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 177,
          publicOctet4: 207,
          port: 35354,
        },
        {
          privateOctet1: 10,
          privateOctet2: 100,
          privateOctet3: 200,
          privateOctet4: 10,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 177,
          publicOctet4: 100,
          port: 35610,
        },
        {
          privateOctet1: 10,
          privateOctet2: 100,
          privateOctet3: 193,
          privateOctet4: 170,
          publicOctet1: 15,
          publicOctet2: 181,
          publicOctet3: 181,
          publicOctet4: 175,
          port: 34842,
        },
        {
          privateOctet1: 10,
          privateOctet2: 148,
          privateOctet3: 4,
          privateOctet4: 236,
          publicOctet1: 72,
          publicOctet2: 41,
          publicOctet3: 0,
          publicOctet4: 51,
          port: 35610,
        },
        {
          privateOctet1: 10,
          privateOctet2: 148,
          privateOctet3: 6,
          privateOctet4: 87,
          publicOctet1: 72,
          publicOctet2: 41,
          publicOctet3: 0,
          publicOctet4: 170,
          port: 35866,
        },
        {
          privateOctet1: 10,
          privateOctet2: 148,
          privateOctet3: 6,
          privateOctet4: 75,
          publicOctet1: 72,
          publicOctet2: 41,
          publicOctet3: 0,
          publicOctet4: 135,
          port: 36122,
        },
        {
          privateOctet1: 10,
          privateOctet2: 148,
          privateOctet3: 3,
          privateOctet4: 45,
          publicOctet1: 72,
          publicOctet2: 41,
          publicOctet3: 0,
          publicOctet4: 193,
          port: 35354,
        },
      ],
    },
    new Uint8Array([0x00,0x00,0x04,0x00,0xe8,0x03,0x00,0x00,0x0a,0xcb,0xcd,0x4d,0x0d,0xef,0x11,0xb7,0x1a,0x8d,0x00,0x00,0x0a,0xf7,0x4e,0x43,0x03,0x46,0xec,0x7a,0x1a,0x89,0x00,0x00,0x0a,0xf7,0x45,0x0c,0x03,0x4b,0xbf,0x9f,0x1a,0x8d,0x00,0x00,0x0a,0xf7,0x5e,0x6c,0x36,0x5d,0x37,0x4b,0x1a,0x8a,0x00,0x00,0x0a,0xf5,0x5e,0xd8,0x0d,0xd6,0xc1,0xff,0x1a,0x8a,0x00,0x00,0x0a,0x4a,0x8e,0x19,0x03,0x09,0x87,0xf1,0x1a,0x8d,0x00,0x00,0x0a,0x4a,0x85,0x5d,0x03,0x09,0xb1,0x79,0x1a,0x8b,0x00,0x00,0x0a,0x4a,0x97,0xcb,0x23,0xb0,0x8b,0x51,0x1a,0x88,0x00,0x00,0x0a,0x4a,0x8b,0x84,0x12,0x85,0xe4,0xc2,0x1a,0x8a,0x00,0x00,0x0a,0xf2,0xc2,0x7c,0x36,0x5f,0x26,0xc2,0x1a,0x8d,0x00,0x00,0x0a,0x2b,0xdc,0x6f,0x0d,0x38,0xe6,0xea,0x1a,0x89,0x00,0x00,0x0a,0x2b,0xd5,0x4f,0x03,0x65,0x56,0x43,0x1a,0x88,0x00,0x00,0x0a,0x2b,0xcc,0x57,0x36,0xb7,0xde,0x2e,0x1a,0x8c,0x00,0x00,0x0a,0x2b,0xd8,0xe6,0x03,0x65,0xbe,0x03,0x1a,0x8a,0x00,0x00,0x0a,0x01,0x69,0x7f,0x36,0xa6,0xe4,0x68,0x1a,0x8b,0x00,0x00,0x0a,0x01,0x47,0x83,0x2c,0xcc,0x07,0x1b,0x1a,0x88,0x00,0x00,0x0a,0x01,0x56,0x12,0x12,0xd7,0xa2,0x2c,0x1a,0x8b,0x00,0x00,0x0a,0x01,0x4e,0xa1,0x2c,0xca,0x43,0xfc,0x1a,0x8a,0x00,0x00,0x0a,0xa0,0x40,0xf7,0x0f,0xb5,0xc7,0x33,0x1a,0x8d,0x00,0x00,0x0a,0xa0,0x40,0xf6,0x0f,0xb5,0xc7,0x83,0x1a,0x89,0x00,0x00,0x0a,0xa0,0x49,0xe2,0x0f,0xb5,0xc7,0xd4,0x1a,0x88,0x00,0x00,0x0a,0xa0,0x46,0xb0,0x0f,0xb5,0xc9,0x55,0x1a,0x88,0x00,0x00,0x0a,0x64,0xcd,0x65,0x0f,0xb5,0xb2,0x11,0x1a,0x88,0x00,0x00,0x0a,0x64,0xc0,0xdc,0x0f,0xb5,0xb1,0xcf,0x1a,0x8a,0x00,0x00,0x0a,0x64,0xc8,0x0a,0x0f,0xb5,0xb1,0x64,0x1a,0x8b,0x00,0x00,0x0a,0x64,0xc1,0xaa,0x0f,0xb5,0xb5,0xaf,0x1a,0x88,0x00,0x00,0x0a,0x94,0x04,0xec,0x48,0x29,0x00,0x33,0x1a,0x8b,0x00,0x00,0x0a,0x94,0x06,0x57,0x48,0x29,0x00,0xaa,0x1a,0x8c,0x00,0x00,0x0a,0x94,0x06,0x4b,0x48,0x29,0x00,0x87,0x1a,0x8d,0x00,0x00,0x0a,0x94,0x03,0x2d,0x48,0x29,0x00,0xc1,0x1a,0x8a,0x00,0x00])
  ],
];

for (let i = 0; i < packets.length; i++) {
  const [data, payload] = packets[i];
  Deno.test(`encode SNSLobbyPingRequestv3 payload ${i}`, () =>
    assertEquals(
      new Uint8Array(encodeSNSLobbyPingRequestv3Payload(data, true)),
      payload,
    ));

  Deno.test(`decode SNSLobbyPingRequestv3 payload ${i}`, () =>
    assertEquals(
      decodeSNSLobbyPingRequestv3Payload(payload, true),
      data,
    ));
}