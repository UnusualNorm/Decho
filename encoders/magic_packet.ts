import { encodePacket, Packet } from "../encoder.ts";
import { constant, headerLookup, magicNumberLookup } from "../packet.ts";

// TODO: Move this out of here, and into a more general location
export enum ServiceType {
  Config,
  Login,
  Matchmaking,
  Transaction,
}

export const getMagicNumber = (serviceType: ServiceType): number => {
  switch (serviceType) {
    case ServiceType.Config:
      return magicNumberLookup.config.magic_packet;
    case ServiceType.Login:
      return magicNumberLookup.login.magic_packet;
    case ServiceType.Matchmaking:
      throw new Error("Matchmaking not implemented");
    case ServiceType.Transaction:
      return magicNumberLookup.transaction.magic_packet;

    default:
      throw new Error("Invalid service type");
  }
};

export function encodeMagicPacket(
  serviceType: ServiceType,
  magicNumber = getMagicNumber(serviceType),
): ArrayBuffer {
  const packet: Packet = {
    constant,
    header: headerLookup.magic_packet,
    payload: new Uint8Array([magicNumber]),
  };

  return encodePacket(packet);
}
