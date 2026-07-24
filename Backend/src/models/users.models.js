// import mongoose from "mongoose"
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// const userSchema = new mongoose.Schema({
    
//     fullname:{
//         type:String,
//         required:true,
//         trim:true
//     },

//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         trim:true
//     },

//     password:{
//         type:String,
//         required:true,
//         minlength: 8
//     },  


// },{timestamps:true});

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    fullname:{
      type: String,
      required: true,
      trim: true
    },

    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password:{
      type: String,
      required: true,
      minlength: 8
    },

    refreshToken: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

// Compare Password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

