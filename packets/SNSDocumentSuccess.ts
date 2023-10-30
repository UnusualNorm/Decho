import { compress, decompress } from "zstd_wasm";
import { toUint8Array, UintSize } from "../utils/endian.ts";
import { PrEfIxeula } from "../types/document.ts";

export const SNSDocumentSuccessHeader = 0x09b5b72f78fd7fd0n;
export const SNSDocumentSuccessBaseLength = 8 + // prefix
  9; // zstd frame

export type SNSDocumentSuccessData = {
  prefix: typeof PrEfIxeula;
  document: {
    link_cc: string;
    mark_as_read_profile_key: string;
    version: number;
    link_pp: string;
    mark_as_read_profile_key_ga: string;
    version_ga: number;
    text: string;
    link_vr: string;
    link_cp: string;
    link_ec: string;
    link_ea: string;
    lang: string;
    link_ga: string;
    text_ga: string;
    link_tc: string;
    type: string;
  };
};

export const isSNSDocumentSuccessPayload = (
  payload: Uint8Array,
): boolean => payload.byteLength >= SNSDocumentSuccessBaseLength;

export const isSNSDocumentSuccessData = (
  data: unknown,
): data is SNSDocumentSuccessData => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (!("prefix" in data) || typeof data.prefix !== "bigint") {
    return false;
  }

  if (
    !("document" in data) || typeof data.document !== "object" ||
    data.document === null
  ) {
    return false;
  }

  switch (data.prefix) {
    case PrEfIxeula:
      return (
        "link_cc" in data.document &&
        typeof data.document.link_cc === "string" &&
        "mark_as_read_profile_key" in data.document &&
        typeof data.document.mark_as_read_profile_key === "string" &&
        "version" in data.document &&
        typeof data.document.version === "number" &&
        "link_pp" in data.document &&
        typeof data.document.link_pp === "string" &&
        "mark_as_read_profile_key_ga" in data.document &&
        typeof data.document.mark_as_read_profile_key_ga === "string" &&
        "version_ga" in data.document &&
        typeof data.document.version_ga === "number" &&
        "text" in data.document && typeof data.document.text === "string" &&
        "link_vr" in data.document &&
        typeof data.document.link_vr === "string" &&
        "link_cp" in data.document &&
        typeof data.document.link_cp === "string" &&
        "link_ec" in data.document &&
        typeof data.document.link_ec === "string" &&
        "link_ea" in data.document &&
        typeof data.document.link_ea === "string" &&
        "lang" in data.document && typeof data.document.lang === "string" &&
        "link_ga" in data.document &&
        typeof data.document.link_ga === "string" &&
        "text_ga" in data.document &&
        typeof data.document.text_ga === "string" &&
        "link_tc" in data.document &&
        typeof data.document.link_tc === "string" &&
        "type" in data.document && typeof data.document.type === "string"
      );
    default:
      return false;
  }
};

const textEncoder = new TextEncoder();
export const encodeSNSDocumentSuccessPayload = (
  data: SNSDocumentSuccessData,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSDocumentSuccessData(data)) {
    throw new Error("Invalid SNSDocumentSuccess data");
  }

  const padding = 0x00;
  const documentPayload = new Uint8Array([
    ...textEncoder.encode(JSON.stringify(data.document)),
    padding,
  ]);
  const compressedDocumentPayload = compress(documentPayload);

  const payload = new Uint8Array([
    ...toUint8Array(UintSize.Uint64, data.prefix, true),
    ...toUint8Array(
      UintSize.Uint32,
      BigInt(documentPayload.byteLength),
    ),
    ...compressedDocumentPayload,
  ]);

  if (strict && !isSNSDocumentSuccessPayload(payload)) {
    throw new Error("Invalid SNSDocumentSuccess payload");
  }

  return payload;
};

const textDecoder = new TextDecoder();
export const decodeSNSDocumentSuccessPayload = (
  payload: Uint8Array,
  strict: boolean,
): SNSDocumentSuccessData => {
  if (strict && !isSNSDocumentSuccessPayload(payload)) {
    throw new Error("Invalid SNSDocumentSuccess payload");
  }

  const dataView = new DataView(payload.buffer);
  const prefix = dataView.getBigUint64(0);
  const documentPayloadLength = dataView.getUint32(8, true);
  const documentPayload = new Uint8Array(decompress(payload.slice(12)));

  if (documentPayload.byteLength < documentPayloadLength) {
    throw new Error("Invalid SNSDocumentSuccess payload length");
  }

  const document = JSON.parse(
    textDecoder.decode(documentPayload.slice(0, -1)),
  );

  const _padding = documentPayload[documentPayload.length - 1];

  const data: SNSDocumentSuccessData = {
    // Any incorrect prefixes will be caught by isSNSDocumentSuccessData
    prefix: prefix as SNSDocumentSuccessData["prefix"],
    document,
  };

  if (strict && !isSNSDocumentSuccessData(data)) {
    throw new Error("Invalid SNSDocumentSuccess data");
  }

  return data;
};
