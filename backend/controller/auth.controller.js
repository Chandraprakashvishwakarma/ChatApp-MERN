import asyncHandler from "express-async-handler";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exist!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!!" });
    }
    const genderr = gender === "male" ? "boy" : "girl";

    //Hash password
    const hashedPasswod = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      username,
      password: hashedPasswod,
      gender,
      profilePic: `${process.env.PIC_URL}${genderr}?username=${username}`,
    });

    if (!newUser) {
      return res.status(400).json({
        error: "Internal server error! User not created, please try again.",
      });
    }

    await newUser.save();

    //jwt token generate and add to cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname:newUser.fullname,
      username: newUser.username,
      profilePic:newUser.profilePic,
      message: "User created..",
    });
  } catch (err) {
    console.log("Error in sign up page",err.message);
    res.status(500).json({ error: "Internal server error!!" });
  }
});

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); // if user not found then it will compare with empty string
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Username or password is invalid!" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname:user.fullname,
      username: user.username,
      profilePic:user.profilePic,
      message: "User logged in succesfully..",
    });
  } catch (err) {
    console.log("error in login page",err.message);
    res.status(500).json({ error: "Internal server error!!" });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAgae: 0 });
  res.status(200).json({ message: "User logged out successfully.." });
};
