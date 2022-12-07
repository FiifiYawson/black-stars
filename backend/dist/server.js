"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/user", require("./routes/userRoutes.ts"));
app.use("/players", require("./routes/PlayerRoutes.ts"));
app.get("/", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/main.html");
    }
    else {
        res.redirect("/index.html");
    }
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/")));
switch (process.env.NODE_ENV) {
    case "production":
        mongoose_1.default.connect(`${process.env.MONGO_ATLAS_URI}`).then().catch((err) => {
            throw new Error(err.message);
        });
        break;
    case "development":
        mongoose_1.default.connect(`${process.env.MONGO_LOCAL_URI}`).then().catch((err) => {
            throw new Error(err.message);
        });
        break;
    default:
        throw new Error(`unknown NODE_ENV , ${process.env.NODE_ENV}`);
}
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
