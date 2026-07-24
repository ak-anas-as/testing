import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import userRouter from "./routers/user.routes.js"
import foodRouter from "./routers/food.routes.js"
import cartRouter from "./routers/cart.routes.js"
import orderRouter from "./routers/order.routes.js"
import paymentRouter from "./routers/payment.routes.js"



const app = express()

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/foods", foodRouter);

app.use("/api/v1/cart", cartRouter);

app.use("/api/v1/orders", orderRouter);

app.use("/api/v1/payment", paymentRouter);

export { app }