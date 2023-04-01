import { ITransaction } from "@modules/transaction/entities/ITransaction";

export interface IATMExtractOutput {
  balance: number;
  transactions: ITransaction[];
}
