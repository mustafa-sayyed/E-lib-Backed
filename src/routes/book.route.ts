import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllbooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller.ts";

const router = Router();

router.route("/").post(createBook);
router.route("/").get(getAllbooks);
router.route("/:id").get(getBookById);
router.route("/:id").patch(updateBook);
router.route("/:id").delete(deleteBook);

export default router;
