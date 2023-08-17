export type ConfigRequest = {
  unknownByte1: number;
  type: string;
  id: string;
  unknownByte2: number;
};

export function isConfigRequest(object: unknown): object is ConfigRequest {
  return (
    typeof object === "object" &&
    object !== null &&
    "type" in object &&
    "id" in object &&
    "unknownByte1" in object &&
    typeof object.type === "string" &&
    typeof object.id === "string" &&
    typeof object.unknownByte1 === "number"
  );
}

export function decodeConfigRequestPayload(
  payload: ArrayBuffer,
): ConfigRequest {
  const view = new DataView(payload);
  const unknownByte1 = view.getUint8(0);
  const unknownByte2 = view.getUint8(payload.byteLength - 1);

  const json = new TextDecoder().decode(
    payload.slice(1, payload.byteLength - 1),
  );
  const request = JSON.parse(json);
  request.unknownByte1 = unknownByte1;
  request.unknownByte2 = unknownByte2;

  if (!isConfigRequest(request)) throw new Error("Invalid request json");
  return request;
}
