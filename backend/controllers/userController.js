import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const emailAlreadyUsed = await User.findOne({ email });
  const usernameAlreadyUsed = await User.findOne({ username });

  if (emailAlreadyUsed) {
    res.status(400);
    throw new Error("Email already used");
  }

  if (usernameAlreadyUsed) {
    res.status(400);
    throw new Error("Username already used");
  }

  const user = await User.create({ name, username, email, password });

  if (user) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("getUserProfile");
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("updateUserProfile");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
