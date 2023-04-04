import { injectable } from "tsyringe";

import { IATMNote } from "@modules/atm/entities/IATMNote";
import { IATMNoteRepository } from "@modules/atm/repositories/IATMNoteRepository";

@injectable()
export class ATMNoteInMemoryRepository implements IATMNoteRepository {
  private availableNotes: IATMNote[] = [
    { id: Math.random(), note: 100, quantity: 100 },
    { id: Math.random(), note: 50, quantity: 100 },
    { id: Math.random(), note: 20, quantity: 100 },
    { id: Math.random(), note: 10, quantity: 100 },
  ];

  async getAvailableATMNotes(): Promise<IATMNote[]> {
    return this.availableNotes;
  }

  async debitNoteQuantity(note: number, quantity: number): Promise<void> {
    const noteIndex = this.availableNotes.findIndex((n) => n.note === note);
    if (noteIndex === -1) {
      throw new Error(`Note with value ${note} not available`);
    }

    const availableQuantity = this.availableNotes[noteIndex].quantity;
    if (availableQuantity < quantity) {
      throw new Error(`Not enough ${note} notes available`);
    }

    this.availableNotes[noteIndex].quantity -= quantity;
  }
}
