import User from "../models/user-model.js"

const signup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({ details: "email already exists" })
        }
        const newUser = await User.create({ username, email, phone, password })
        res.status(200).json({
            message: "Registration successful",
            token: await newUser.generateToken(),
            userId: newUser._id.toString()
        })
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email: email })
        if (!userExist) {
            return res.status(400).json({ details: "email not registered yet" })
        }
        const isPasswordValid = userExist.isPasswordValid(password)
        if (isPasswordValid) {
            res.status(200).json({
                message: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        } else {
            res.status(401).json({ details: "Invalid email or password" })
        }
    } catch (error) {
        res.status(500).json("internal server error")
    }
}

const userDatas = async (req, res) => {
    try {
        const userData = req.user
        console.log(userData);
        return res.status(200).json({ userData })
    } catch (error) {
        console.log("error from the user routes: ", error);
    }
}


export { signup, login, userDatas }