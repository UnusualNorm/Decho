import { Foras, unzlib, zlib } from "foras";
import { fromUint8Array, toUint8Array, UintSize } from "../utils/endian.ts";

await Foras.initBundledOnce();

export const SNSLoginSettingsHeader = 0xf1552163c3e25bedn;
export const SNSLoginSettingsBaseLength = 8 + // length
  9; // zstd frame

export type SNSLoginSettingsData = {
  config_data: {
    active_battle_pass_season: {
      endtime: number;
      id: string;
      starttime: number;
    };
    active_store_entry: {
      endtime: number;
      id: string;
      starttime: number;
    };
    active_store_featured_entry: {
      endtime: number;
      id: string;
      starttime: number;
    };
  };
  env: string;
  iap_unlocked: boolean;
  match_type_specific_matchmakers: {
    ai: {
      host_suffix: string;
      match_types: string[];
      queue_id: string;
    };
    arena: {
      host_suffix: string;
      match_types: string[];
      queue_id: string;
    };
    combat: {
      host_suffix: string;
      match_types: string[];
      queue_id: string;
    };
    social: {
      host_suffix: string;
      match_types: string[];
      queue_id: string;
    };
  };
  matchmaker_queue_mode: string;
  remote_log_errors: boolean;
  remote_log_metrics: boolean;
  remote_log_rich_presence: boolean;
  remote_log_richpresence: boolean;
  remote_log_social: boolean;
  remote_log_warnings: boolean;
  skip_combat_entitlement_checks: boolean;
};

export const isSNSLoginSettingsPayload = (
  payload: Uint8Array,
): boolean => payload.byteLength >= SNSLoginSettingsBaseLength;

// TODO: validate payload
export const isSNSLoginSettingsData = (
  // deno-lint-ignore no-unused-vars
  data: unknown,
): data is SNSLoginSettingsData => true;

const textEncoder = new TextEncoder();
export const encodeSNSLoginSettingsPayload = (
  data: SNSLoginSettingsData,
  strict: boolean,
): Uint8Array => {
  if (strict && !isSNSLoginSettingsData(data)) {
    throw new Error("Invalid SNSLoginSettings data");
  }

  const dataPayload = textEncoder.encode(JSON.stringify(data));
  const payload = new Uint8Array([
    ...toUint8Array(UintSize.Uint64, BigInt(dataPayload.byteLength)),
    ...zlib(new Foras.Memory(dataPayload)).copyAndDispose(),
  ]);

  if (strict && !isSNSLoginSettingsPayload(payload)) {
    throw new Error("Invalid SNSLoginSettings payload");
  }

  return payload;
};

const textDecoder = new TextDecoder();
export const decodeSNSLoginSettingsPayload = (
  payload: Uint8Array,
  strict: boolean,
): SNSLoginSettingsData => {
  if (strict && !isSNSLoginSettingsPayload(payload)) {
    throw new Error("Invalid SNSLoginSettings payload");
  }

  const dataPayloadLength = Number(fromUint8Array(
    UintSize.Uint64,
    payload.slice(0, 8),
  ));

  const dataPayload = unzlib(
    new Foras.Memory(payload.slice(8, 8 + dataPayloadLength)),
  ).copyAndDispose();

  const data = JSON.parse(textDecoder.decode(dataPayload));

  if (strict && !isSNSLoginSettingsData(data)) {
    throw new Error("Invalid SNSLoginSettings data");
  }

  return data;
};
