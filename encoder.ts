import { constant } from "./packet.ts";
import { UintSize } from "./utils/endian.ts";
import { encodeUint } from "./utils/endian.ts";
import { arrayBufferToHexString } from "./utils/string.ts";

export const MINIMUM_PACKET_SIZE = 25;
export const PAYLOAD_OFFSET = 24;

export type Packet = {
  constant: bigint;
  header: bigint;
  payload: ArrayBuffer;
};

export function decodePackets(data: ArrayBuffer, strict = true): Packet[] {
  const packets: Packet[] = [];
  const view = new DataView(data);

  let latestPacketEnding = -1;
  for (let i = 0; i < data.byteLength; i++) {
    if (i < latestPacketEnding) continue;
    if (data.byteLength - i < MINIMUM_PACKET_SIZE) break;

    const packetConstant = view.getBigUint64(i, true);
    if (packetConstant !== constant) continue;

    const packet = decodePacket(data.slice(i), strict);
    latestPacketEnding = i + PAYLOAD_OFFSET + packet.payload.byteLength;
    packets.push(packet);
  }

  if (strict && packets.length === 0)
    throw new Error("No packets found in data.");
  return packets;
}

export function decodePacket(data: ArrayBuffer, strict = true): Packet {
  if (data.byteLength < MINIMUM_PACKET_SIZE)
    throw new Error(
      `Packet must be at least ${MINIMUM_PACKET_SIZE} bytes long.`
    );

  const view = new DataView(data);
  const packetConstant = view.getBigUint64(0, true);
  if (packetConstant !== constant && strict)
    throw new Error("Packet constant does not match.");

  const header = view.getBigUint64(8, true);
  const payloadLength = Number(view.getBigUint64(16, true));
  const payload = data.slice(PAYLOAD_OFFSET, PAYLOAD_OFFSET + payloadLength);

  return { constant, header, payload };
}

export function encodePacket(packet: Packet): ArrayBuffer {
  const packetLength = packet.payload.byteLength;
  const buffer = new ArrayBuffer(PAYLOAD_OFFSET + packetLength);
  const view = new DataView(buffer);

  view.setBigUint64(0, packet.constant, true);
  view.setBigUint64(8, packet.header, true);
  view.setBigUint64(16, BigInt(packetLength), true);
  new Uint8Array(buffer, PAYLOAD_OFFSET, packetLength).set(
    new Uint8Array(packet.payload)
  );

  return buffer;
}
