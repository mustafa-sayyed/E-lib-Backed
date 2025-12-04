import multer from "multer";
import path from "path";

const __dirname = import.meta.dirname;
const uploadPath = path.resolve(__dirname, "../../public/uploads");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadPath);
  },
  filename(req, file, callback) {
    const fileName = file.originalname + Date.now();
    callback(null, fileName);
  },
});

export const upload = multer({
  dest: path.resolve(__dirname, "../../public/uploads"),
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10 MB
});
