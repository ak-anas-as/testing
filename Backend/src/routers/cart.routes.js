import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middalware.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = Router();

router.route("/add").post(verifyjwt, addToCart)

router.route("/").get(verifyjwt, getCart)


 export default router;