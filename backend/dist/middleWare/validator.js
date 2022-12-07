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
exports.validate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
function validate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.cookies.token) {
                res.status(401).json({
                    message: "unauthorized access",
                    isError: false,
                    isSuccess: false,
                });
            }
            else {
                const auth = req.cookies.token.split(" ");
                if (auth && auth[0] === "Bearer") {
                    const token = auth[1];
                    req.payload = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                    const exists = yield userSchema_1.default.exists({ _id: req.payload._id });
                    if (!req.payload || !exists) {
                        res.status(401).json({
                            message: "Unauthorized access",
                            isError: false,
                            isSuccess: false,
                        });
                    }
                    else {
                        next();
                    }
                }
                else {
                    res.status(401).json({
                        message: "unauthorized access",
                        isError: false,
                        isSuccess: false,
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server Error",
                isSuccess: false,
                isError: true,
            });
        }
    });
}
exports.validate = validate;
