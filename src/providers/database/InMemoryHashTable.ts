import { appEnv } from "@providers/config/env";
import { provide } from "inversify-binding-decorators";
import { RedisManager } from "./RedisManager";

export enum NamespaceRedisControl {
  CharacterSpell = "character-spell",
  CharacterLastAction = "character-last-action",
  CharacterViewType = "character-view",
  CharacterFoodConsumption = "character-food-consumption",
}

@provide(InMemoryHashTable)
export class InMemoryHashTable {
  constructor(private redisManager: RedisManager) {}

  public async set(namespace: string, key: string, value: any): Promise<void> {
    await this.redisManager.client.hSet(namespace?.toString(), key?.toString(), JSON.stringify(value));
  }

  public async expire(key: string, seconds: number, mode: "NX" | "XX" | "GT" | "LT"): Promise<void> {
    if (!appEnv.general.IS_UNIT_TEST) {
      await this.redisManager.client.expire(key?.toString(), seconds, mode);
    }
  }

  public async getAll<T>(namespace: string): Promise<Record<string, T> | undefined> {
    const values = await this.redisManager.client.hGetAll(namespace?.toString());

    if (!values) {
      return;
    }

    return this.parseObject(values);
  }

  public async has(namespace: string, key: string): Promise<boolean> {
    const result = await this.redisManager.client.hExists(namespace?.toString(), key?.toString());

    return Boolean(result);
  }

  public async hasAll(namespace: string): Promise<boolean> {
    const result = await this.redisManager.client.exists(namespace?.toString());

    // @ts-ignore
    return result === 1;
  }

  public async get(namespace: string, key: string): Promise<Record<string, any> | undefined> {
    const value = await this.redisManager.client.hGet(namespace?.toString(), key?.toString());

    if (!value) {
      return;
    }

    return JSON.parse(value);
  }

  public async delete(namespace: string, key: string): Promise<void> {
    await this.redisManager.client.hDel(namespace?.toString(), key?.toString());
  }

  public async deleteAll(namespace: string): Promise<void> {
    await this.redisManager.client.del(namespace?.toString());
  }

  private parseObject(object: Record<string, string>): Record<string, any> {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: JSON.parse(value),
      };
    }, {});
  }
}
