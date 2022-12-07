import mongoose, {Schema} from "mongoose"

const chat: Schema = new Schema({
    name: String,
    positions: [String],
    height: Number,
    age: Number,
    weight: Number,
    rating: Number,
})

export default mongoose.model("players", chat)