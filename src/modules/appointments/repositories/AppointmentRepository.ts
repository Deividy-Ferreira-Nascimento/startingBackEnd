import { EntityRepository, Repository } from 'typeorm';

import Appoitment from '../infra/typeorm/entities/Appointments';

@EntityRepository(Appoitment)
class AppointmentsRepository extends Repository<Appoitment> {
  public async findByDate(date: Date): Promise<Appoitment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
