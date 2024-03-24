import { Router, Request, Response } from "express";
import verifyToken from "../middlewares/authenticateToken";
import { getProducts, checkout, getPurchasedItems } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/checkout", verifyToken, checkout);
router.get("/purchased-items/:customerID", verifyToken, getPurchasedItems);

export { router as productRouter };
