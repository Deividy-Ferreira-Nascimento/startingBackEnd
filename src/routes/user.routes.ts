import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

const appointmentsRouter = Router();


appointmentsRouter.post ('/', async (req,res) => {

  try {
    const { name, email ,password } = req.body

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

   const views = {
    id: user.id,
    name: user.name,
    email:user.email,
    created_at: user.created_at,
    updated_at: user.updated_at
   }

    return res.json(views)
  } catch (error) {
    return res.status(400).json({error:'Email addres already used'})
  }


})

export default appointmentsRouter




