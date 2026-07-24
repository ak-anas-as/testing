import { Router } from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/payment.controller.js";
import { verifyjwt } from "../middlewares/auth.middalware.js";

const router = Router();

router.route("/create-order").post(verifyjwt, createPaymentOrder);

router.route("/verify-payment").post(verifyjwt, verifyPayment);

export default router;