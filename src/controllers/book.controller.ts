import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import cloudinary, { upload } from "../utils/cloudinary.ts";
import ApiError from "../utils/ApiError.ts";
import httpStatusCodes from "../utils/httpStatusCodes.ts";
import Book from "../models/book.model.ts";
import type { Book as TBook } from "../types.ts";

const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, genre, language, price, date } = req.body;
  console.log("Files", req.files);

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!files.coverImage || !files.coverImage[0]) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Cover image is required");
  }

  if (!files.file || !files.file[0]) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Book file is required");
  }

  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
  const coverImageResult = await upload(
    files.coverImage[0].path,
    "image",
    coverImageMimeType,
  );

  if (!coverImageResult) {
    console.log(coverImageResult);
    throw new ApiError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to upload files",
    );
  }

  const fileResult = await upload(files.file[0].path, "raw", "pdf");

  if (!fileResult) {
    if (coverImageResult) {
      const coverImagePath = coverImageResult.secure_url.split("/");
      const publicId =
        coverImagePath.at(-2) + "/" + coverImagePath.at(-1)?.split(".").at(0);

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
    }
    throw new ApiError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to upload files",
    );
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

  res
    .status(httpStatusCodes.CREATED)
    .json({ success: true, message: "Book added successfully", book });
});

const getAllbooks = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;
  const pageno = Number(req.query.page) || 0;
  const skipBooks = limit * pageno;

  const totalBooks = await Book.countDocuments();

  const books = await Book.find({}).skip(skipBooks).limit(limit);

  res
    .status(httpStatusCodes.OK)
    .json({ books, totalBooks, totalPages: Math.floor(totalBooks / limit) });
});

const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  if (!bookId) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Book not found");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Book does not exist");
  }

  res.status(httpStatusCodes.OK).json({ book });
});

const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { title, language, genre, price, date, author } = req.body;

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Book does not exist");
  }

  const updateData: Partial<TBook> = {};
  if (title) updateData.title = title;
  if (genre) updateData.genre = genre;
  if (language) updateData.language = language;
  if (price) updateData.price = price;
  if (author) updateData.author = author;
  if (date) updateData.publishedDate = new Date(date);

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (files.coverImage && files.coverImage[0]) {
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const updatedCoverImageResult = await upload(files.coverImage[0].path, "image", coverImageMimeType );
    if (!updatedCoverImageResult) {
      throw new ApiError(
        httpStatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to upload files",
      );
    }
    updateData.coverImage = updatedCoverImageResult.secure_url;

    const coverImagePath = book.coverImage.split("/");
    const publicId =
      coverImagePath.at(-2) + "/" + coverImagePath.at(-1)?.split(".").at(0);

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  }

  if (files.file && files.file[0]) {
    const updatedFileResult = await upload(files.file[0].path);

    if (!updatedFileResult) {
      throw new ApiError(
        httpStatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to upload files",
      );
    }

    updateData.file = updatedFileResult.secure_url;

    const filePath = book.file.split("/");
    const publicId = filePath.at(-2) + "/" + filePath.at(-1)?.split(".").at(0);

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      $set: updateData,
    },
    { new: true },
  );

  res.status(httpStatusCodes.OK).json({
    success: true,
    message: "Book updated successfully",
    book: updatedBook,
  });
});

const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Book does not exist");
  }

  const coverImagePath = book.coverImage.split("/");
  const coverImagePublicId =
    coverImagePath.at(-2) + "/" + coverImagePath.at(-1)?.split(".").at(0);
  await cloudinary.uploader.destroy(coverImagePublicId);

  const filePath = book.file.split("/");
  const filePublicId =
    filePath.at(-2) + "/" + filePath.at(-1)?.split(".").at(0);
  await cloudinary.uploader.destroy(filePublicId);

  await Book.findByIdAndDelete(id);

  res
    .status(httpStatusCodes.OK)
    .json({ success: true, message: "Book deleted successfully" });
});

export { createBook, getAllbooks, getBookById, updateBook, deleteBook };
