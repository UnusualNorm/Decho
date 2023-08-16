import iplist from "../../configs/iplist.json" assert { type: "json" };
import { Packet, encodePacket } from "../../encoder.ts";
import { constant, headerLookup } from "../../packet.ts";
import { UintSize, decodeUint, encodeUint } from "../../utils/endian.ts";

export const getEntries = (): IpEntry[] =>
  iplist.map((entry) => ({
    ...entry,
    port: BigInt(entry.port),
  }));

export type IpEntry = {
  octet1: number;
  octet2: number;
  octet3: number;
  octet4: number;
  port: bigint;
  maxClients: number;
  unknownProperty1: number;
  unknownProperty2: number;
  unknownProperty3: number;
};

export function encodeIpListPacket(
  entries = getEntries(),
  unknownHeader = decodeUint(
    UintSize.Uint64,
    new Uint8Array([0x00, 0x00, 0x04, 0x00, 0xe8, 0x03, 0x00, 0x00])
  )
): ArrayBuffer {
  const payload = new Uint8Array([
    ...encodeUint(UintSize.Uint64, unknownHeader),
    ...entries
      .map((entry) => [
        entry.maxClients,
        entry.unknownProperty1,
        entry.unknownProperty2,
        entry.unknownProperty3,
        entry.octet1,
        entry.octet2,
        entry.octet3,
        entry.octet4,
        ...encodeUint(UintSize.Uint16, entry.port),
        0x00,
        0x00,
      ])
      .flat(),
  ]);

  const packet: Packet = {
    constant,
    header: headerLookup.matchmaker.iplist,
    payload: payload,
  };

  return encodePacket(packet);
}
