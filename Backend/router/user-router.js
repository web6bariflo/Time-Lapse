import {Router} from 'express'
import { login, signup, userDatas } from '../controller/auth-controller.js'
import userMiddleware from '../middleware/user-middleware.js'


const authRouter = Router()
authRouter.route("/signup").post(signup)
authRouter.route("/login").post(login)
authRouter.route("/userdata").get(userMiddleware,userDatas)

export default authRouter