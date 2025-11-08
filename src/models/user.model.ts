import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config.ts";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  __v: number,
  generateAccessToken(): string;
  verifyPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
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
    config.ACCESS_TOKEN_SECRET!,
  );
};


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, 10);

  next();
});


const User = mongoose.model<IUser>("User", userSchema);

export { User };