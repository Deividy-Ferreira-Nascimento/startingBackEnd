import { Router } from "express";
import CreateAppointmentService from '../services/CreateAppointmentService'
import { parseISO } from 'date-fns'
import AppointmentsRepository from "../repositories/AppointmentRepository";




const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository()


appointmentsRouter.get('/', (req, res) => {
  const appointmentsList = appointmentsRepository.all()

  return res.json(appointmentsList);
})

appointmentsRouter.post('/', (req,res) => {
 try {
  const { provider, date } = req.body

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = createAppointment.execute({ provider, date:parsedDate });

  return res.json(appointment)

 } catch (err) {
  return res.status(400).json({error:'This appointment is already booked'})
 }

})

export default appointmentsRouter
