export const STcpConnectionUnrequireEventHeader = 0xe4ee6bc73a96e643n;

export type STcpConnectionUnrequireEventData = {
  unknownByte: number;
};

export const isSTcpConnectionUnrequireEventPayload = (
  payload: Uint8Array,
): boolean => payload.length === 1;

export const isSTcpConnectionUnrequireEventData = (
  data: unknown,
): data is STcpConnectionUnrequireEventData =>
  typeof data === "object" && data !== null &&
  "unknownByte" in data && typeof data.unknownByte === "number";

export const encodeSTcpConnectionUnrequireEventPayload = (
  data: STcpConnectionUnrequireEventData,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSTcpConnectionUnrequireEventData(data)) {
    throw new Error("Invalid STcpConnectionUnrequireEvent data");
  }

  const payload = new Uint8Array([data.unknownByte]);

  if (strict && !isSTcpConnectionUnrequireEventPayload(payload)) {
    throw new Error("Invalid STcpConnectionUnrequireEvent payload");
  }

  return payload;
};

export const decodeSTcpConnectionUnrequireEventPayload = (
  payload: Uint8Array,
  strict: boolean,
): STcpConnectionUnrequireEventData => {
  if (strict && !isSTcpConnectionUnrequireEventPayload(payload)) {
    throw new Error("Invalid STcpConnectionUnrequireEvent payload");
  }

  const data: STcpConnectionUnrequireEventData = {
    unknownByte: payload[0],
  };

  if (strict && !isSTcpConnectionUnrequireEventData(data)) {
    throw new Error("Invalid STcpConnectionUnrequireEvent data");
  }

  return data;
};
