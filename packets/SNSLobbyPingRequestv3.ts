import { fromUint8Array, toUint8Array, UintSize } from "../utils/endian.ts";

export const SNSLobbyPingRequestv3Header = 0xf3ebbf19875fbffan;

export type SNSLobbyPingRequestv3Data = {
  unknownHeader: bigint;
  servers: {
    privateOctet1: number;
    privateOctet2: number;
    privateOctet3: number;
    privateOctet4: number;
    publicOctet1: number;
    publicOctet2: number;
    publicOctet3: number;
    publicOctet4: number;
    port: number;
  }[];
};

export const isSNSLobbyPingRequestv3Payload = (
  payload: Uint8Array,
): boolean =>
  payload.length >=
    8; // header

export const isSNSLobbyPingRequestv3Data = (
  data: unknown,
): data is SNSLobbyPingRequestv3Data =>
  typeof data === "object" && data !== null &&
  "unknownHeader" in data && typeof data.unknownHeader === "bigint" &&
  "servers" in data && Array.isArray(data.servers) &&
  data.servers.every((server) =>
    typeof server === "object" && server !== null &&
    "privateOctet1" in server && typeof server.privateOctet1 === "number" &&
    "privateOctet2" in server && typeof server.privateOctet2 === "number" &&
    "privateOctet3" in server && typeof server.privateOctet3 === "number" &&
    "privateOctet4" in server && typeof server.privateOctet4 === "number" &&
    "publicOctet1" in server && typeof server.publicOctet1 === "number" &&
    "publicOctet2" in server && typeof server.publicOctet2 === "number" &&
    "publicOctet3" in server && typeof server.publicOctet3 === "number" &&
    "publicOctet4" in server && typeof server.publicOctet4 === "number" &&
    "port" in server && typeof server.port === "number"
  );

const padding = 0x0000;
export const encodeSNSLobbyPingRequestv3Payload = (
  data: SNSLobbyPingRequestv3Data,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSLobbyPingRequestv3Data(data)) {
    throw new Error("Invalid SNSLobbyPingRequestv3 data");
  }

  const payload = new Uint8Array([
    ...toUint8Array(UintSize.Uint64, data.unknownHeader),
    ...data.servers
      .map((server) => [
        server.privateOctet1,
        server.privateOctet2,
        server.privateOctet3,
        server.privateOctet4,
        server.publicOctet1,
        server.publicOctet2,
        server.publicOctet3,
        server.publicOctet4,
        ...toUint8Array(UintSize.Uint16, BigInt(server.port)),
        ...toUint8Array(UintSize.Uint16, BigInt(padding)),
      ])
      .flat(),
  ]);

  if (strict && !isSNSLobbyPingRequestv3Payload(payload)) {
    throw new Error("Invalid SNSLobbyPingRequestv3 payload");
  }

  return payload;
};

export const decodeSNSLobbyPingRequestv3Payload = (
  payload: Uint8Array,
  strict: boolean,
): SNSLobbyPingRequestv3Data => {
  if (strict && !isSNSLobbyPingRequestv3Payload(payload)) {
    throw new Error("Invalid SNSLobbyPingRequestv3 payload");
  }

  const dataView = new DataView(payload.buffer);
  const unknownHeader = dataView.getBigUint64(0, true);

  const serverCount = Math.floor((payload.byteLength - 8) / 12);
  if (payload.byteLength - 8 < serverCount * 8) {
    throw new Error("Invalid SNSLobbyPingRequestv3 payload length");
  }

  const servers: SNSLobbyPingRequestv3Data["servers"] = [];
  for (let i = 0; i < serverCount; i++) {
    const privateOctet1 = payload[8 + i * 12];
    const privateOctet2 = payload[8 + i * 12 + 1];
    const privateOctet3 = payload[8 + i * 12 + 2];
    const privateOctet4 = payload[8 + i * 12 + 3];
    const publicOctet1 = payload[8 + i * 12 + 4];
    const publicOctet2 = payload[8 + i * 12 + 5];
    const publicOctet3 = payload[8 + i * 12 + 6];
    const publicOctet4 = payload[8 + i * 12 + 7];
    const port = Number(fromUint8Array(
      UintSize.Uint16,
      payload.slice(8 + i * 12 + 8, 8 + i * 12 + 10),
    ));

    const serverPadding = Number(fromUint8Array(
      UintSize.Uint16,
      payload.slice(8 + i * 12 + 10, 8 + i * 12 + 12),
    ));

    if (strict && serverPadding !== padding) {
      throw new Error("Invalid SNSLobbyPingRequestv3 server padding");
    }

    servers.push({
      privateOctet1,
      privateOctet2,
      privateOctet3,
      privateOctet4,
      publicOctet1,
      publicOctet2,
      publicOctet3,
      publicOctet4,
      port,
    });
  }

  const data: SNSLobbyPingRequestv3Data = {
    unknownHeader,
    servers,
  };

  if (strict && !isSNSLobbyPingRequestv3Data(data)) {
    throw new Error("Invalid SNSLobbyPingRequestv3 data");
  }

  return data;
};
