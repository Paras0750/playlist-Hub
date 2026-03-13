import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {User} from "../../models/user.model.js";

dotenv.config();

const logoutHandler = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken && process.env.REFRESH_TOKEN_SECRET) {
    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      const userid = decodedRefreshToken?.userid;

      if (userid) {
        const user = await User.findById(userid);

        if (user && user.refreshToken === refreshToken) {
          user.refreshToken = null;
          await user.save({ validateBeforeSave: false });
        }
      }
    } catch {
      // Ignore invalid refresh tokens during logout and clear cookies anyway.
    }
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export default logoutHandler
