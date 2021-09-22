import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";
const sessionsRouter = Router();


sessionsRouter.post ('/', async (req,res) => {

  try {
    const { email, password } =req.body

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    const view = {
      user: {
      id: user.id,
      name: user.name,
      email: user.email,
      creted_at: user.created_at,
      updated_at: user.updated_at,

      },
      token:token

    }

    return res.json( view )
  } catch (error) {
    return res.status(400).json({error:'incorrect email/password combination'})
  }


})

export default sessionsRouter




