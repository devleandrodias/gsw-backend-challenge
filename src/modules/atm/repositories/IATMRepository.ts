import { IBankNote } from "../dtos/atm.withdraw.dtos";

export interface IATMRepository {
  getAvailableBankNotes(): Promise<IBankNote[]>;
}
