import { Router } from "express";
import { getAllOrders, getMyOrders, getSingleOrder, placeOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { verifyjwt } from "../middlewares/auth.middalware.js";


const router = Router();

router.route("/place").post(verifyjwt, placeOrder);

router.route("/my-orders").get(verifyjwt, getMyOrders);     

router.route("/:orderId").get(verifyjwt, getSingleOrder);

router.route("/").get(getAllOrders);    

router.route("/:orderId/status").put(updateOrderStatus);



export default router;