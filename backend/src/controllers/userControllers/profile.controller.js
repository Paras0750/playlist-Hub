import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const profileController = asyncHandler(async (req, res) => {

// auth se user aayega, toh req.user me user ki details hongi
  return res.status(200).json(
    new ApiResponse(200, "Profile fetched successfully", {
      user: req.user,
    })
  );
});

export default profileController;
