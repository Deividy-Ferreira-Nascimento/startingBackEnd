import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from "./CreateAppointmentService";

describe('CreateAppointments', () => {
  it('should be able to create a new appointment', async () => {

    const fakeAppointmentsRepository =  new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date,
      provider_id: '123123'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');

  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository =  new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date(2021, 9, 12, 10)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123'
    })).rejects.toBeInstanceOf(AppError);

  })



})
