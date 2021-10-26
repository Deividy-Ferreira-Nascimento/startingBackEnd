import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import ListDayAvailabilityService from './ListDayAvailabilityService';

let fakeAppointments: FakeAppointmentsRepository;
let listDayAvailability: ListDayAvailabilityService;

describe('ListDayAvailability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository();
    listDayAvailability = new ListDayAvailabilityService(fakeAppointments);
  });
  it('should be able to list the month availability from provider', async () => {

    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',

      date: new Date(2021, 9, 21, 14, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2021, 9, 21, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 21, 11).getTime();
    })

    const availability = await listDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 10,
      day: 21,
    });

    // Fuso horário Brasil = UTC-3

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },


      ]),
    );
  });
});
