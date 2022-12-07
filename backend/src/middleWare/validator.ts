import jwt, {JwtPayload} from "jsonwebtoken"
import users from "../schemas/userSchema"
import {Request, Response, NextFunction} from "express"

type request = Request & {
    payload?: any,
}

export async function validate(req: request, res: Response, next: NextFunction){
    try {
        if (!req.cookies.token) {
            res.status(401).json({
                message: "unauthorized access",
                isError: false,
                isSuccess: false,
            })
        } else {
            const auth: String[] = req.cookies.token.split(" ")
 
            if (auth && auth[0] === "Bearer") {
                const token: String = auth[1]

                req.payload = jwt.verify((token as string), (process.env.SECRET as string))
                const exists = await users.exists({ _id: req.payload._id })

                if (!req.payload || !exists) {
                    res.status(401).json({
                        message: "Unauthorized access",
                        isError: false,
                        isSuccess: false,
                    })
                } else {
                    next()
                }
            } else {
                res.status(401).json({
                    message: "unauthorized access",
                    isError: false,
                    isSuccess: false,
                })
            }
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Server Error",
            isSuccess: false,
            isError: true,
        })
    }
}