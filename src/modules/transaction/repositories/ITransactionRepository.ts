import { ITransaction } from "../entities/ITransaction";
import { ETransactionType } from "../../../shared/enuns/ETransactionType";

export interface ITransactionRepository {
  getTransactions(): Promise<ITransaction[]>;
  createTransaction(type: ETransactionType, amount: number): Promise<void>;
}
