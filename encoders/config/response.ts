import { constant, headerLookup } from "../../packet.ts";
import { encodePacket, Packet } from "../../encoder.ts";
import { encodeUint, UintSize } from "../../utils/endian.ts";
import { Config } from "../../utils/config.ts";
import { compress } from "zstd_wasm";

export function encodeConfigResponsePacket(
  unknownHeader1: bigint,
  unknownHeader2: bigint,
  unknownNumber1: bigint,
  config: Config,
  magic_number: number,
) {
  const te = new TextEncoder();
  const configJson = te.encode(JSON.stringify(config));
  const payload = new Uint8Array([
    ...encodeUint(UintSize.Uint64, unknownHeader1),
    ...encodeUint(UintSize.Uint64, unknownHeader2),
    ...encodeUint(UintSize.Uint32, unknownNumber1),
    ...compress(new Uint8Array([...configJson, magic_number])),
  ]);

  const packet: Packet = {
    constant,
    header: headerLookup.config.response,
    payload: payload,
  };

  return encodePacket(packet);
}
