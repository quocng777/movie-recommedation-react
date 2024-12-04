import { authFormSchema } from "@/constants/auth-form";
import { z } from "zod";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(authFormSchema.PASSWORD_MIN_LENGTH)
        .max(authFormSchema.PASSWORD_MAX_LENGTH),
});

export default loginFormSchema;