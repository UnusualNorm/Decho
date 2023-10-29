import {
  SNSConfigRequestv2Data,
  SNSConfigRequestv2Header,
} from "../packets/SNSConfigRequestv2.ts";
import {
  SNSConfigSuccessv2Data,
  SNSConfigSuccessv2Header,
} from "../packets/SNSConfigSuccessv2.ts";
import { SNSLobbyFindSessionRequestv11Header } from "../packets/SNSLobbyFindSessionRequestv11.ts";
import {
  SNSLobbyMatchmakerStatusData,
  SNSLobbyMatchmakerStatusHeader,
} from "../packets/SNSLobbyMatchmakerStatus.ts";
import {
  SNSLobbyPingRequestv3Data,
  SNSLobbyPingRequestv3Header,
} from "../packets/SNSLobbyPingRequestv3.ts";
import { SNSLobbyPingResponseHeader } from "../packets/SNSLobbyPingResponse.ts";
import {
  STcpConnectionUnrequireEventData,
  STcpConnectionUnrequireEventHeader,
} from "../packets/STcpConnectionUnrequireEvent.ts";

export const magicNumber = 0xf640bb78a2e78cbbn;

export type RawPacket = {
  magicNumber: bigint;
  header: bigint;
  payload: Uint8Array;
};

export const isRawPacket = (
  packet: unknown,
  strict: boolean,
): packet is RawPacket =>
  typeof packet === "object" && packet !== null &&
  "magicNumber" in packet && typeof packet.magicNumber === "bigint" &&
  (!strict || packet.magicNumber === magicNumber) &&
  "header" in packet && typeof packet.header === "bigint" &&
  (!strict ||
    packet.header === SNSConfigRequestv2Header ||
    packet.header === SNSConfigSuccessv2Header ||
    packet.header === SNSLobbyFindSessionRequestv11Header ||
    packet.header === SNSLobbyMatchmakerStatusHeader ||
    packet.header === SNSLobbyPingRequestv3Header ||
    packet.header === SNSLobbyPingResponseHeader ||
    packet.header === STcpConnectionUnrequireEventHeader) &&
  "payload" in packet && packet.payload instanceof Uint8Array;

export type DecodedPacket =
  | {
    header: typeof SNSConfigRequestv2Header;
    data: SNSConfigRequestv2Data;
  }
  | {
    header: typeof SNSConfigSuccessv2Header;
    data: SNSConfigSuccessv2Data;
  }
  | {
    header: typeof SNSLobbyFindSessionRequestv11Header;
    data: undefined;
  }
  | {
    header: typeof SNSLobbyMatchmakerStatusHeader;
    data: SNSLobbyMatchmakerStatusData;
  }
  | {
    header: typeof SNSLobbyPingRequestv3Header;
    data: SNSLobbyPingRequestv3Data;
  }
  | {
    header: typeof SNSLobbyPingResponseHeader;
    data: undefined;
  }
  | {
    header: typeof STcpConnectionUnrequireEventHeader;
    data: STcpConnectionUnrequireEventData;
  };
