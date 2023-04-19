import { ChatSocketEvents, ItemSocketEvents } from "@rpg-engine/shared";

export const USER_CONTROL_ONLINE = {
  MAX_NUMBER_OF_PLAYERS: 30,
  MAX_NUMBER_ACC_PER_USER: 20,
};

export const USER_EXHAUST_TIMEOUT = 1500;

export const EXHAUSTABLE_EVENTS = [
  ChatSocketEvents.GlobalChatMessageCreate,
  ChatSocketEvents.GlobalChatMessageRead,
  ItemSocketEvents.UseWith,
  "CastSpell",
  "UseWithTile",
  "UseWithItem",
  ItemSocketEvents.Use,
] as string[];
