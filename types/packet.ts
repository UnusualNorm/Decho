import {
  isSNSConfigRequestv2Data,
  SNSConfigRequestv2Data,
  SNSConfigRequestv2Header,
} from "../packets/SNSConfigRequestv2.ts";
import {
  isSNSConfigSuccessv2Data,
  SNSConfigSuccessv2Data,
  SNSConfigSuccessv2Header,
} from "../packets/SNSConfigSuccessv2.ts";
import {
  isSNSDocumentSuccessData,
  SNSDocumentSuccessData,
  SNSDocumentSuccessHeader,
} from "../packets/SNSDocumentSuccess.ts";
import {
  isSNSLobbyMatchmakerStatusData,
  SNSLobbyMatchmakerStatusData,
  SNSLobbyMatchmakerStatusHeader,
} from "../packets/SNSLobbyMatchmakerStatus.ts";
import {
  isSNSLobbyPingRequestv3Data,
  SNSLobbyPingRequestv3Data,
  SNSLobbyPingRequestv3Header,
} from "../packets/SNSLobbyPingRequestv3.ts";
import {
  isSNSLoggedInUserProfileSuccessData,
  SNSLoggedInUserProfileSuccessData,
  SNSLoggedInUserProfileSuccessHeader,
} from "../packets/SNSLoggedInUserProfileSuccess.ts";
import {
  isSNSLoginSettingsData,
  SNSLoginSettingsData,
  SNSLoginSettingsHeader,
} from "../packets/SNSLoginSettings.ts";
import {
  isSNSReconcileIAPResultData,
  SNSReconcileIAPResultData,
  SNSReconcileIAPResultHeader,
} from "../packets/SNSReconcileIAPResult.ts";
import {
  isSTcpConnectionUnrequireEventData,
  STcpConnectionUnrequireEventData,
  STcpConnectionUnrequireEventHeader,
} from "../packets/STcpConnectionUnrequireEvent.ts";

export const magicNumber = 0xf640bb78a2e78cbbn;

export const isPacket = (
  packet: unknown,
): packet is Packet => {
  if (typeof packet !== "object" || packet === null) return false;
  if (!("magicNumber" in packet) || typeof packet.magicNumber !== "bigint") {
    return false;
  }
  if (!("header" in packet) || typeof packet.header !== "bigint") {
    return false;
  }
  if (!("decoded" in packet) || typeof packet.decoded !== "boolean") {
    return false;
  }

  if (!("payload" in packet)) {
    return false;
  }
  if (!packet.decoded) {
    return "payload" in packet && packet.payload instanceof Uint8Array;
  }

  switch (packet.header) {
    case SNSConfigRequestv2Header:
      return isSNSConfigRequestv2Data(packet.payload);
    case SNSConfigSuccessv2Header:
      return isSNSConfigSuccessv2Data(packet.payload);
    case SNSDocumentSuccessHeader:
      return isSNSDocumentSuccessData(packet.payload);
    case SNSLobbyMatchmakerStatusHeader:
      return isSNSLobbyMatchmakerStatusData(packet.payload);
    case SNSLobbyPingRequestv3Header:
      return isSNSLobbyPingRequestv3Data(packet.payload);
    case SNSLoggedInUserProfileSuccessHeader:
      return isSNSLoggedInUserProfileSuccessData(packet.payload);
    case SNSLoginSettingsHeader:
      return isSNSLoginSettingsData(packet.payload);
    case SNSReconcileIAPResultHeader:
      return isSNSReconcileIAPResultData(packet.payload);
    case STcpConnectionUnrequireEventHeader:
      return isSTcpConnectionUnrequireEventData(packet.payload);
    default:
      return false;
  }
};

export type Packet =
  & {
    magicNumber: bigint;
  }
  & (
    | {
      header: bigint;
      decoded: false;
      payload: Uint8Array;
    }
    | (
      & {
        decoded: true;
      }
      & (
        | {
          header: typeof SNSConfigRequestv2Header;
          payload: SNSConfigRequestv2Data;
        }
        | {
          header: typeof SNSConfigSuccessv2Header;
          payload: SNSConfigSuccessv2Data;
        }
        | {
          header: typeof SNSDocumentSuccessHeader;
          payload: SNSDocumentSuccessData;
        }
        | {
          header: typeof SNSLobbyMatchmakerStatusHeader;
          payload: SNSLobbyMatchmakerStatusData;
        }
        | {
          header: typeof SNSLobbyPingRequestv3Header;
          payload: SNSLobbyPingRequestv3Data;
        }
        | {
          header: typeof SNSLoggedInUserProfileSuccessHeader;
          payload: SNSLoggedInUserProfileSuccessData;
        }
        | {
          header: typeof SNSLoginSettingsHeader;
          payload: SNSLoginSettingsData;
        }
        | {
          header: typeof SNSReconcileIAPResultHeader;
          payload: SNSReconcileIAPResultData;
        }
        | {
          header: typeof STcpConnectionUnrequireEventHeader;
          payload: STcpConnectionUnrequireEventData;
        }
      )
    )
  );
