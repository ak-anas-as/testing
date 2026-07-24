import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

const verifyjwt = async (req, res, next) => {
    try {

        const authHeader = req.header("Authorization");

        console.log("Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized Request"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};

export { verifyjwt };