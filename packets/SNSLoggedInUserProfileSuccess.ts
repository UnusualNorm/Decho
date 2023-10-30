import { compress, decompress } from "zstd_wasm";
import { toUint8Array, UintSize } from "../utils/endian.ts";

export const SNSLoggedInUserProfileSuccessHeader = 0x778dfc37503a76fbn;
export const SNSLoggedInUserProfileSuccessBaseLength = 8 + // unknownHeader
  8 + // oculusId
  9; // zstd frame

export interface SNSLoggedInUserProfileSuccessData {
  unknownHeader: bigint;
  oculusId: bigint;
  // TODO: Type this
  // deno-lint-ignore no-explicit-any
  userProfile: Record<string, any>;
}

export const isSNSLoggedInUserProfileSuccessPayload = (
  payload: Uint8Array,
): boolean => payload.byteLength >= SNSLoggedInUserProfileSuccessBaseLength;

export const isSNSLoggedInUserProfileSuccessData = (
  data: unknown,
): data is SNSLoggedInUserProfileSuccessData =>
  typeof data === "object" && data !== null &&
  "unknownHeader" in data && typeof data.unknownHeader === "bigint" &&
  "oculusId" in data && typeof data.oculusId === "bigint" &&
  "userProfile" in data && typeof data.userProfile === "object" &&
  data.userProfile !== null;

const textEncoder = new TextEncoder();
export const encodeSNSLoggedInUserProfileSuccessPayload = (
  data: SNSLoggedInUserProfileSuccessData,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSLoggedInUserProfileSuccessData(data)) {
    throw new Error("Invalid SNSLoggedInUserProfileSuccess data");
  }

  const padding = 0x00;
  const profilePayload = new Uint8Array([
    ...textEncoder.encode(JSON.stringify(data.userProfile)),
    padding,
  ]);
  const compressedProfilePayload = compress(profilePayload);

  const payload = new Uint8Array([
    ...toUint8Array(UintSize.Uint64, data.unknownHeader, true),
    ...toUint8Array(UintSize.Uint64, data.oculusId, true),
    ...toUint8Array(
      UintSize.Uint32,
      BigInt(profilePayload.byteLength),
    ),
    ...compressedProfilePayload,
  ]);

  if (strict && !isSNSLoggedInUserProfileSuccessPayload(payload)) {
    throw new Error("Invalid SNSLoggedInUserProfileSuccess payload");
  }

  return payload;
};

const textDecoder = new TextDecoder();
export const decodeSNSLoggedInUserProfileSuccessPayload = (
  payload: Uint8Array,
  strict: boolean,
): SNSLoggedInUserProfileSuccessData => {
  if (strict && !isSNSLoggedInUserProfileSuccessPayload(payload)) {
    throw new Error("Invalid SNSLoggedInUserProfileSuccess payload");
  }

  const dataView = new DataView(payload.buffer);
  const unknownHeader = dataView.getBigUint64(0);
  const oculusId = dataView.getBigUint64(8);
  const profilePayloadLength = dataView.getUint32(16, true);
  const profilePayload = new Uint8Array(decompress(payload.slice(20)));

  if (profilePayload.byteLength < profilePayloadLength) {
    throw new Error("Invalid SNSLoggedInUserProfileSuccess payload length");
  }

  const userProfile = JSON.parse(
    textDecoder.decode(profilePayload.slice(0, -1)),
  );

  const _padding = profilePayload[profilePayload.length - 1];

  const data: SNSLoggedInUserProfileSuccessData = {
    unknownHeader,
    oculusId,
    userProfile,
  };

  if (strict && !isSNSLoggedInUserProfileSuccessData(data)) {
    throw new Error("Invalid SNSLoggedInUserProfileSuccess data");
  }

  return data;
};
