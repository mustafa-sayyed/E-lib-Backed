import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.ts";
import fs from "node:fs";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME!,
  api_key: config.CLOUDINARY_API_KEY!,
  api_secret: config.CLOUDINARY_API_SECRET!,
  secure: true,
});

type resourceType = "auto" | "raw" | "image" | "video";

export const upload = async (path: string, resourceType: resourceType = "auto") => {
  try {
    if (!path) return;

    const result = await cloudinary.uploader.upload(path, {
      folder: "books",
      resource_type: resourceType,
    });
    console.log("File Uploaded: ", result);
    fs.unlinkSync(path);

    return result;
  } catch (error) {
    console.error(error);
    // remove local file as file upload operation failed
    fs.unlinkSync(path);
    return null;
  }
};

export default cloudinary;
