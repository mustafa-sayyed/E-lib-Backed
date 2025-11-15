import type mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  __v: number;
  generateAccessToken(): string;
  verifyPassword: (password: string) => Promise<boolean>;
}


