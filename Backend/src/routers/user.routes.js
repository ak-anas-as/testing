import { Router } from "express";
import { RegisterUser, loginUser, getCurrentUser, logoutUser, refreshAccessToken} from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middalware.js";

const router = Router();

router.route("/register").post(RegisterUser);

router.route("/login").post(loginUser);

router.route("/me").get(verifyjwt, getCurrentUser);

router.route("/logout").post( verifyjwt, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router;