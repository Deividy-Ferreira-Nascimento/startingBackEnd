import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICashProvider from '@shared/container/providers/CacheProvider/models/ICashProvider'

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}



@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICashProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    day,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('asd')

    console.log(cacheData)

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      day,
      month,
      provider_id,
      year
    })

    //await this.cacheProvider.save('asd','asd')

    return appointments
  }
}

export default ListProviderAppointmentsService;
