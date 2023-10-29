import { type Config, isConfig } from "../types/config.ts";

export const configs: Config[] = [];
const configFiles = Deno.readDirSync("./configs");
for (const configFile of configFiles) {
  if (!configFile.isFile) continue;
  if (!configFile.name.endsWith(".json")) continue;

  const fileConfigs = JSON.parse(
    await Deno.readTextFile(`./configs/${configFile.name}`),
  );

  for (const config of Object.values(fileConfigs)) {
    if (!isConfig(config)) {
      console.error(`[config] Invalid config (${configFile.name})`);
      continue;
    }

    configs.push(config);
  }
}

export function getConfig(type: string, id: string): Config | undefined {
  const config = configs.find(
    (config) => config.type === type && config.id === id,
  );

  return config;
}

export const typeStringToIntMap: [string, bigint][] = [
  ["main_menu", 0x7b1d0e4427ee0915n],
  ["active_battle_pass_season", 0x7ec7455095134e79n],
  ["active_store_entry", 0xc92d42ecab56db59n],
  ["active_store_featured_entry", 0x31f9d212b1224955n],
];

export const typeStringToInt = (type: string): bigint | undefined =>
  typeStringToIntMap.find(([t]) => t === type)?.[1];

export const typeIntToString = (type: bigint): string | undefined =>
  typeStringToIntMap.find(([, t]) => t === type)?.[0];

export const idStringToIntMap: [string, bigint][] = [
  ["main_menu", 0x7b1d0e4427ee0915n],
  ["battle_pass_season_00_invalid", 0x4a2443d62ce5c6c7n],
  ["store_entry_0036", 0x12a0d011f264c4c1n],
  ["store_featured_entry_0013", 0xedc05dddbd8cb455n],
];

export const idStringToInt = (id: string): bigint | undefined =>
  idStringToIntMap.find(([i]) => i === id)?.[1];

export const idIntToString = (id: bigint): string | undefined =>
  idStringToIntMap.find(([, i]) => i === id)?.[0];
