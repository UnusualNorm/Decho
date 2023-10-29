import {
  type DecodedPacket,
  isRawPacket,
  magicNumber,
  type RawPacket,
} from "../types/packet.ts";

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
import { SNSLobbyFindSessionRequestv11Header } from "../packets/SNSLobbyFindSessionRequestv11.ts";
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
import { SNSLobbyPingResponseHeader } from "../packets/SNSLobbyPingResponse.ts";
import {
  decodeSTcpConnectionUnrequireEventPayload,
  encodeSTcpConnectionUnrequireEventPayload,
  STcpConnectionUnrequireEventHeader,
} from "../packets/STcpConnectionUnrequireEvent.ts";
import { toUint8Array } from "./endian.ts";
import { UintSize } from "./endian.ts";

export function decodePackets(
  array: Uint8Array,
  strict: boolean,
): RawPacket[] {
  const dataView = new DataView(array.buffer);
  const packets: RawPacket[] = [];
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

export function encodePackets(
  packets: RawPacket[],
  strict: boolean,
): Uint8Array {
  if (strict && packets.length === 0) throw new Error("No packets");
  if (packets.some((packet) => !isRawPacket(packet, strict))) {
    throw new Error("Invalid packet");
  }

  const array = new Uint8Array([
    ...packets.flatMap((packet) => [
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

export function decodePacket(packet: RawPacket): DecodedPacket {
  switch (packet.header) {
    case SNSConfigRequestv2Header:
      return {
        header: SNSConfigRequestv2Header,
        data: decodeSNSConfigRequestv2Payload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSConfigSuccessv2Header:
      return {
        header: SNSConfigSuccessv2Header,
        data: decodeSNSConfigSuccessv2Payload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLobbyFindSessionRequestv11Header:
      return {
        header: SNSLobbyFindSessionRequestv11Header,
        data: undefined,
      };
    case SNSLobbyMatchmakerStatusHeader:
      return {
        header: SNSLobbyMatchmakerStatusHeader,
        data: decodeSNSLobbyMatchmakerStatusPayload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLobbyPingRequestv3Header:
      return {
        header: SNSLobbyPingRequestv3Header,
        data: decodeSNSLobbyPingRequestv3Payload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    case SNSLobbyPingResponseHeader:
      return {
        header: SNSLobbyPingResponseHeader,
        data: undefined,
      };
    case STcpConnectionUnrequireEventHeader:
      return {
        header: STcpConnectionUnrequireEventHeader,
        data: decodeSTcpConnectionUnrequireEventPayload(
          new Uint8Array(packet.payload),
          true,
        ),
      };
    default:
      throw new Error(`Unknown packet header: ${packet.header.toString(16)}`);
  }
}

export function encodePacket(packet: DecodedPacket): RawPacket {
  switch (packet.header) {
    case SNSConfigRequestv2Header:
      return {
        magicNumber,
        header: SNSConfigRequestv2Header,
        payload: encodeSNSConfigRequestv2Payload(packet.data, true),
      };
    case SNSConfigSuccessv2Header:
      return {
        magicNumber,
        header: SNSConfigSuccessv2Header,
        payload: encodeSNSConfigSuccessv2Payload(packet.data, true),
      };
    case SNSLobbyFindSessionRequestv11Header:
      return {
        magicNumber,
        header: SNSLobbyFindSessionRequestv11Header,
        payload: new Uint8Array(0),
      };
    case SNSLobbyMatchmakerStatusHeader:
      return {
        magicNumber,
        header: SNSLobbyMatchmakerStatusHeader,
        payload: encodeSNSLobbyMatchmakerStatusPayload(packet.data, true),
      };
    case SNSLobbyPingRequestv3Header:
      return {
        magicNumber,
        header: SNSLobbyPingRequestv3Header,
        payload: encodeSNSLobbyPingRequestv3Payload(packet.data, true),
      };
    case SNSLobbyPingResponseHeader:
      return {
        magicNumber,
        header: SNSLobbyPingResponseHeader,
        payload: new Uint8Array(0),
      };
    case STcpConnectionUnrequireEventHeader:
      return {
        magicNumber,
        header: STcpConnectionUnrequireEventHeader,
        payload: encodeSTcpConnectionUnrequireEventPayload(packet.data, true),
      };
      // No need for default error, the switch is exhaustive
  }
}
