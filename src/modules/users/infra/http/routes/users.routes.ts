import { Router } from "express";
import UsersController from "../controller/UsersController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from '@config/upload'
import UserAvatarController from "../controller/UserAvatarController";


const usersRouter = Router();
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


usersRouter.post('/', usersController.create );

usersRouter.patch('/avatar', ensureAuthenticated,upload.single('avatar'), userAvatarController.update )

export default usersRouter




