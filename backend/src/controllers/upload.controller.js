import cloudinary from "../../utils/cloudinary.js";
import fs from "fs-extra";

export const uploadImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "playlist_covers",
        transformation: [
          { width: 300, height: 300, crop: "fill" }
        ]
      }
    );
    await fs.remove(req.file.path);
    res.status(200).json({
      imageUrl: result.secure_url
    });
  } 
  catch (error) {

    console.error("Upload error:", error);

    res.status(500).json({
      error: "Cloudinary upload failed"
    });

  }

};