import players from "../schemas/PlayerSchema"
import {Request, Response} from "express"

//Get all players. //
async function getAllPlayers(req: Request, res: Response) {
    try {
        const allPlayers = await players.find()

        res.status(200).json({
            allPlayers,
            isSuccess: true,
            isError: false,
        });
    } catch (error: any) {
        console.log(error.message)

        res.status(500).json({
            message: "server error",
            isSuccess: false,
            isError: true,
        })
    }
}

//update a player //
async function updatePlayer(req: Request, res: Response) {
    try {
        const player = await players.findByIdAndUpdate(req.params.id, req.body)

        if (player) {
            res.status(200).json({
                message: "player deleted successfully",
                isSuccess: true,
                isError: false,
                player,
            })
        } else {
            res.status(400).json({
                message: "player not found",
                isSuccess: false,
                isError: false,
            })
        }
    } catch (error: any) {
        console.log(error.message)

        res.status(500).json({
            message: "server error",
            isError: true,
            isSuccess: false,
        })
    }
}

//Creat a Player//
async function createPlayer(req: Request, res: Response) {
    try {
        const player = await players.create(req.body)

        res.status(201).json({
            message: "player created",
            player,
            isSuccess: true,
            isError: false,
        })
    } catch (error: any) {
        console.log(error.message)

        res.status(500).json({
            message: "sever error",
            isError: true,
            isSuccess: false,
        })
    }
}

//Delete a player//
async function deletePlayer(req: Request, res: Response) {
    try {
        const player = await players.findByIdAndDelete(req.params.id)

        if (player) {
            res.status(200).json({
                message: "player deleted",
                player,
                isSuccess: true,
                isError: false,
            })
        } else {
            res.status(400).json({
                message: "player don't exists",
                isSuccess: false,
                isError: false,
            })
        }
    } catch (error: any) {
        console.log(error.message)

        res.status(500).json({
            message: "server error",
            isError: true,
            isSuccess: false,
        })
    }
}

export {
    getAllPlayers,
    createPlayer,
    deletePlayer,
    updatePlayer,
}