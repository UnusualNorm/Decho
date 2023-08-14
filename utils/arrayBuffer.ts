export function encodeUint64(number: bigint): Uint8Array {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, number, true);
  return new Uint8Array(buffer);
}

export function decodeUint64(encodedBytes: Uint8Array): bigint {
  const view = new DataView(encodedBytes.buffer);
  const decodedLength = view.getBigUint64(0, true);
  return decodedLength;
}
