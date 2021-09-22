import { Router } from "express";
import CreateAppointmentService from '../services/CreateAppointmentService'
import { parseISO } from 'date-fns'
import AppointmentsRepository from "../repositories/AppointmentRepository";
import { getCustomRepository } from 'typeorm'




const appointmentsRouter = Router();



appointmentsRouter.get('/',async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointmentsList = await appointmentsRepository.find()

  return res.json(appointmentsList);
})

appointmentsRouter.post ('/', async (req,res) => {

 try {
  const { provider_id, date } = req.body

  const parsedDate = parseISO(date);


  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ provider_id, date:parsedDate });

  return res.json(appointment)

 } catch (err) {
  return res.status(400).json({err:'This appointment is already booked'})
 }

})

export default appointmentsRouter
