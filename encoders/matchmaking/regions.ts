import { encodePacket, Packet } from "../../encoder.ts";
import { constant, headerLookup } from "../../packet.ts";
import { decodeUint, encodeUint, UintSize } from "../../utils/endian.ts";
import defaultRegionList from "../../configs/regions.json" assert {
  type: "json",
};

export function encodeRegionsPacket(
  unknownHeader = decodeUint(
    UintSize.Uint64,
    new Uint8Array([0x00, 0x00, 0x04, 0x00, 0xe8, 0x03, 0x00, 0x00]),
  ),
  regionList: Record<string, string> = defaultRegionList,
): ArrayBuffer {
  const te = new TextEncoder();

  const packet: Packet = {
    constant,
    header: headerLookup.magic_packet,
    payload: new Uint8Array([
      ...encodeUint(UintSize.Uint64, unknownHeader),
      ...te.encode(JSON.stringify(regionList)),
    ]),
  };

  return encodePacket(packet);
}
