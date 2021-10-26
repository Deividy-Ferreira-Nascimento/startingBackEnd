import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';


let fakeAppointments: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository()
    listMonthAvailability = new ListMonthAvailabilityService(fakeAppointments);
  });
  it('should be able to list the month availability from provider', async () => {

    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2021, 9, 20, 8, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 9, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 10, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 11, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 12, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 13, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 14, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 15, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 16, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 20, 17, 0, 0 )
    })
    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 21, 9, 0, 0 )
    })
    const availability = await listMonthAvailability.execute({
      provider_id: 'user',
      year:2021,
      month: 10,
    })

    // Fuso horário Brasil = UTC-3

    expect(availability).toEqual(
      expect.arrayContaining([

      { day:20, available:false },

      { day:21, available:true  },
    ])
    )
  });
});
