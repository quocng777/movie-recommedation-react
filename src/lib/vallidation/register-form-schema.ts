import { authFormErrorMessage, authFormSchema } from "@/constants/auth-form";
import { z } from "zod";

const registerFormSchema = z.object({
    username: z.string()
        .min(authFormSchema.USERNAME_MIN_LENGTH, authFormErrorMessage.USERNAME_MIN_LENGTH)
        .max(authFormSchema.USERNAME_MAX_LENGTH, authFormErrorMessage.USERNAME_MAX_LENGTH),
    fullname: z.string()
        .max(authFormSchema.FULLNAME_MAX_LENGTH, authFormErrorMessage.FULLNAME_MAX_LENGTH)
        .min(authFormSchema.USERNAME_MIN_LENGTH, authFormErrorMessage.FULLNAME_MIN_LENGTH),
    password: z.string()
        .min(authFormSchema.PASSWORD_MIN_LENGTH)
        .max(authFormSchema.PASSWORD_MAX_LENGTH),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match each other',
    path: ['confirmPassword']
});

export default registerFormSchema;