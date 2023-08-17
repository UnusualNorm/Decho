import { encodePacket, Packet } from "../../encoder.ts";
import { constant, headerLookup } from "../../packet.ts";
import { encodeUint, UintSize } from "../../utils/endian.ts";

export function encodeInitiatorPacket(
  number = 0n,
): ArrayBuffer {
  const packet: Packet = {
    constant,
    header: headerLookup.matchmaker.initiator,
    payload: encodeUint(UintSize.Uint32, number),
  };

  return encodePacket(packet);
}
