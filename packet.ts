import { UintSize, decodeUint } from "./utils/endian.ts";

// Packet format:
// 0 - 7: Constant value, maybe a delimiter of sorts
// 8 - 15: Packet type
// 16 - 23: Packet length (Includes magic number)
// 24 - (23 + length - 1): Packet data (can be empty)
// (23 + length): Magic number

export const constant = decodeUint(
  UintSize.Uint64,
  new Uint8Array([0xf6, 0x40, 0xbb, 0x78, 0xa2, 0xe7, 0x8c, 0xbb])
);

export const headerLookup = {
  magic_packet: decodeUint(
    UintSize.Uint64,
    new Uint8Array([0xe4, 0xee, 0x6b, 0xc7, 0x3a, 0x96, 0xe6, 0x43])
  ),
  config: {
    request: decodeUint(
      UintSize.Uint64,
      new Uint8Array([0x78, 0x43, 0xeb, 0x37, 0x0b, 0x9f, 0x86, 0x82])
    ),
    response: decodeUint(
      UintSize.Uint64,
      new Uint8Array([0x12, 0xd0, 0x7b, 0x6f, 0x58, 0xaf, 0xcd, 0xb9])
    ),
  },
  matchmaker: {
    iplist: decodeUint(
      UintSize.Uint64,
      new Uint8Array([0xf3, 0xeb, 0xbf, 0x19, 0x87, 0x5f, 0xbf, 0xfa])
    ),
  },
} as const;

export const magicNumberLookup = {
  config: {
    magic_packet: 0x04,
    request: 0x00,
  },
  login: {
    magic_packet: 0x4b,
  },
  matchmaking: {},
  transaction: {
    magic_packet: 0x12,
  },
} as const;
