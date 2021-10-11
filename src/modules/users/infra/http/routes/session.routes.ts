import { Router } from "express";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
const sessionsRouter = Router();
import UsersRepository from "../../typeorm/repositories/UsersRepository";



sessionsRouter.post ('/', async (req,res) => {


    const { email, password } =req.body
    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    const view = {
      user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,

      },
      token:token

    }

    return res.json( view )


})

export default sessionsRouter




