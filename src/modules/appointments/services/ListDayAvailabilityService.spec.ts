import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import ListDayAvailabilityService from './ListDayAvailabilityService';

let fakeAppointments: FakeAppointmentsRepository;
let listDayAvailability: ListDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository();
    listDayAvailability = new ListDayAvailabilityService(fakeAppointments);
  });
  it('should be able to list the month availability from provider', async () => {

    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 9, 21, 8, 0, 0),
    });
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2021, 9, 21, 10, 0, 0),
    });
    const availability = await listDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 10,
      day: 21,
    });

    // Fuso horário Brasil = UTC-3

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },

      ]),
    );
  });
});
