import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";

const createBook = asyncHandler(async (req: Request, res: Response) => {
  res.send("Book Created");
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
