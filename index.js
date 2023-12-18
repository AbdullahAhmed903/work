import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectionDB } from "./src/BD/connection.js";
import userRouter from "./src/modules/user/user.Router.js";
import { globalerr } from "./src/services/asyncHandler.js";
import postRouter from "./src/modules/post/post.Router.js";
import commentRouter from "./src/modules/comment/comment.Router.js";
const app = express();
app.use(bodyParser.json({ limit: "20kb" }));
app.use(bodyParser.urlencoded({ extended: false }));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });
const port = process.env.PORT;
const baseurl = process.env.BASEURL;
connectionDB();
app.use(`${baseurl}/user`, userRouter);
app.use(`${baseurl}/post`, postRouter);
app.use(`${baseurl}/comment`, commentRouter);
app.use(globalerr);
app.use("*", (req, res) => res.send("In-valid Routing Plz check url"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
