import { IBankNote } from "../dtos/atm.withdraw.dtos";

export interface IATM {
  id: string;
  availableBankNotes: IBankNote[];
}
