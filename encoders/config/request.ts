export type ConfigRequest = {
  type: string;
  id: string;
};

export function isConfigRequest(object: unknown): object is ConfigRequest {
  return (
    typeof object === "object" &&
    object !== null &&
    "type" in object &&
    "id" in object &&
    typeof object.type === "string" &&
    typeof object.id === "string"
  );
}

export function decodeConfigRequestPayload(
  payload: ArrayBuffer
): ConfigRequest {
  const view = new DataView(payload);
  const _requestByte = view.getUint8(0);

  const json = new TextDecoder().decode(payload.slice(1));
  const request = JSON.parse(json);

  if (!isConfigRequest(request)) throw new Error("Invalid request json");
  return request;
}
