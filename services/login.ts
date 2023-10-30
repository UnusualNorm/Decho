import { magicNumber } from "../types/packet.ts";
import { PrEfIxeula } from "../types/document.ts";
import { fromUint8Array, toUint8Array, UintSize } from "../utils/endian.ts";
import { createBasicService } from "../utils/service.ts";

import login_settings from "../data/login_settings.json" assert {
  type: "json",
};
import user_profile from "../data/user_profile.json" assert {
  type: "json",
};
import eula from "../data/eula.json" assert {
  type: "json",
};

import { STcpConnectionUnrequireEventHeader } from "../packets/STcpConnectionUnrequireEvent.ts";
import { SNSLogInSuccessHeader } from "../packets/SNSLogInSuccess.ts";
import { SNSLoginRequestV2Header } from "../packets/SNSLoginRequestV2.ts";
import { SNSLoginSettingsHeader } from "../packets/SNSLoginSettings.ts";
import { SNSLoggedInUserProfileSuccessHeader } from "../packets/SNSLoggedInUserProfileSuccess.ts";
import { SNSLoggedInUserProfileRequestHeader } from "../packets/SNSLoggedInUserProfileRequest.ts";
import { SNSDocumentSuccessHeader } from "../packets/SNSDocumentSuccess.ts";

createBasicService(
  "login",
  8000,
  () => {},
  () => {},
  (_socket, packet, sendPacket) => {
    console.log(packet.header.toString(16));
    switch (packet.header) {
      case SNSLoginRequestV2Header: {
        console.log("Got Login request");
        const ovr_id = packet.payload.slice(24, 32);

        const loginID = new Uint8Array(16).fill(0xFF);
        const unknown = toUint8Array(
          UintSize.Uint64,
          0x0400000000000000n,
          true,
        );

        sendPacket({
          magicNumber,
          decoded: false,
          header: SNSLogInSuccessHeader,
          payload: new Uint8Array([
            ...loginID,
            ...unknown,
            ...ovr_id,
          ]),
        });
        console.log("Sent login confirmation");

        sendPacket({
          magicNumber,
          decoded: true,
          header: STcpConnectionUnrequireEventHeader,
          payload: {
            unknownByte: 0x4b,
          },
        });
        console.log("Sent auth acknowledgement");

        sendPacket({
          magicNumber,
          decoded: true,
          header: SNSLoginSettingsHeader,
          payload: login_settings,
        });
        console.log("Sent auth login_settings");
        break;
      }
      case SNSLoggedInUserProfileRequestHeader: {
        const ovr_id = fromUint8Array(
          UintSize.Uint64,
          packet.payload.slice(24, 32),
          true,
        );

        const unknown = 0x0400000000000000n;
        sendPacket({
          magicNumber,
          header: SNSLoggedInUserProfileSuccessHeader,
          decoded: true,
          payload: {
            unknownHeader: unknown,
            oculusId: ovr_id,
            userProfile: user_profile,
          },
        });
        console.log("Sending player information");

        sendPacket({
          magicNumber,
          decoded: true,
          header: STcpConnectionUnrequireEventHeader,
          payload: {
            unknownByte: 0x4b,
          },
        });
        console.log("Sending player info acknowledgement");

        sendPacket({
          magicNumber,
          decoded: true,
          header: SNSDocumentSuccessHeader,
          payload: {
            prefix: PrEfIxeula,
            document: eula,
          },
        });
        console.log("Sending eula");

        sendPacket({
          magicNumber,
          decoded: true,
          header: STcpConnectionUnrequireEventHeader,
          payload: {
            unknownByte: 0x4b,
          },
        });
        console.log("Sending eula acknowledgement");
        break;
      }
    }
  },
);
