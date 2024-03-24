import express from "express";
import verifyToken  from "../middlewares/authenticateToken";
import { register, login } from "../controllers/authController"
import {getAvailableMoney} from "../controllers/userController";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/available-money/:userID", verifyToken, getAvailableMoney);



export { router as userRouter };
