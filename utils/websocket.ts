export const isBinaryMessage = (data: unknown): data is ArrayBuffer => {
  return data instanceof ArrayBuffer;
};
