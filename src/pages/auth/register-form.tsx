import registerFormSchema from "@/lib/vallidation/register-form-schema"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Google } from "react-bootstrap-icons"

export type  RegisterFormProps = {
    form: UseFormReturn<z.infer<typeof registerFormSchema>, any, undefined >,
    onSubmit: (values: z.infer<typeof registerFormSchema>) => void,
    isLoading: boolean
}

const RegisterForm = (props: RegisterFormProps) => {
    const { form, onSubmit, isLoading } = props;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[450px] w-full rounded-xl px-8 py-4 border-white border">
            <p className="text-3xl font-semibold mb-4">Create an account</p>
            <div>
                <p>Register with</p>
                <div className="w-full flex justify-center">
                    <Button className="font-semibold">
                        <Google />
                        Google
                    </Button>
                </div>
            </div>
            <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-white" />
                <p className="px-4">OR CONTINUE WITH</p>
                <hr className="flex-grow border-t border-white" />
            </div>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm your password</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your password again!" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className="mt-6 w-full">Create account</Button>
            </form>
        </Form>
    )
};

export default RegisterForm;