import { ITransaction } from "../../transaction/entities/ITransaction";

export interface IATMExtractOutput {
  balance: number;
  transactions: ITransaction[];
}
