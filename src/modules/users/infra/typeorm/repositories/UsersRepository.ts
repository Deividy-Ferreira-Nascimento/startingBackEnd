import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class UsersRepository implements IUsersRepository {

  private ormRepository:Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id:string):Promise<User | undefined> {
    const userData = await this.ormRepository.findOne(id)

    return userData
  }

  public async findByEmail(email:string):Promise<User | undefined> {
    const userData = await this.ormRepository.findOne({
      where: { email }
    })

    return userData
  }

  public async create(userData:ICreateUserDTO):Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }


}

export default UsersRepository;
