import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import { paymentRouter } from "./routes/payment";

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/products", productRouter);
app.use('/payment', paymentRouter);
mongoose.connect(`mongodb+srv://igrigolia:${process.env.DB_PASSWORD}@cluster0.e8b2fkj.mongodb.net/cluster0`);

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port: ${port}`));