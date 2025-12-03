import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";

const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, genre, langauge, price, date } = req.body;
  console.log("Files", req.files);
  res.json({message: "successfully submitted the form.", Body: req.body})
});

const getAllbooks = asyncHandler(async (req: Request, res: Response) => {
  res.send("All Books");
});

const getBookById = asyncHandler(async (req: Request, res: Response) => {
  res.send("Get Book by Id");
});

const updateBook = asyncHandler(async (req: Request, res: Response) => {
  res.send("Update Book");
});

const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  res.send("Delete Book");
});

export { createBook, getAllbooks, getBookById, updateBook, deleteBook };
