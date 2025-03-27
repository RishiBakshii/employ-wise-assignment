import { z } from "zod";
import { emailValidation } from "./auth.schema";


const editProfileSchema = z.object({
    firstName: z.string({required_error:"First name cannot be empty"}).min(2, "First name must be at least 2 characters long").max(40, "First name cannot be longer than 40 characters"),
    lastName: z.string({required_error:"Last name cannot be empty"}).min(2, "Last name must be at least 2 characters long").max(40, "Last name cannot be longer than 40 characters"),
    email: emailValidation,
});


export type editProfileSchemaType = z.infer<typeof editProfileSchema>;
export {
    editProfileSchema
};

