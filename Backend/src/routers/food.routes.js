import { Router } from "express"
import { addFood, deletFood, getAllFoods, getFoodById, updateFood } from "../controllers/food.controller.js";
import { verifyjwt } from "../middlewares/auth.middalware.js";


const router = Router();

router.route("/add").post(verifyjwt, addFood);

router.route("/").get(getAllFoods);

router.route("/:id").get(getFoodById);

router.route("/:id").put(verifyjwt, updateFood);

router.route("/:id").delete(verifyjwt, deletFood);




export default router;