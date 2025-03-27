import { z } from "zod";

const passwordValidation = z
.string()
.min(4, "Password cannot be shorter than 4 characters")
.max(40, "Password cannot be longer than 30 characters")

export const emailValidation = z
  .string({ required_error: "Email is required" })
  .regex(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    "Please enter a valid email"
);

const loginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
});


export type loginSchemaType = z.infer<typeof loginSchema>;
export {
    loginSchema
};

