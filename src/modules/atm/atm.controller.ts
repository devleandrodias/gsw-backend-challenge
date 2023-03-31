import { Request, Response } from "express";

import { ATMService } from "./atm.service";

export class ATMController {
  private atmService: ATMService;

  constructor() {
    this.atmService = new ATMService();
  }

  async deposit(req: Request, res: Response) {
    await this.atmService.deposit(req.body.value);
    res.status(200).send();
  }

  async withdraw(req: Request, res: Response): Promise<void> {
    await this.atmService.withdraw(req.body.value);
    res.status(200).send();
  }

  async extract(_: Request, res: Response): Promise<void> {
    const balance = await this.atmService.extract();
    res.status(200).json(balance);
  }
}
