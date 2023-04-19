import { IUser } from "@entities/ModuleSystem/UserModel";

import { appEnv } from "@providers/config/env";

import { provideSingleton } from "@providers/inversify/provideSingleton";
import { SocketMessaging } from "./SocketMessaging";

@provideSingleton(SocketAuth)
export class SocketAuth {
  constructor(private socketMessaging: SocketMessaging) {}

  // this event makes sure that the user who's triggering the request actually owns the character!
  public authCharacterOn(channel, event: string, callback: (data, owner: IUser) => Promise<any>): void {
    channel.on(event, async (data: any) => {
      let owner, character;

      try {
        // check if authenticated user actually owns the character (we'll fetch it from the payload id);
        owner = channel?.userData || (channel?.handshake?.query?.userData as IUser);

        if (appEnv.general.DEBUG_MODE && !appEnv.general.IS_UNIT_TEST) {
          console.log("⬇️ (RECEIVED): ", character.name, character.channelId!, event);
        }

        try {
          await callback(data, owner);
        } catch (e) {
          console.error(e);
        }
        // console.log(`📨 Received ${event} from ${character.name}(${character._id}): ${JSON.stringify(data)}`);
      } catch (error) {
        console.error(`${character.name} => ${event}, channel ${channel} failed with error: ${error}`);
      }
    });
  }
}
