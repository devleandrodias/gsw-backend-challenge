import { container } from "tsyringe";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ATMService } from "../../atm.service";
import { ATMValidation } from "./atm.validation";

export interface IATMDepositRequest {
  value: number;
}

export interface IATMWithdrawRequest {
  value: number;
}

export class ATMController {
  async deposit(req: Request, res: Response): Promise<void> {
    const { value } = req.body;

    const request: IATMDepositRequest = { value };
    ATMValidation.validateDeposit(request);

    const atmService = container.resolve(ATMService);
    const response = await atmService.deposit(request);

    res.status(StatusCodes.OK).json(response);
  }

  async withdraw(req: Request, res: Response): Promise<void> {
    const { value } = req.body;

    const request: IATMWithdrawRequest = { value };
    ATMValidation.validateWithdraw(request);

    const atmService = container.resolve(ATMService);
    const response = await atmService.withdraw(request);

    res.status(StatusCodes.OK).json(response);
  }

  async extract(_: Request, res: Response): Promise<void> {
    const atmService = container.resolve(ATMService);
    const response = await atmService.extract();

    res.status(StatusCodes.OK).json(response);
  }
}
