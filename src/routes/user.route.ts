import { Router } from "express";
import { loginUser, signupUser } from "../controllers/user.controller.ts";
import validate from "../middlewares/validation.middleware.ts";
import { loginSchema, signupSchema } from "../schemas/user.schema.ts";

const router = Router();

router.route("/login").post(validate(loginSchema), loginUser);
router.route("/signup").post(validate(signupSchema), signupUser);

export default router;
