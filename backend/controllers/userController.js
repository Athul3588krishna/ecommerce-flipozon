import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)

}

//Route for user login
const loginUser = async (req, res) => {
    // ...existing code...
}
//Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        //checing the user already exists or not


        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be atleast 8 characters" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be atleast 8 characters" })
        }

        //hashing the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};


//Route for admin login
const loginAdmin = async (req, res) => {
    // ...existing code...
}

export { loginUser, registerUser, loginAdmin }