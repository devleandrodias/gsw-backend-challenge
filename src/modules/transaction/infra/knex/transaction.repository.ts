import { Knex } from "knex";
import { injectable } from "tsyringe";

import { knexDataSource } from "@shared/infra/knex/index";
import { ETransactionType } from "@shared/enuns/ETransactionType";
import { ITransaction } from "@modules/transaction/entities/ITransaction";
import { ITransactionRepository } from "@modules/transaction/repositories/ITransactionRepository";

@injectable()
export class TransactionRepository implements ITransactionRepository {
  private readonly tableName = "transactions";
  private readonly database: Knex = knexDataSource;

  async getTransactions(): Promise<ITransaction[]> {
    return this.database(this.tableName).select();
  }

  async createTransaction(
    type: ETransactionType,
    amount: number
  ): Promise<void> {
    await this.database(this.tableName).insert({ type, amount });
  }
}
