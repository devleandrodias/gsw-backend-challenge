import Joi from "joi";
import { StatusCodes } from "http-status-codes";

import { IATMDepositInput } from "../../dtos/atm.deposit.dtos";
import { IATMWithdrawInput } from "../../dtos/atm.withdraw.dtos";
import { ValidationError } from "../../../../shared/infra/http/erros/validationError";

export class ATMValidation {
  static validateDeposit(input: IATMDepositInput): void {
    const depositSchema = Joi.object({
      amount: Joi.number().positive().required(),
    });

    const response = depositSchema.validate(input);

    if (response.error) {
      throw new ValidationError(
        StatusCodes.BAD_REQUEST,
        response.error.message
      );
    }
  }

  static validateWithdraw(input: IATMWithdrawInput): void {
    const withdrawSchema = Joi.object({
      amount: Joi.number().positive().required(),
    });

    const response = withdrawSchema.validate(input);

    if (response.error) {
      throw new ValidationError(
        StatusCodes.BAD_REQUEST,
        response.error.message
      );
    }
  }
}
