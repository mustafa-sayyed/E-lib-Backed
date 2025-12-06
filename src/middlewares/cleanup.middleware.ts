import fs from "node:fs";
import type { NextFunction, Request, Response } from "express";

export const cleanUpFilesOnError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Failed Request Files to be deleted : ", req.file, req.files);
  
  const deleteFile = async (path: string) => {
    try {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlinkSync(path);
        }
      });
    } catch (error) {
      console.log("Error while cleaning up files: ", error);
    }
  };

  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    Object.values(files).forEach((fileArray) =>
      fileArray.forEach((file) => deleteFile(file.path)),
    );
  }

  if (req.file) {
    const path = req.file.path;
    deleteFile(path);
  }

  next(err);
};
