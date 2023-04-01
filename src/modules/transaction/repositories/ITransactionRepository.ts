import { ITransaction } from "../entities/ITransaction";

export interface ITransactionRepository {
  getBalance(): Promise<number>;
  getTransactions(): Promise<ITransaction[]>;
  createTransaction(transaction: ITransaction): Promise<number>;
}
