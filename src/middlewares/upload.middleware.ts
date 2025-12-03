import multer from "multer";
import path from "path";

const __dirname = import.meta.dirname;

export const upload = multer({
  dest: path.resolve(__dirname, "../../public/uploads"),
  limits: { fileSize: 10 * 1024 * 1024 },
});
