export type Config = {
  id: string;
  type: string;
  [key: string]: unknown;
};

export const isConfig = (data: unknown): data is Config =>
  typeof data === "object" && data !== null &&
  "id" in data && typeof data.id === "string" &&
  "type" in data && typeof data.type === "string";
