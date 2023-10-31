import { fromUint8Array, toUint8Array, UintSize } from "../utils/endian.ts";

export const SNSLobbyMatchmakerStatusHeader = 0xcbbebfda33cf288fn;
export const SNSLobbyMatchmakerStatusBaseLength = 4;

export type SNSLobbyMatchmakerStatusData = {
  status: number;
};

export const isSNSLobbyMatchmakerStatusPayload = (
  payload: Uint8Array,
): boolean => payload.length === SNSLobbyMatchmakerStatusBaseLength;

export const isSNSLobbyMatchmakerStatusData = (
  data: unknown,
): data is SNSLobbyMatchmakerStatusData =>
  typeof data === "object" && data !== null &&
  "status" in data && typeof data.status === "number";

export const encodeSNSLobbyMatchmakerStatusPayload = (
  data: SNSLobbyMatchmakerStatusData,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSLobbyMatchmakerStatusData(data)) {
    throw new Error("Invalid SNSLobbyMatchmakerStatus data");
  }

  const payload = toUint8Array(UintSize.Uint32, BigInt(data.status));

  if (strict && !isSNSLobbyMatchmakerStatusPayload(payload)) {
    throw new Error("Invalid SNSLobbyMatchmakerStatus payload");
  }

  return payload;
};

export const decodeSNSLobbyMatchmakerStatusPayload = (
  payload: Uint8Array,
  strict: boolean,
): SNSLobbyMatchmakerStatusData => {
  if (strict && !isSNSLobbyMatchmakerStatusPayload(payload)) {
    throw new Error("Invalid SNSLobbyMatchmakerStatus payload");
  }

  const data: SNSLobbyMatchmakerStatusData = {
    status: Number(fromUint8Array(UintSize.Uint32, payload)),
  };

  if (strict && !isSNSLobbyMatchmakerStatusData(data)) {
    throw new Error("Invalid SNSLobbyMatchmakerStatus data");
  }

  return data;
};
