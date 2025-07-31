import mongoose, { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//mongoose middle ware for password hashing
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, salt)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password)
}

//middleware for jwt
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: '1h' });

    } catch (error) {
        console.error(error)
    }
}

const User = model("User", userSchema)
export default User;