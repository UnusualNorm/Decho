import { decodeUint, UintSize } from "./utils/endian.ts";

export const matchMakerTestHeader = decodeUint(
  UintSize.Uint64,
  new Uint8Array([0xf5, 0xa3, 0x9a, 0x81, 0x01, 0x2a, 0x2c, 0x31]),
);

export const matchMakerTest2Header = decodeUint(
  UintSize.Uint64,
  new Uint8Array([0x4f, 0xae, 0x33, 0x30, 0x04, 0xd0, 0x47, 0x60]),
);
export const matchMakerTest2 = [
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0x0e,
    0x11,
    0xe3,
    0x0e,
    0x65,
    0xe3,
    0x4d,
    0x6d,
    0x08,
    0x01,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x76,
    0xcf,
    0xdd,
    0xcf,
    0xf9,
    0x9c,
    0x2d,
    0x04,
    0x4a,
    0xb4,
    0x56,
    0x15,
    0xd4,
    0x03,
    0xea,
    0x4b,
    0xbf,
    0xf7,
    0x3b,
    0xcc,
    0x25,
    0x67,
    0x3b,
    0x85,
    0x0a,
    0x2b,
    0xdc,
    0x6f,
    127,
    0,
    0,
    1,
    0x1a,
    0x89,
    0xff,
    0xff,
    0x00,
    0x00,
    0x00,
    0x00,
    0x83,
    0x00,
    0x00,
    0x80,
    0x00,
    0x08,
    0x80,
    0x00,
    0x03,
    0x01,
    0x00,
    0x80,
    0x00,
    0x08,
    0x80,
    0x00,
    0x63,
    0xdc,
    0x51,
    0xbc,
    0x82,
    0x28,
    0x59,
    0x80,
    0x1a,
    0x2b,
    0xd7,
    0x22,
    0x96,
    0xa8,
    0x30,
    0x09,
    0x9f,
    0x30,
    0xc0,
    0x8b,
    0x99,
    0x84,
    0x8b,
    0xd4,
    0x75,
    0xee,
    0xaf,
    0x7d,
    0xa1,
    0x28,
    0xdc,
    0xd7,
    0x4e,
    0x29,
    0xf4,
    0x3a,
    0x22,
    0x88,
    0x57,
    0x50,
    0x73,
    0x43,
    0x42,
    0x00,
    0xaa,
    0x4a,
    0xa8,
    0xb6,
    0xbd,
    0xde,
    0x00,
    0x69,
    0x8c,
    0x06,
    0x44,
    0xcb,
    0x4b,
    0x88,
    0xeb,
    0xf3,
    0xbd,
    0xdb,
    0xce,
    0x07,
    0x15,
    0xd4,
    0xd0,
    0x87,
    0xb0,
    0x25,
    0x43,
    0x52,
    0x45,
    0x70,
    0x82,
    0xac,
    0xd7,
    0xe7,
    0xa4,
    0xb9,
    0x7c,
    0x9b,
    0x19,
    0x0e,
    0x0d,
    0x77,
    0x8a,
    0x69,
    0x73,
    0xb3,
    0x94,
    0xbe,
    0x14,
    0xe3,
    0xcd,
    0x9e,
    0xe8,
    0xaf,
    0xa4,
    0xe6,
    0xa0,
    0xa2,
    0x51,
    0x80,
    0xc3,
    0x87,
    0xcd,
    0xca,
    0x80,
    0xe4,
    0x5c,
    0x7f,
    0xb0,
    0x31,
    0xdb,
    0x03,
    0x5a,
    0x2f,
    0x0f,
    0x61,
    0x1a,
    0x39,
    0x34,
    0xef,
    0xb8,
    0xb7,
    0x34,
    0xe0,
    0x3d,
    0xb6,
    0x6f,
    0x8e,
    0x9e,
    0xe5,
    0xc8,
    0x13,
    0x82,
    0x71,
    0xe2,
    0x0e,
    0xdf,
    0xa8,
    0x53,
    0x14,
    0x8b,
    0x5c,
    0x03,
    0x7e,
    0x6e,
    0xf4,
    0xff,
    0xc4,
    0x48,
    0xb9,
    0x21,
    0x7c,
    0x0b,
    0x9d,
    0xe4,
    0x5a,
    0x60,
    0xa5,
    0x9f,
    0x07,
    0x65,
    0xd5,
    0x11,
    0xd1,
    0x26,
    0x91,
    0x1f,
    0x70,
    0x2a,
    0x5e,
    0x68,
    0x8b,
    0xb4,
    0x38,
    0xa6,
    0x1b,
    0xb3,
    0x73,
    0x51,
    0xfe,
    0x59,
    0x01,
    0x6e,
    0x0e,
    0xd7,
    0xd9,
    0xe7,
    0x5d,
    0x1d,
    0xa6,
    0xa1,
    0x06,
    0x75,
    0xf4,
    0x8a,
    0x18,
    0xf2,
    0x0a,
    0x58,
    0xe9,
    0x4c,
    0xac,
    0xda,
    0x4e,
  ]),
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0x0f,
    0x11,
    0xe3,
    0x0e,
    0x65,
    0xe3,
    0x4d,
    0x6d,
    0x18,
    0x01,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x76,
    0xcf,
    0xdd,
    0xcf,
    0xf9,
    0x9c,
    0x2d,
    0x04,
    0x4a,
    0xb4,
    0x56,
    0x15,
    0xd4,
    0x03,
    0xea,
    0x4b,
    0xbf,
    0xf7,
    0x3b,
    0xcc,
    0x25,
    0x67,
    0x3b,
    0x85,
    0xdf,
    0x48,
    0x9c,
    0xdd,
    0x95,
    0xc4,
    0xf3,
    0x4e,
    0xb3,
    0x17,
    0x4f,
    0xd6,
    0x36,
    0x4f,
    0x32,
    0x9d,
    127,
    0,
    0,
    1,
    127,
    0,
    0,
    1,
    0x1a,
    0x89,
    0xff,
    0xff,
    0x00,
    0x00,
    0x00,
    0x00,
    0x83,
    0x00,
    0x00,
    0x80,
    0x00,
    0x08,
    0x80,
    0x00,
    0x03,
    0x01,
    0x00,
    0x80,
    0x00,
    0x08,
    0x80,
    0x00,
    0x63,
    0xdc,
    0x51,
    0xbc,
    0x82,
    0x28,
    0x59,
    0x80,
    0x1a,
    0x2b,
    0xd7,
    0x22,
    0x96,
    0xa8,
    0x30,
    0x09,
    0x9f,
    0x30,
    0xc0,
    0x8b,
    0x99,
    0x84,
    0x8b,
    0xd4,
    0x75,
    0xee,
    0xaf,
    0x7d,
    0xa1,
    0x28,
    0xdc,
    0xd7,
    0x4e,
    0x29,
    0xf4,
    0x3a,
    0x22,
    0x88,
    0x57,
    0x50,
    0x73,
    0x43,
    0x42,
    0x00,
    0xaa,
    0x4a,
    0xa8,
    0xb6,
    0xbd,
    0xde,
    0x00,
    0x69,
    0x8c,
    0x06,
    0x44,
    0xcb,
    0x4b,
    0x88,
    0xeb,
    0xf3,
    0xbd,
    0xdb,
    0xce,
    0x07,
    0x15,
    0xd4,
    0xd0,
    0x87,
    0xb0,
    0x25,
    0x43,
    0x52,
    0x45,
    0x70,
    0x82,
    0xac,
    0xd7,
    0xe7,
    0xa4,
    0xb9,
    0x7c,
    0x9b,
    0x19,
    0x0e,
    0x0d,
    0x77,
    0x8a,
    0x69,
    0x73,
    0xb3,
    0x94,
    0xbe,
    0x14,
    0xe3,
    0xcd,
    0x9e,
    0xe8,
    0xaf,
    0xa4,
    0xe6,
    0xa0,
    0xa2,
    0x51,
    0x80,
    0xc3,
    0x87,
    0xcd,
    0xca,
    0x80,
    0xe4,
    0x5c,
    0x7f,
    0xb0,
    0x31,
    0xdb,
    0x03,
    0x5a,
    0x2f,
    0x0f,
    0x61,
    0x1a,
    0x39,
    0x34,
    0xef,
    0xb8,
    0xb7,
    0x34,
    0xe0,
    0x3d,
    0xb6,
    0x6f,
    0x8e,
    0x9e,
    0xe5,
    0xc8,
    0x13,
    0x82,
    0x71,
    0xe2,
    0x0e,
    0xdf,
    0xa8,
    0x53,
    0x14,
    0x8b,
    0x5c,
    0x03,
    0x7e,
    0x6e,
    0xf4,
    0xff,
    0xc4,
    0x48,
    0xb9,
    0x21,
    0x7c,
    0x0b,
    0x9d,
    0xe4,
    0x5a,
    0x60,
    0xa5,
    0x9f,
    0x07,
    0x65,
    0xd5,
    0x11,
    0xd1,
    0x26,
    0x91,
    0x1f,
    0x70,
    0x2a,
    0x5e,
    0x68,
    0x8b,
    0xb4,
    0x38,
    0xa6,
    0x1b,
    0xb3,
    0x73,
    0x51,
    0xfe,
    0x59,
    0x01,
    0x6e,
    0x0e,
    0xd7,
    0xd9,
    0xe7,
    0x5d,
    0x1d,
    0xa6,
    0xa1,
    0x06,
    0x75,
    0xf4,
    0x8a,
    0x18,
    0xf2,
    0x0a,
    0x58,
    0xe9,
    0x4c,
    0xac,
    0xda,
    0x4e,
  ]),
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0xe4,
    0xee,
    0x6b,
    0xc7,
    0x3a,
    0x96,
    0xe6,
    0x43,
    0x01,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x1a,
  ]),
];

export const matchMakerTest3Header = decodeUint(
  UintSize.Uint64,
  new Uint8Array([0x05, 0x1a, 0xc8, 0xa0, 0xb2, 0xfa, 0xf2, 0x9a]),
  //   new Uint8Array([0x50, 0xb6, 0xeb, 0xe0, 0x7a, 0x77, 0x8b, 0x12])
);
export const matchMakerTest3 = [
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0xd9,
    0xfb,
    0xe0,
    0xf7,
    0x6a,
    0x85,
    0x71,
    0xff,
    0x28,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x01,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x4a,
    0xb4,
    0x56,
    0x15,
    0xd4,
    0x03,
    0xea,
    0x4b,
    0xbf,
    0xf7,
    0x3b,
    0xcc,
    0x25,
    0x67,
    0x3b,
    0x85,
    0x04,
    0x96,
    0x90,
    0xbc,
    0x90,
    0x35,
    0x87,
    0x4d,
    0x9c,
    0xcb,
    0x3b,
    0x4a,
    0x9c,
    0x46,
    0x3a,
    0xbe,
  ]),
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0x68,
    0x89,
    0x58,
    0xf8,
    0xe1,
    0xca,
    0xb9,
    0xa1,
    0x21,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xff,
    0x04,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xb3,
    0x6a,
    0x9d,
    0x3d,
    0xf6,
    0xe3,
    0x0d,
    0x00,
    0x04,
    0x96,
    0x90,
    0xbc,
    0x90,
    0x35,
    0x87,
    0x4d,
    0x9c,
    0xcb,
    0x3b,
    0x4a,
    0x9c,
    0x46,
    0x3a,
    0xbe,
  ]),
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0x69,
    0x89,
    0x58,
    0xf8,
    0xe1,
    0xca,
    0xb9,
    0xa1,
    0x29,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xff,
    0x04,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0xb3,
    0x6a,
    0x9d,
    0x3d,
    0xf6,
    0xe3,
    0x0d,
    0x00,
    0x04,
    0x96,
    0x90,
    0xbc,
    0x90,
    0x35,
    0x87,
    0x4d,
    0x9c,
    0xcb,
    0x3b,
    0x4a,
    0x9c,
    0x46,
    0x3a,
    0xbe,
    0xff,
    0xff,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
  ]),
  new Uint8Array([
    0xf6,
    0x40,
    0xbb,
    0x78,
    0xa2,
    0xe7,
    0x8c,
    0xbb,
    0xe4,
    0xee,
    0x6b,
    0xc7,
    0x3a,
    0x96,
    0xe6,
    0x43,
    0x01,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x30,
  ]),
];
