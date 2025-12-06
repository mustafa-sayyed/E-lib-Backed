import z from "zod";

export const bookSchema = z.object({
  title: z.string().nonempty("Title is required"),
  language: z.string().nonempty("Language is required"),
  genre: z.string().nonempty("Genre is required"),
  price: z.coerce
    .number()
    .nonnegative("Price cannot be negative")
    .min(1, "Minimum 1 should be the price")
    .nonoptional("Price is required"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "invalid date format"),
  author: z.string().nonempty("Author is required"),
});
