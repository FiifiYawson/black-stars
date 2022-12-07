"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middleWare/validator");
const router = express_1.default.Router();
router.route("/register").post(userController_1.createUser);
router.route("/login").post(userController_1.loginUser);
router.route("/").delete(validator_1.validate, userController_1.deleteUser);
router.route("/logout").get(userController_1.logoutUser);
module.exports = router;
