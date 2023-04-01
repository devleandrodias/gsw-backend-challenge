import { ETransactionType } from "@shared/enuns/ETransactionType";

import { ITransaction } from "../entities/ITransaction";

export interface ITransactionRepository {
  getTransactions(): Promise<ITransaction[]>;
  createTransaction(type: ETransactionType, amount: number): Promise<void>;
}
