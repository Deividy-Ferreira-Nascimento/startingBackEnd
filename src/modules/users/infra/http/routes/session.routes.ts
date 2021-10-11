import { Router } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
const sessionsRouter = Router();



sessionsRouter.post ('/', async (req,res) => {


    const { email, password } =req.body

    const authenticateUser = container.resolve(AuthenticateUserService);

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




