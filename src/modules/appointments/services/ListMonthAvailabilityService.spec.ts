import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';


let fakeAppointments: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository()
    listMonthAvailability = new ListMonthAvailabilityService(fakeAppointments);
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 5, 20, 8, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 9, 20, 8, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 9, 20, 10, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 9, 21, 8, 0, 0 )
    })
    const availability = await listMonthAvailability.execute({
      provider_id: 'user',
      year:2021,
      month: 10,
    })

    // Fuso horário Brasil = UTC-3

    expect(availability).toEqual(
      expect.arrayContaining([
      { day:19, available:true },
      { day:20, available:false },
      { day:20, available:false },
      { day:21, available:true  },
    ])
    )
  });
});
