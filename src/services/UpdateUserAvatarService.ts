import { getRepository } from 'typeorm';
import User from '../models/User'

interface Request {
  user_id: string ;
  avatarFilename: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}:Request): Promise <void>{
    const usersRepository = getRepository(User);

    
  }
}

export default UpdateUserAvatarService
