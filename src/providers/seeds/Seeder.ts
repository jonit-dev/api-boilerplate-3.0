import { provide } from "inversify-binding-decorators";

@provide(Seeder)
export class Seeder {
  constructor() {}

  public async start(): Promise<void> {
    // Add your seeders here
  }
}
