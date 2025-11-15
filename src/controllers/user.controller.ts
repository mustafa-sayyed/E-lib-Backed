import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import User from "../models/user.model.ts";
import ApiError from "../utils/ApiError.ts";
import httpStatusCodes from "../utils/httpStatusCodes.ts";

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "User does not exist");
  }

  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatusCodes.UNAUTHORIZED, "Invalid Password");
  }

  const token = user.generateAccessToken();

  res.status(httpStatusCodes.OK).json({
    message: "User logged in successfully",
    user,
    accessToken: token,
  });
});

const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "User already exists with this email");
  }

  const newUser = await User.create({ name, email, password });
  const token = newUser.generateAccessToken();

  res.status(httpStatusCodes.CREATED).json({
    message: "Account created successfully",
    user: newUser,
    accessToken: token,
  });
});

export { loginUser, signupUser };
