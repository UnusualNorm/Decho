import { constant } from "./packet.ts";

export type Packet = {
  constant: bigint;
  header: bigint;
  payload: ArrayBuffer;
  magic_number: number;
};

export function decodePacket(data: ArrayBuffer, strict = true): Packet {
  if (data.byteLength < 25) throw new Error("Packet too small");
  const view = new DataView(data);

  const packetConstant = view.getBigUint64(0, true);
  if (strict && packetConstant !== constant)
    throw new Error("Invalid packet constant");

  const packetHeader = view.getBigUint64(8, true);
  const packetLength = view.getBigUint64(16, true);
  if (packetLength < 1) throw new Error("Invalid packet length");
  if (data.byteLength < packetLength + 24n)
    throw new Error("Invalid packet length");

  const packetPayload = data.slice(24, Number(packetLength + 23n));
  const packetMagicNumber = view.getUint8(Number(packetLength + 23n));

  return {
    constant: packetConstant,
    header: packetHeader,
    payload: packetPayload,
    magic_number: packetMagicNumber,
  };
}

export function encodePacket(packet: Packet): ArrayBuffer {
  const packetLength = packet.payload.byteLength;
  const buffer = new ArrayBuffer(25 + packetLength);
  const view = new DataView(buffer);

  view.setBigUint64(0, packet.constant, true);
  view.setBigUint64(8, packet.header, true);
  view.setBigUint64(16, BigInt(packetLength + 1), true);
  new Uint8Array(buffer, 24, packetLength).set(new Uint8Array(packet.payload));
  view.setUint8(24 + packetLength, packet.magic_number);

  return buffer;
}
