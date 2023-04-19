// @ts-ignore
import { ICharacter } from "@entities/ModuleCharacter/CharacterModel";

import { appEnv } from "@providers/config/env";
import { SocketAdapter } from "@providers/sockets/SocketAdapter";
import { EnvType, IUIShowMessage, UIMessageType, UISocketEvents } from "@rpg-engine/shared";
import { provide } from "inversify-binding-decorators";

@provide(SocketMessaging)
export class SocketMessaging {
  constructor(private socketAdapter: SocketAdapter) {}

  public sendErrorMessageToCharacter(character: ICharacter, message?: string, type: UIMessageType = "error"): void {
    if (appEnv.general.ENV === EnvType.Development && !appEnv.general.IS_UNIT_TEST) {
      console.log(`✉︎ Error sent to ${character.name}: ${message}`);
    }

    this.sendEventToUser<IUIShowMessage>(character.channelId!, UISocketEvents.ShowMessage, {
      message: message ?? "Sorry, not possible.",
      type,
    });
  }

  public sendEventToUser<T>(userChannel: string, eventName: string, data?: T): void {
    this.socketAdapter.emitToUser(userChannel, eventName, data || {});
  }

  public sendEventToAllUsers<T>(eventName: string, data?: T): void {
    this.socketAdapter.emitToAllUsers(eventName, data || {});
  }
}
