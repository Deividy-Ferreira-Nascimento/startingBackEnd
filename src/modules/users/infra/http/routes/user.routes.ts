import { Router } from "express";
import CreateUserService from "@modules/users/services/CreateUserService";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from '@config/upload'
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig)



usersRouter.post ('/users', async (req,res) => {

  try {
    const usersRepository = new UsersRepository();
    const { name, email ,password } = req.body

    const createUser = new CreateUserService(usersRepository);

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


});

usersRouter.patch('/avatar', ensureAuthenticated,upload.single('avatar'), async (req, res) => {

    const usersRepository = new UsersRepository();
    const updateUserAvatar= new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    })
    const views = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
    return res.json(views)

} )

export default usersRouter




