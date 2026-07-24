import { User } from "../models/users.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {

    try {

        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        };

    } catch (error) {

        throw new Error("Something went wrong while generating tokens");

    }

};


// REGISTER USER

const RegisterUser = async (req, res) => {

    try {
        const { fullname, email, password, } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "ALL FIELD ARE REQUIRED"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at jeast 8 character long"
            });
        }

        const exitingUser = await User.findOne({ email });

        if (exitingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            fullname,
            email,
            password: hashpassword
        });

        return res.status(200).json({
            message: "User Registered successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

};


// LOGIN USER

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(401).json({
                message: "Field are required"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "user not found"
            });
        }


        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }


        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id)
            .select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: false
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                message: "Login Successfully",
                user: loggedInUser,
                accessToken,
                refreshToken
            });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

};


const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        user: req.user
    });

};


//LOGOUT USER

const logoutUser = async (req, res) => {


    console.log("Logout API Called");

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1

            }
        },
        {
            new: true   
        }
    );

    const options = {
            httpOnly: true,
            secure: false
        };

        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json({
            success:true,
            message:"Logout User"
        });
}



const refreshAccessToken = async ( req, res ) => {

    try {

       const incomingRefreshToken = await req.cookies.refreshToken || req.body.refreshToken;

       if (!incomingRefreshToken) {
        return res.status(401).json({
            message:" Unauthorized request"
        });
       }


      const decodedToken = await jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
       );


      const user = await User.findById(decodedToken.id);
      
      if (!user) {
        return res.status(401).json({
            message:"Invalid refresh token"
        });
      }


      if (incomingRefreshToken !== user.refreshToken ) {

        return res.status(401).json({
            message:"Refresh Token is expired "
        });
        
      }

    

      const { accessToken,  refreshToken } = await generateAccessAndRefreshTokens(user._id);
      

   const options = {
        httpOnly: true,
        secure: false
    };

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        accessToken,
        refreshToken,
        message:"Access and Refresh Token successfully"
    });


        
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};



export { RegisterUser, loginUser, getCurrentUser, logoutUser, refreshAccessToken }