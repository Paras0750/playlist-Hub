import bcrypt from "bcryptjs";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResonse.js";

import { getAccessToken, getRefreshToken } from "../../utils/signJWT.js";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;


  if (!username || !email || !password) {
    throw new ApiError(400, "Username, email, and password are required");
  }


  const isExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (isExists) {
    throw new ApiError(
      400,
      "User with this email or username already exists"
    );
  }


  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });


  const accessToken = getAccessToken(user);
  const refreshToken = getRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });


  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(
      new ApiResponse(201, "User registered successfully", {
        id: user._id,
        username: user.username,
        email: user.email,
      })
    );
};

export default registerController;