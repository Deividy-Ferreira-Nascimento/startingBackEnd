import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointments: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointments,
    );
  });
  it('should be able to list the month appointments on a specific day', async () => {
    const appointments1 = await fakeAppointments.create({
      provider_id: 'provider',
      user_id: '123123',
      date: new Date(2021, 9, 20, 14, 0, 0),
    });

    const appointments2 = await fakeAppointments.create({
      provider_id: 'provider',
      user_id: '123123',
      date: new Date(2021, 9, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day:20,
      month: 10,
      year: 2021,
    });

    // Fuso horário Brasil = UTC-3

    expect(appointments).toEqual([appointments1, appointments2]);

  });
});
