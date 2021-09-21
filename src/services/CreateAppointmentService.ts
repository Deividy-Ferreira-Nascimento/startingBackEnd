import { startOfHour } from "date-fns";
import Appointment from "../models/Appointments";
import AppointmentRepository from '../repositories/AppointmentRepository'

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  private appointmentsRepository: AppointmentRepository;

  constructor (appointmentRepository:AppointmentRepository ) {
    this.appointmentsRepository = appointmentRepository;
  }

  public execute({ provider, date }:RequestDTO): Appointment {
    const appointmentDate = startOfHour(date)


  const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

  if(findAppointmentInSameDate) {
    throw Error('This appointment is already booked')
  }

  const NewAppointment = new Appointment({provider, date:appointmentDate})

  this.appointmentsRepository.create({date:appointmentDate, provider})

  return NewAppointment;
  }

}

export default CreateAppointmentService;
