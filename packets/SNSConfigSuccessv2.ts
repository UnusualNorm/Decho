import type { Config } from "../types/config.ts";
import { isConfig } from "../types/config.ts";

import { compress, decompress, init } from "zstd_wasm";
import { toUint8Array } from "../utils/endian.ts";
import { UintSize } from "../utils/endian.ts";

await init();

export const SNSConfigSuccessv2Header = 0x12d07b6f58afcdb9n;
export const SNSConfigSuccessv2BaseLength = 8 + // type
  8 + // id
  4 + // length
  9 + // zstd frame
  1; // padding

export type SNSConfigSuccessv2Data = {
  type: bigint; // 64-bit - first byte ignored (nonce)
  id: bigint; // 64-bit
  config: Config;
};

export const isSNSConfigSuccessv2Payload = (
  payload: Uint8Array,
): boolean => payload.byteLength >= SNSConfigSuccessv2BaseLength;

export const isSNSConfigSuccessv2Data = (
  data: unknown,
): data is SNSConfigSuccessv2Data =>
  typeof data === "object" && data !== null &&
  "type" in data && typeof data.type === "bigint" &&
  "id" in data && typeof data.id === "bigint" &&
  "config" in data && isConfig(data.config);

const textEncoder = new TextEncoder();
export const encodeSNSConfigSuccessv2Payload = (
  data: SNSConfigSuccessv2Data,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSConfigSuccessv2Data(data)) {
    throw new Error("Invalid SNSConfigSuccessv2 data");
  }

  const padding = 0x00;
  const configPayload = new Uint8Array([
    ...textEncoder.encode(JSON.stringify(data.config)),
    padding,
  ]);
  const compressedConfigPayload = compress(configPayload);

  const payload = new Uint8Array([
    ...toUint8Array(UintSize.Uint64, data.type, true),
    ...toUint8Array(UintSize.Uint64, data.id, true),
    ...toUint8Array(
      UintSize.Uint32,
      BigInt(configPayload.byteLength),
    ),
    ...compressedConfigPayload,
  ]);

  if (strict && !isSNSConfigSuccessv2Payload(payload)) {
    throw new Error("Invalid SNSConfigSuccessv2 payload");
  }

  return payload;
};

const textDecoder = new TextDecoder();
export const decodeSNSConfigSuccessv2Payload = (
  payload: Uint8Array,
  strict: boolean,
): SNSConfigSuccessv2Data => {
  if (strict && !isSNSConfigSuccessv2Payload(payload)) {
    throw new Error("Invalid SNSConfigSuccessv2 payload");
  }

  const dataView = new DataView(payload.buffer);
  const type = dataView.getBigUint64(0);
  const id = dataView.getBigUint64(8);
  const configPayloadLength = dataView.getUint32(16, true);
  const configPayload = new Uint8Array(decompress(
    payload.slice(20),
  ));

  if (configPayload.byteLength < configPayloadLength) {
    throw new Error("Invalid SNSConfigSuccessv2 payload length");
  }

  const config = JSON.parse(
    textDecoder.decode(configPayload.slice(0, -1)),
  );
  const _padding = configPayload[configPayload.length - 1];

  const data: SNSConfigSuccessv2Data = {
    type,
    id,
    config,
  };

  if (strict && !isSNSConfigSuccessv2Data(data)) {
    throw new Error("Invalid SNSConfigSuccessv2 data");
  }

  return data;
};
