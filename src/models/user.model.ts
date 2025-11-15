import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config.ts";
import type { User } from "../types.ts";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRES_IN,
    } as jwt.SignOptions,
  );
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model<User>("User", userSchema);
