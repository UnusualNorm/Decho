export function toHexString(num: number): string {
  return num.toString(16).padStart(2, "0");
}

export const arrayBufferToHexString = (buf: ArrayBuffer) => {
  return Array.from(new Uint8Array(buf)).map(toHexString).join(" ");
};
