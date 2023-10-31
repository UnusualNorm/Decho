export enum UintSize {
  Uint16,
  Uint32,
  Uint64,
}

export function toUint8Array(
  size: UintSize,
  number: bigint,
  bigEndian = false,
): Uint8Array {
  switch (size) {
    case UintSize.Uint16: {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);
      view.setUint16(0, Number(number), !bigEndian);
      return new Uint8Array(buffer);
    }
    case UintSize.Uint32: {
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setUint32(0, Number(number), !bigEndian);
      return new Uint8Array(buffer);
    }
    case UintSize.Uint64: {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      view.setBigUint64(0, number, !bigEndian);
      return new Uint8Array(buffer);
    }
  }
}

export function fromUint8Array(
  size: UintSize,
  encodedBytes: Uint8Array,
  bigEndian = false,
): bigint {
  const view = new DataView(encodedBytes.buffer);

  let decodedNumber: bigint;
  switch (size) {
    case UintSize.Uint16:
      decodedNumber = BigInt(view.getUint16(0, !bigEndian));
      break;
    case UintSize.Uint32:
      decodedNumber = BigInt(view.getUint32(0, !bigEndian));
      break;
    case UintSize.Uint64:
      decodedNumber = view.getBigUint64(0, !bigEndian);
      break;
  }

  return decodedNumber;
}

export function littleToBigEndian(size: UintSize, number: bigint): bigint {
  const bytes = toUint8Array(size, number, false);
  return fromUint8Array(size, bytes, true);
}

export function bigToLittleEndian(size: UintSize, number: bigint): bigint {
  const bytes = toUint8Array(size, number, true);
  return fromUint8Array(size, bytes, false);
}
