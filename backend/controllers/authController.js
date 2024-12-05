import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      photo: req.body.photo,
    });

    // Save the user to the database
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const login = async (req, res) => {
  const email = req.body.email

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create a JWT token
    const {password , role , ...rest} = user._doc ;
    const token = jwt.sign({ id: user._id ,
       role:user.role, ...rest }, 
       process.env.JWT_SECRET_KEY , 
       { expiresIn: "15d" });

    // Send the token in an HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: token.expiresIn, 
    }).status(200)
    .json({
       token,
       data: { ...rest},
       role,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};


