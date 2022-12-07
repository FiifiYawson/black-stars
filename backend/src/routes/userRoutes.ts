import express, {Router} from "express"
import { createUser, deleteUser, loginUser, logoutUser } from "../controllers/userController"
import {validate} from "../middleWare/validator"

const router: Router = express.Router()

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/").delete(validate, deleteUser)
router.route("/logout").get(logoutUser)

export = router