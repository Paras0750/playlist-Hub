import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { getAccessToken, getRefreshToken } from "../../services/token.service.js";

export const refreshController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }


  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );


  const user = await User.findById(decoded.id);

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
    })
    .cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json(new ApiResponse(200, "Token refreshed successfully"));
});