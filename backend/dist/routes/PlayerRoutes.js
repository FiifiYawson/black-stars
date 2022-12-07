"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const validator_1 = require("../middleWare/validator");
const PlayerController_1 = require("../controllers/PlayerController");
const router = express_1.default.Router();
router.route("/").post(validator_1.validate, PlayerController_1.createPlayer);
router.route("/").get(validator_1.validate, PlayerController_1.getAllPlayers);
router.route("/:id").put(validator_1.validate, PlayerController_1.updatePlayer);
router.route("/:id").delete(validator_1.validate, PlayerController_1.deletePlayer);
module.exports = router;
