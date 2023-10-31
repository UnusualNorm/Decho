import { toUint8Array, UintSize } from "../utils/endian.ts";

export const SNSReconcileIAPResultHeader = 0x828a506542c2ab0dn;
export const SNSReconcileIAPResultBaseLength = 8 + // nonce
  8 + // unknownHeader
  1; // padding

export type SNSReconcileIAPResultData = {
  unknownHeader: bigint;
  oculusId: bigint;
  config: {
    balance: {
      currency: {
        echopoints: {
          val: number;
        };
      };
    };
    transactionid: number;
  };
};

export const isSNSReconcileIAPResultPayload = (
  payload: Uint8Array,
): boolean => payload.byteLength >= SNSReconcileIAPResultBaseLength;

export const isSNSReconcileIAPResultData = (
  data: unknown,
): data is SNSReconcileIAPResultData =>
  typeof data === "object" && data !== null &&
  "unknownHeader" in data && typeof data.unknownHeader === "bigint" &&
  "oculusId" in data && typeof data.oculusId === "bigint" &&
  "config" in data && typeof data.config === "object" && data.config !== null &&
  "balance" in data.config && typeof data.config.balance === "object" &&
  data.config.balance !== null &&
  "currency" in data.config.balance &&
  typeof data.config.balance.currency === "object" &&
  data.config.balance.currency !== null &&
  "echopoints" in data.config.balance.currency &&
  typeof data.config.balance.currency.echopoints === "object" &&
  data.config.balance.currency.echopoints !== null &&
  "val" in data.config.balance.currency.echopoints &&
  typeof data.config.balance.currency.echopoints.val === "number" &&
  "transactionid" in data.config &&
  typeof data.config.transactionid === "number";

const textEncoder = new TextEncoder();
export const encodeSNSReconcileIAPResultPayload = (
  data: SNSReconcileIAPResultData,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSReconcileIAPResultData(data)) {
    throw new Error("Invalid SNSReconcileIAPResult data");
  }

  const padding = 0x00;
  const configPayload = textEncoder.encode(JSON.stringify(data.config));
  const payload = new Uint8Array([
    ...toUint8Array(UintSize.Uint64, data.unknownHeader),
    ...toUint8Array(UintSize.Uint64, data.oculusId),
    ...configPayload,
    padding,
  ]);

  if (strict && !isSNSReconcileIAPResultPayload(payload)) {
    throw new Error("Invalid SNSReconcileIAPResult payload");
  }

  return payload;
};

const textDecoder = new TextDecoder();
export const decodeSNSReconcileIAPResultPayload = (
  payload: Uint8Array,
  strict: boolean,
): SNSReconcileIAPResultData => {
  if (strict && !isSNSReconcileIAPResultPayload(payload)) {
    throw new Error("Invalid SNSReconcileIAPResult payload");
  }

  const dataView = new DataView(payload.buffer);
  const unknownHeader = dataView.getBigUint64(0, true);
  const oculusId = dataView.getBigUint64(8, true);
  const config = JSON.parse(
    textDecoder.decode(payload.slice(16, -1)),
  );
  const _padding = payload[payload.byteLength - 1];

  const data: SNSReconcileIAPResultData = {
    unknownHeader,
    oculusId,
    config,
  };

  if (strict && !isSNSReconcileIAPResultData(data)) {
    throw new Error("Invalid SNSReconcileIAPResult data");
  }

  return data;
};
