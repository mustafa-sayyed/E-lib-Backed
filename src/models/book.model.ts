import { type Book } from "../types.ts";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema<Book>({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    coverImage: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    }

}, { timestamps: true });


export default mongoose.model<Book>("Book", bookSchema);
