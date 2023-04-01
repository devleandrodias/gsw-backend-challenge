import { injectable } from "tsyringe";

import { IBankNote } from "@modules/atm/dtos/atm.withdraw.dtos";
import { IATMRepository } from "@modules/atm/repositories/IATMRepository";

@injectable()
export class ATMInMemoryRepository implements IATMRepository {
  async getAvailableBankNotes(): Promise<IBankNote[]> {
    return [
      {
        value: 100,
        quantityAvailable: 3,
      },
      {
        value: 50,
        quantityAvailable: 1,
      },
      {
        value: 20,
        quantityAvailable: 1000,
      },
      {
        value: 10,
        quantityAvailable: 1000,
      },
    ];
  }
}
