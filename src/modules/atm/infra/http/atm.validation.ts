import Joi from "joi";

import { StatusCodes } from "http-status-codes";

import { IATMDepositRequest, IATMWithdrawRequest } from "./atm.controller";

import { ValidationError } from "../../../../shared/infra/http/erros/validationError";

export class ATMValidation {
  static validateDeposit(request: IATMDepositRequest): void {
    const depositSchema = Joi.object({
      value: Joi.number().positive().required(),
    });

    const response = depositSchema.validate(request);

    if (response.error) {
      throw new ValidationError(
        StatusCodes.BAD_REQUEST,
        response.error.message
      );
    }
  }

  static validateWithdraw(request: IATMWithdrawRequest): void {
    const withdrawSchema = Joi.object({
      value: Joi.number().positive().required(),
    });

    const response = withdrawSchema.validate(request);

    if (response.error) {
      throw new ValidationError(
        StatusCodes.BAD_REQUEST,
        response.error.message
      );
    }
  }
}
