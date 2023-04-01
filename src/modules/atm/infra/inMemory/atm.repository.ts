import { injectable } from "tsyringe";

import { IATMRepository } from "@modules/atm/repositories/IATMRepository";

@injectable()
export class ATMInMemoryRepository implements IATMRepository {
  async getAvailableBankNotes(): Promise<number[]> {
    return [100, 50, 20, 10];
  }
}
