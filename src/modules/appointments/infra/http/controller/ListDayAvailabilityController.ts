import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class ListDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const {  month, year, day } = req.body;

    const listDayAvailability = container.resolve(
      ListDayAvailabilityService,
    );

    const availability = await listDayAvailability.execute({
      provider_id,
      month,
      year,
      day
    });

    return res.json(availability);
  }
}
