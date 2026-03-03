import User from "../../models/user.model.js";

export const logoutHandler = (req, res) => {
   const id =  req.user;
    if (!id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = User.findById(id);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    user.refreshToken = null;
    user.save();
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return ApiResponse(200, "Logged out successfully");
}