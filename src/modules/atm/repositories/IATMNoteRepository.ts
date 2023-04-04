import { IATMNote } from "../entities/IATMNote";

export interface IATMNoteRepository {
  getAvailableATMNotes(): Promise<IATMNote[]>;
  debitNoteQuantity(note: number, quantity: number): Promise<void>;
}
