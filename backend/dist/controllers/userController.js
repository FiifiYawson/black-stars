"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.deleteUser = exports.loginUser = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userExists = yield userSchema_1.default.exists({ email: req.body.email });
            if (userExists) {
                res.status(400).json({
                    message: "This e-mail is already been used by another user",
                    isSuccess: false,
                    isError: false,
                });
            }
            else {
                const salt = yield bcrypt_1.default.genSalt();
                req.body.password = yield bcrypt_1.default.hash(req.body.password, salt);
                const user = yield userSchema_1.default.create(req.body);
                const token = jsonwebtoken_1.default.sign(JSON.stringify(user), process.env.SECRET);
                const date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                res.status(201).cookie("token", `Bearer ${token}`, { expires: date }).json({
                    message: "user created successfully",
                    isSuccess: true,
                    isError: false,
                });
            }
        }
        catch (error) {
            console.log(error.message);
            yield userSchema_1.default.deleteOne(req.body);
            res.status(500).json({
                message: "server error",
                isSuccess: false,
                isError: true,
            });
        }
    });
}
exports.createUser = createUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.default.findOne({ email: req.body.email });
            if (user && (yield bcrypt_1.default.compare(req.body.password, user.password))) {
                const token = jsonwebtoken_1.default.sign(JSON.stringify(user), process.env.SECRET);
                const date = new Date();
                date.setFullYear(date.getFullYear() + 1);
                res.status(200).cookie("token", `Bearer ${token}`, { expires: date }).json({
                    message: "user login successful",
                    isError: false,
                    isSuccess: true,
                });
            }
            else {
                res.status(400).json({
                    message: "user not found",
                    isSussecc: false,
                    isError: false,
                });
            }
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "server error",
                isError: true,
                isSuccess: false,
            });
        }
    });
}
exports.loginUser = loginUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.default.findByIdAndDelete(req.payload._id);
            if (user) {
                res.status(200).clearCookie("token").json({
                    message: "user deleted successfully",
                    isSuccess: true,
                    isError: false,
                });
            }
            else {
                res.status(400).json({
                    message: "user not found",
                    isSuccess: false,
                    isError: false,
                });
            }
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "server error",
                isSuccess: false,
                isError: true,
            });
        }
    });
}
exports.deleteUser = deleteUser;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).clearCookie("token").json({
                message: "logout Successful",
                isSuccess: true,
                isError: false
            });
        }
        catch (error) {
            console.log(error.message);
            res.json({
                message: "server error",
                isSuccess: false,
                isError: true,
            });
        }
    });
}
exports.logoutUser = logoutUser;
