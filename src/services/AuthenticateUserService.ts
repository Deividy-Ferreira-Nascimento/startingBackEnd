import { getRepository } from 'typeorm'
import User from '../models/User';
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'



interface Request {
email: string,
password: string

}

interface Response {
  user: User,
  token: string,

}

class AuthenticateUserService {

  public async execute({ email,password }:Request):Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new Error('incorrect email/password combination')

    }
    const token = sign({}, '61db4d28b0056eb74bb029d93f407761d93f7f1a ', {
      subject: user.id,
      expiresIn: '1d',

    })
    return {
      user,
      token
    }
  }


}

export default AuthenticateUserService;
