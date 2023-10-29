export const SNSConfigRequestv2Header = 0x7843eb370b9f8682n;
export const SNSConfigRequestv2BaseLength = 1 + // type
  1; // padding

export type SNSConfigRequestv2Data = {
  type: number;
  config: {
    type: string;
    id: string;
  };
};

export const isSNSConfigRequestv2Payload = (
  payload: Uint8Array,
): boolean => payload.byteLength >= SNSConfigRequestv2BaseLength;

export const isSNSConfigRequestv2Data = (
  data: unknown,
): data is SNSConfigRequestv2Data =>
  typeof data === "object" && data !== null &&
  "type" in data && typeof data.type === "number" &&
  "config" in data && typeof data.config === "object" && data.config !== null &&
  "type" in data.config && typeof data.config.type === "string" &&
  "id" in data.config && typeof data.config.id === "string";

const textEncoder = new TextEncoder();
export const encodeSNSConfigRequestv2Payload = (
  data: SNSConfigRequestv2Data,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSConfigRequestv2Data(data)) {
    throw new Error("Invalid SNSConfigRequestv2 data");
  }

  const padding = 0x00;
  const configPayload = textEncoder.encode(JSON.stringify(data.config));
  const payload = new Uint8Array([
    data.type,
    ...configPayload,
    padding,
  ]);

  if (strict && !isSNSConfigRequestv2Payload(payload)) {
    throw new Error("Invalid SNSConfigRequestv2 payload");
  }

  return payload;
};

const textDecoder = new TextDecoder();
export const decodeSNSConfigRequestv2Payload = (
  payload: Uint8Array,
  strict: boolean,
): SNSConfigRequestv2Data => {
  if (strict && !isSNSConfigRequestv2Payload(payload)) {
    throw new Error("Invalid SNSConfigRequestv2 payload");
  }

  const type = payload[0];
  const config = JSON.parse(textDecoder.decode(
    payload.slice(1, -1),
  ));
  const _padding = payload[payload.byteLength - 1];

  const data: SNSConfigRequestv2Data = {
    config,
    type,
  };

  if (strict && !isSNSConfigRequestv2Data(data)) {
    throw new Error("Invalid SNSConfigRequestv2 data");
  }

  return data;
};
