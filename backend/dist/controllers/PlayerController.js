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
exports.updatePlayer = exports.deletePlayer = exports.createPlayer = exports.getAllPlayers = void 0;
const PlayerSchema_1 = __importDefault(require("../schemas/PlayerSchema"));
//Get all players. //
function getAllPlayers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPlayers = yield PlayerSchema_1.default.find();
            res.status(200).json({
                allPlayers,
                isSuccess: true,
                isError: false,
            });
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
exports.getAllPlayers = getAllPlayers;
//update a player //
function updatePlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const player = yield PlayerSchema_1.default.findByIdAndUpdate(req.params.id, req.body);
            if (player) {
                res.status(200).json({
                    message: "player deleted successfully",
                    isSuccess: true,
                    isError: false,
                    player,
                });
            }
            else {
                res.status(400).json({
                    message: "player not found",
                    isSuccess: false,
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
exports.updatePlayer = updatePlayer;
//Creat a Player//
function createPlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const player = yield PlayerSchema_1.default.create(req.body);
            res.status(201).json({
                message: "player created",
                player,
                isSuccess: true,
                isError: false,
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "sever error",
                isError: true,
                isSuccess: false,
            });
        }
    });
}
exports.createPlayer = createPlayer;
//Delete a player//
function deletePlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const player = yield PlayerSchema_1.default.findByIdAndDelete(req.params.id);
            if (player) {
                res.status(200).json({
                    message: "player deleted",
                    player,
                    isSuccess: true,
                    isError: false,
                });
            }
            else {
                res.status(400).json({
                    message: "player don't exists",
                    isSuccess: false,
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
exports.deletePlayer = deletePlayer;
