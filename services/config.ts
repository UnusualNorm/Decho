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
    if (packet.header !== SNSConfigRequestv2Header) {
      console.warn(
        `[config] Client sent invalid packet... (${
          packet.header.toString(16)
        })`,
      );
      return;
    }

    console.log(
      `[config] Client requested config... (${packet.data.config.type}, ${packet.data.config.id})`,
    );

    const config = getConfig(packet.data.config.type, packet.data.config.id);
    if (!config) {
      console.error(
        `[config] Failed to find config... (${packet.data.config.type}, ${packet.data.config.id})`,
      );
      return;
    }

    sendPacket({
      header: SNSConfigSuccessv2Header,
      data: {
        type: typeStringToInt(config.type)!,
        id: idStringToInt(config.id)!,
        config,
      },
    });

    sendPacket({
      header: STcpConnectionUnrequireEventHeader,
      data: {
        unknownByte: 0x04,
      },
    });

    console.info(
      `[config] Sent requested config! (${config.type}, ${config.id})`,
    );
  },
);
