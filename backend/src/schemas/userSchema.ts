import mongoose, {Schema} from "mongoose"

const user: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export default mongoose.model("users", user)