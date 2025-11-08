import z from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const signupSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
})

export { loginSchema, signupSchema };
