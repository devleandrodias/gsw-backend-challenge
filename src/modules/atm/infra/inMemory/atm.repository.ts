import { injectable } from "tsyringe";

import { IATMNote } from "@modules/atm/entities/IATMNote";
import { IATMNoteRepository } from "@modules/atm/repositories/IATMNoteRepository";

@injectable()
export class ATMNoteInMemoryRepository implements IATMNoteRepository {
  async getAvailableATMNotes(): Promise<IATMNote[]> {
    return [
      { id: Math.random(), note: 100, quantity: 100 },
      { id: Math.random(), note: 50, quantity: 100 },
      { id: Math.random(), note: 20, quantity: 100 },
      { id: Math.random(), note: 10, quantity: 100 },
    ];
  }
}
