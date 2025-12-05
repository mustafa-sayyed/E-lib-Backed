import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllbooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller.ts";
import { fileUploadErrorHandler, upload } from "../middlewares/upload.middleware.ts";
import validate from "../middlewares/validation.middleware.ts";
import { bookSchema } from "../schemas/book.schema.ts";

const router = Router();

router.route("/").post(
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  fileUploadErrorHandler,
  validate(bookSchema),
  createBook,
);
router.route("/").get(getAllbooks);
router.route("/:id").get(getBookById);
router.route("/:id").patch(updateBook);
router.route("/:id").delete(deleteBook);

export default router;
