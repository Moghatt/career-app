import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

// db and authentication
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoute.js";
import jobsRouter from "./routes/jobsRoute.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// middleware for parsing json
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
