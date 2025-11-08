import type { NextFunction, Request, Response } from "express";
import z from "zod";
import httpStatusCodes from "../utils/httpStatusCodes.ts";

const validate =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        errors: z.flattenError(result.error).fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };

export default validate;
