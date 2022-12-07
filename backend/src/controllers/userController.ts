import  users from "../schemas/userSchema"
import jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Request, Response } from "express"

type request = Request & {
    payload?: any
}

async function createUser(req: Request, res: Response) {
    try {
        const userExists = await users.exists({ email: req.body.email })

        if (userExists) {
            res.status(400).json({
                message: "This e-mail is already been used by another user",
                isSuccess: false,
                isError: false,
            })
        } else {
            const salt: string = await bcrypt.genSalt()

            req.body.password = await bcrypt.hash(req.body.password, salt)

            const user = await users.create(req.body)

            const token: string = jwt.sign(JSON.stringify(user), (process.env.SECRET as string))

            const date: Date = new Date()

            date.setFullYear(date.getFullYear() + 1)

            res.status(201).cookie("token", `Bearer ${token}`, { expires: date }).json({
                message: "user created successfully",
                isSuccess: true,
                isError: false,
            })
        }
    } catch (error: any) {
        console.log(error. message)

        await users.deleteOne(req.body)

        res.status(500).json({
            message: "server error",
            isSuccess: false,
            isError: true,
        })
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const user = await users.findOne({ email: req.body.email })

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token: string = jwt.sign(JSON.stringify(user), (process.env.SECRET as string))

            const date: Date = new Date()

            date.setFullYear(date.getFullYear() + 1)

            res.status(200).cookie("token", `Bearer ${token}`, { expires: date }).json({
                message: "user login successful",
                isError: false,
                isSuccess: true,
            })
        } else {
            res.status(400).json({
                message: "user not found",
                isSussecc: false,
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

async function deleteUser(req: request, res: Response) {
    try {
        const user = await users.findByIdAndDelete(req.payload._id)

        if (user) {
            res.status(200).clearCookie("token").json({
                message: "user deleted successfully",
                isSuccess: true,
                isError: false,
            })
        } else {
            res.status(400).json({
                message: "user not found",
                isSuccess: false,
                isError: false,
            })
        }
    } catch (error: any) {
        console.log(error.message)

        res.status(500).json({
            message: "server error",
            isSuccess: false,
            isError: true,
        })
    }
}

async function logoutUser(req: Request, res: Response) {
    try {
        res.status(200).clearCookie("token").json({
            message: "logout Successful",
            isSuccess: true,
            isError: false
        })
    } catch (error: any) {
        console.log(error.message)

        res.json({
            message: "server error",
            isSuccess: false,
            isError: true,
        })
    }
    
}

export {
    createUser,
    loginUser,
    deleteUser,
    logoutUser,
}