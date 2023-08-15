import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import { Connect } from "./db/connection.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js"

dotenv.config();

const app = express();
//Middleware used to parse the incoming JSON request body
app.use(express.json());
// Used for logging HTTP request in a readable form
app.use(morgan("common"));
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/authenticate", authRouter);
app.use("/api/post", postRouter)

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
Connect(process.env.MONGO_URL);
