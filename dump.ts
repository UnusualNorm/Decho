import { init } from "zstd_wasm";
import { decodePackets } from "./utils/packet.ts";

await init();

// UNSAFE CODE
const importDump = async (path: string): Promise<number[]> => {
  const rawData = await Deno.readFile(path);
  const textDecoder = new TextDecoder();
  const data = textDecoder.decode(rawData);

  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].substring(4);
    lines[i] = lines[i].trim();
    lines[i] = "0x" + lines[i];
    lines[i] = lines[i].replaceAll(" ", ",0x");
    lines[i] = lines[i] + ",";
  }

  const array = `[${lines.join("").slice(0, -1)}]`;
  await Deno.writeTextFile("./dumpArray.txt", array);
  const parsedArray = eval(array);
  return parsedArray;
};

const uint8ArrayToArray = (uint8Array: Uint8Array): number[] => {
  const array: number[] = [];
  for (const byte of uint8Array) {
    array.push(byte);
  }
  return array;
};

const dump = new Uint8Array(await importDump("./dump.txt"));
const packets = decodePackets(dump, true);

for (const packet of packets) {
  console.log(
    JSON.stringify(uint8ArrayToArray(new Uint8Array(packet.payload))),
  );
}
