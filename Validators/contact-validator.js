import { z } from "zod";

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(1000, { message: "Message must not be more than 1000 characters" }),
});

export default contactSchema;