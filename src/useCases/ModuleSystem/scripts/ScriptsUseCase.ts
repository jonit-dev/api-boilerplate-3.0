import { MathHelper } from "@providers/math/MathHelper";
import { provide } from "inversify-binding-decorators";

@provide(ScriptsUseCase)
export class ScriptsUseCase {
  constructor(private mathHelper: MathHelper) {}
}
