import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { getAccessToken, getRefreshToken } from "../../utils/signJwt.js";

dotenv.config();

const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  let decodedRefreshToken;

  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const userid = decodedRefreshToken?.userid;

  if (!userid) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(userid);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }


  const newAccessToken = getAccessToken(user);
  const newRefreshToken = getRefreshToken(user);


  user.refreshToken = newRefreshToken;
  await user.save();


  res
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "Token refreshed",
      accessToken: newAccessToken,
    });
};
export default refreshController
