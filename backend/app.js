import express from "express";
import CORS from "cors";
import completionRouter from "./routes/completionRoute.js"

const app = express()

app.use(express.json());
app.use(CORS({
    origin: "http://localhost:5173"
}))

app.use("/api/v1/chats", completionRouter)

export default app