import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import { upload } from "../utils/cloudinary.ts";
import ApiError from "../utils/ApiError.ts";
import httpStatusCodes from "../utils/httpStatusCodes.ts";
import Book from "../models/book.model.ts";

const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, genre, language, price, date } = req.body;
  console.log("Files", req.files);

  const coverImageResult = await upload(req.files.coverImage[0].path);
  const fileResult = await upload(req.files.file[0].path);

  if (!coverImageResult || !fileResult) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Failed to upload files");
  }

  const book = await Book.create({
    title,
    coverImage: coverImageResult.secure_url,
    file: fileResult.secure_url,
    author,
    genre,
    language,
    price,
    publishedDate: new Date(date),
  });

  res.json({ success: true, message: "Book added successfully", book });
});

const getAllbooks = asyncHandler(async (req: Request, res: Response) => {
  const books = Book.find({});
  res.status(httpStatusCodes.OK).json({ books });
});

const getBookById = asyncHandler(async (req: Request, res: Response) => {
  res.send("Get Book by Id");
});

const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const {} = req.body; // update parameters for Book

  const book = Book.findById(id);

  if (!book) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Book does not exist");
  }
});

const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = Book.findById(id);
  if (!book) {
    new ApiError(httpStatusCodes.BAD_REQUEST, "Book does not exist");
  }

  Book.findByIdAndDelete(id);
});

export { createBook, getAllbooks, getBookById, updateBook, deleteBook };
