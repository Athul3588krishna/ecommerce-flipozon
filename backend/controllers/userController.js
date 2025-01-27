import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
//Route for user login
const loginUser = async (req, res) => {

}
//Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check if the user email already exists

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format &strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please ente a valid email " })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be atleast 8 characters" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {

        res.json({ success: false, message:"Feeling error" });

    }
}




//Route for admin login
const loginAdmin = async (req, res) => {
    // ...existing code...
}

export { loginUser, registerUser, loginAdmin }