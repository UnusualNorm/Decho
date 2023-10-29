export const isArrayBuffer = (data: unknown): data is ArrayBuffer =>
  data instanceof ArrayBuffer;
