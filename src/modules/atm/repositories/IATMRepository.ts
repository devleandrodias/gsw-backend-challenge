import { IATMDepositOutput } from "../dtos/atm.deposit.dtos";
import { IATMExtractOutput } from "../dtos/atm.extract.dtos";
import { IATMWithdrawOutput } from "../dtos/atm.withdraw.dtos";

export interface IATMRepository {
  extract(): Promise<IATMExtractOutput>;
  deposit(value: number): Promise<IATMDepositOutput>;
  withdraw(value: number): Promise<IATMWithdrawOutput>;
}
