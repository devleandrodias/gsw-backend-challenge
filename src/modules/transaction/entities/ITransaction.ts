import { ETransactionType } from "@shared/enuns/ETransactionType";

export interface ITransaction {
  id: string;
  amount: number;
  type: ETransactionType;
}
