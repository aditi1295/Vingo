import 'dotenv/config';
import express from 'express';
import connectDb from "./config/db.js";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';

import userRouter from './routes/user.route.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
})
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);





const port = process.env.PORT || 5000;

connectDb();

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});