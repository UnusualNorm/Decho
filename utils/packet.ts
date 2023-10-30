import { magicNumber, type Packet } from "../types/packet.ts";
import { toUint8Array } from "./endian.ts";
import { UintSize } from "./endian.ts";

import {
  decodeSNSConfigRequestv2Payload,
  encodeSNSConfigRequestv2Payload,
  SNSConfigRequestv2Header,
} from "../packets/SNSConfigRequestv2.ts";
import {
  decodeSNSConfigSuccessv2Payload,
  encodeSNSConfigSuccessv2Payload,
  SNSConfigSuccessv2Header,
} from "../packets/SNSConfigSuccessv2.ts";
import {
  decodeSNSLobbyMatchmakerStatusPayload,
  encodeSNSLobbyMatchmakerStatusPayload,
  SNSLobbyMatchmakerStatusHeader,
} from "../packets/SNSLobbyMatchmakerStatus.ts";
import {
  decodeSNSLobbyPingRequestv3Payload,
  encodeSNSLobbyPingRequestv3Payload,
  SNSLobbyPingRequestv3Header,
} from "../packets/SNSLobbyPingRequestv3.ts";
import {
  decodeSNSLoginSettingsPayload,
  encodeSNSLoginSettingsPayload,
  SNSLoginSettingsHeader,
} from "../packets/SNSLoginSettings.ts";
import {
  decodeSNSReconcileIAPResultPayload,
  encodeSNSReconcileIAPResultPayload,
  SNSReconcileIAPResultHeader,
} from "../packets/SNSReconcileIAPResult.ts";
import {
  decodeSTcpConnectionUnrequireEventPayload,
  encodeSTcpConnectionUnrequireEventPayload,
  STcpConnectionUnrequireEventHeader,
} from "../packets/STcpConnectionUnrequireEvent.ts";
import {
  decodeSNSLoggedInUserProfileSuccessPayload,
  encodeSNSLoggedInUserProfileSuccessPayload,
  SNSLoggedInUserProfileSuccessHeader,
} from "../packets/SNSLoggedInUserProfileSuccess.ts";
import {
  decodeSNSDocumentSuccessPayload,
  encodeSNSDocumentSuccessPayload,
  SNSDocumentSuccessHeader,
} from "../packets/SNSDocumentSuccess.ts";

export function deserializePackets(
  array: Uint8Array,
  strict: boolean,
): Packet[] {
  const dataView = new DataView(array.buffer);
  const packets: Packet[] = [];
  for (let i = 0; i < array.byteLength; i++) {
    const bytesLeft = array.byteLength - i;
    const headerIndex = i + 8;
    const payloadLengthIndex = i + 16;
    const payloadIndex = i + 24;

    if (bytesLeft < 8) break;
    const packetMagicNumber = dataView.getBigUint64(i);
    if (strict && packetMagicNumber !== magicNumber) continue;

    if (bytesLeft < 8 * 3) {
      if (strict) throw new Error("Invalid packet length");
      break;
    }

    const packetHeader = dataView.getBigUint64(headerIndex);
    const packetPayloadLength = dataView.getBigUint64(payloadLengthIndex, true);
    if (strict && packetPayloadLength === 0n) {
      throw new Error("Invalid packet payload length");
    }

    if (bytesLeft < 8 * 3 + Number(packetPayloadLength)) {
      throw new Error("Invalid packet length");
    }

    const packetPayload = array.slice(
      payloadIndex,
      payloadIndex + Number(packetPayloadLength),
    );

    packets.push({
      decoded: false,
      magicNumber: packetMagicNumber,
      header: packetHeader,
      payload: packetPayload,
    });
  }

  if (strict && packets.length === 0) {
    throw new Error("No packets");
  }

  return packets;
}

export function serializePackets(
  packets: Packet[],
  strict: boolean,
): Uint8Array {
  if (strict && packets.length === 0) throw new Error("No packets");
  const encodedPackets = packets.map((packet) =>
    encodePacket(packet) as {
      magicNumber: bigint;
      header: bigint;
      payload: Uint8Array;
    }
  );

  const array = new Uint8Array([
    ...encodedPackets.flatMap((packet) => [
      ...toUint8Array(UintSize.Uint64, packet.magicNumber, true),
      ...toUint8Array(UintSize.Uint64, packet.header, true),
      ...toUint8Array(
        UintSize.Uint64,
        BigInt(packet.payload.byteLength),
      ),
      ...packet.payload,
    ]),
  ]);

  return array;
}

export function decodePacket(packet: Packet): Packet {
  if (packet.decoded) return packet;

  switch (packet.header) {
    case SNSConfigRequestv2Header:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSConfigRequestv2Payload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSConfigSuccessv2Header:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSConfigSuccessv2Payload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSDocumentSuccessHeader:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSDocumentSuccessPayload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLobbyMatchmakerStatusHeader:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSLobbyMatchmakerStatusPayload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLobbyPingRequestv3Header:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSLobbyPingRequestv3Payload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLoggedInUserProfileSuccessHeader:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSLoggedInUserProfileSuccessPayload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLoginSettingsHeader:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSLoginSettingsPayload(packet.payload, true),
      };
    case SNSReconcileIAPResultHeader:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSNSReconcileIAPResultPayload(packet.payload, true),
      };
    case STcpConnectionUnrequireEventHeader:
      return {
        ...packet,
        header: packet.header,
        decoded: true,
        payload: decodeSTcpConnectionUnrequireEventPayload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    default:
      return packet;
  }
}

export function encodePacket(packet: Packet): Packet {
  if (!packet.decoded) return packet;

  switch (packet.header) {
    case SNSConfigRequestv2Header:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSConfigRequestv2Payload(packet.payload, true),
      };
    case SNSConfigSuccessv2Header:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSConfigSuccessv2Payload(packet.payload, true),
      };
    case SNSDocumentSuccessHeader:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSDocumentSuccessPayload(packet.payload, true),
      };
    case SNSLobbyMatchmakerStatusHeader:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSLobbyMatchmakerStatusPayload(packet.payload, true),
      };
    case SNSLobbyPingRequestv3Header:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSLobbyPingRequestv3Payload(packet.payload, true),
      };
    case SNSLoggedInUserProfileSuccessHeader:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSLoggedInUserProfileSuccessPayload(
          packet.payload,
          true,
        ),
      };
    case SNSLoginSettingsHeader:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSLoginSettingsPayload(packet.payload, true),
      };
    case SNSReconcileIAPResultHeader:
      return {
        ...packet,
        decoded: false,
        payload: encodeSNSReconcileIAPResultPayload(packet.payload, true),
      };
    case STcpConnectionUnrequireEventHeader:
      return {
        ...packet,
        decoded: false,
        payload: encodeSTcpConnectionUnrequireEventPayload(
          packet.payload,
          true,
        ),
      };
  }
}
