import { InMemoryHashTable } from "@providers/database/InMemoryHashTable";
import { InMemoryRepository } from "@providers/database/InMemoryRepository";
import { RedisManager } from "@providers/database/RedisManager";

import { HeapMonitor } from "@providers/server/HeapMonitor";
import { PM2Helper } from "@providers/server/PM2Helper";
import { SocketAdapter } from "@providers/sockets/SocketAdapter";
import { SocketEventsBinder } from "@providers/sockets/SocketEventsBinder";

import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Cronjob } from "../cronjobs/CronJobs";
import { Seeder } from "../seeds/Seeder";
import { Database } from "../server/Database";
import { ServerHelper } from "../server/ServerHelper";
import {
  abTestsControllerContainer,
  dbTasksControllerContainer,
  formControllerContainer,
  useCasesControllers,
  userControllerContainer,
} from "./ControllersInversify";

const container = new Container();

container.load(
  buildProviderModule(),
  userControllerContainer,
  dbTasksControllerContainer,
  abTestsControllerContainer,
  formControllerContainer,
  useCasesControllers
);

export const db = container.get<Database>(Database);
export const cronJobs = container.get<Cronjob>(Cronjob);
export const seeds = container.get<Seeder>(Seeder);
export const server = container.get<ServerHelper>(ServerHelper);
export const socketAdapter = container.get<SocketAdapter>(SocketAdapter);

export const socketEventsBinder = container.get<SocketEventsBinder>(SocketEventsBinder);

export const redisManager = container.get<RedisManager>(RedisManager);

export const inMemoryRepository = container.get<InMemoryRepository>(InMemoryRepository);

export const inMemoryHashTable = container.get<InMemoryHashTable>(InMemoryHashTable);

export const heapMonitor = container.get<HeapMonitor>(HeapMonitor);

export const pm2Helper = container.get<PM2Helper>(PM2Helper);

export { container };
