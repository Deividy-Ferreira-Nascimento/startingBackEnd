import { Router } from "express";
import { parseISO } from 'date-fns'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";



const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

const appointmentsRepository = new AppointmentsRepository()



/*appointmentsRouter.get('/',async (req, res) => {

  const appointmentsList = await appointmentsRepository.find()

  return res.json(appointmentsList);
})*/

appointmentsRouter.post ('/', async (req,res) => {


  const { provider_id, date } = req.body

  const parsedDate = parseISO(date);


  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
    );

  const appointment = await createAppointment.execute({ provider_id, date:parsedDate });

  return res.json(appointment)



})

export default appointmentsRouter
