import { authFormSchema } from "@/constants/auth-form";
import { z } from "zod";

const resetPasswordFormSchema = z.object({
    password: z.string()
        .min(authFormSchema.PASSWORD_MIN_LENGTH)
        .max(authFormSchema.PASSWORD_MAX_LENGTH),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match each other',
    path: ['confirmPassword']
});

export default resetPasswordFormSchema;