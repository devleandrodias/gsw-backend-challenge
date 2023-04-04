import { Knex } from "knex";

import { knexDataSource } from "@shared/infra/knex";
import { IATMNote } from "@modules/atm/entities/IATMNote";
import { IATMNoteRepository } from "@modules/atm/repositories/IATMNoteRepository";

export class ATMNoteRepository implements IATMNoteRepository {
  private readonly tableName = "atm_notes";
  private readonly database: Knex = knexDataSource;

  async getAvailableATMNotes(): Promise<IATMNote[]> {
    return this.database(this.tableName).select();
  }

  async debitNoteQuantity(note: number, quantity: number): Promise<void> {
    await this.database(this.tableName)
      .where("note", note)
      .decrement("quantity", quantity);
  }
}
