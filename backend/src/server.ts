import mongoose from "mongoose"
import path from "path"
import cors from "cors"
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser"
import { config } from "dotenv"

config()

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use("/user", require("./routes/userRoutes.ts"))
app.use("/players", require("./routes/PlayerRoutes.ts"))

app.get("/", (req: Request, res: Response) => {
    if (req.cookies.token) {
        res.redirect("/main.html")
    } else {
        res.redirect("/index.html")
    }
})

app.use(express.static(path.join(__dirname, "../../frontend/")))

switch (process.env.NODE_ENV) {
    case "production":
        mongoose.connect(`${process.env.MONGO_ATLAS_URI}`).then(
        ).catch((err) => {
            throw new Error(err.message)
        })

        break

    case "development":
        mongoose.connect(`${process.env.MONGO_LOCAL_URI}`).then(
        ).catch((err) => {
            throw new Error(err.message)
        })
        break

    default:
        throw new Error(`unknown NODE_ENV , ${process.env.NODE_ENV}`)
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})