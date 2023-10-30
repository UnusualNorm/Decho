import { magicNumber } from "../types/packet.ts";
import { getConfig, idStringToInt, typeStringToInt } from "../utils/config.ts";
import { createBasicService } from "../utils/service.ts";

import { SNSConfigRequestv2Header } from "../packets/SNSConfigRequestv2.ts";
import { SNSConfigSuccessv2Header } from "../packets/SNSConfigSuccessv2.ts";
import { STcpConnectionUnrequireEventHeader } from "../packets/STcpConnectionUnrequireEvent.ts";

createBasicService(
  "config",
  8003,
  () => {},
  () => {},
  (_socket, packet, sendPacket) => {
    if (!packet.decoded) return;
    if (packet.header !== SNSConfigRequestv2Header) {
      console.warn(
        `[config] Client sent invalid packet... (${
          packet.header.toString(16)
        })`,
      );
      return;
    }

    console.log(
      `[config] Client requested config... (${packet.payload.config.type}, ${packet.payload.config.id})`,
    );

    const config = getConfig(
      packet.payload.config.type,
      packet.payload.config.id,
    );
    if (!config) {
      console.error(
        `[config] Failed to find config... (${packet.payload.config.type}, ${packet.payload.config.id})`,
      );
      return;
    }

    sendPacket({
      magicNumber,
      decoded: true,
      header: SNSConfigSuccessv2Header,
      payload: {
        type: typeStringToInt(config.type)!,
        id: idStringToInt(config.id)!,
        config,
      },
    });

    sendPacket({
      magicNumber,
      decoded: true,
      header: STcpConnectionUnrequireEventHeader,
      payload: {
        unknownByte: 0x04,
      },
    });

    console.info(
      `[config] Sent requested config! (${config.type}, ${config.id})`,
    );
  },
);
