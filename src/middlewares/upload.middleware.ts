import multer, { MulterError } from "multer";
import path from "path";
import { config } from "../config/config.ts";
import ApiError from "../utils/ApiError.ts";
import httpStatusCodes from "../utils/httpStatusCodes.ts";
import type { NextFunction, Request, Response } from "express";

const __dirname = import.meta.dirname;
const uploadPath = path.resolve(__dirname, "../../public/uploads");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadPath);
  },
  filename(req, file, callback) {
    const fileName = Date.now() + file.originalname;
    callback(null, fileName);
  },
});

export const upload = multer({
  dest: path.resolve(__dirname, "../../public/uploads"),
  storage: storage,
  limits: { fileSize: config.fileSizeLimit },
});

export const fileUploadErrorHandler = (
  err: MulterError,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  console.log("Multer Error: ", err);
  if (
    err.code === "LIMIT_FIELD_COUNT" ||
    err.code === "LIMIT_UNEXPECTED_FILE"
  ) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      `Cannot upload more than one file`,
    );
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      `File size exceeds, max ${config.fileSizeLimit / (1024 * 1024)} MB is allowed`,
    );
  }
};
