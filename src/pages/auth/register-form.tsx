import registerFormSchema from "@/lib/vallidation/register-form-schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Google } from "react-bootstrap-icons"

const RegisterForm = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            fullname: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (values: z.infer<typeof registerFormSchema>
    ) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[440px] w-full rounded-xl px-8 py-4 border-white border">
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
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
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