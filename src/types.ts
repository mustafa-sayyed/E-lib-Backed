import type mongoose from "mongoose";

export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  __v: number;
  generateAccessToken(): string;
  verifyPassword: (password: string) => Promise<boolean>;
}

export interface Book {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  author: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  coverImage: string;
  file: string;
  price: string;
  genre: string;
  language: string;
  publishedDate: Date;
}
