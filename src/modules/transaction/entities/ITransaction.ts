import { ETransactionType } from "@shared/enuns/ETransactionType";

export interface ITransaction {
  id: number;
  amount: number;
  type: ETransactionType;
  createdAt: Date;
  updatedAt: Date;
}
