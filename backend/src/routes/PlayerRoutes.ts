import express, {Router} from "express"
import {validate} from "../middleWare/validator"
import { getAllPlayers, createPlayer, deletePlayer, updatePlayer } from "../controllers/PlayerController"

const router: Router = express.Router()

router.route("/").post(validate, createPlayer)
router.route("/").get(validate, getAllPlayers)
router.route("/:id").put(validate, updatePlayer)
router.route("/:id").delete(validate, deletePlayer)

export = router