import { Request, Response } from 'express'
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req:Request, res:Response): Promise<Response>{
    try {

      const { name, email ,password } = req.body

      const createUser = container.resolve(CreateUserService);

      const users = await createUser.execute({
        name,
        email,
        password,
      });



      return res.json({ user: classToClass(users) })
    } catch (error) {
      return res.status(400).json({error:'Email addres already used'})
    }

  }


}
