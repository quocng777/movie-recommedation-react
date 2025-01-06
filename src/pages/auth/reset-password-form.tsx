import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/custom/spinner"
import { Link } from "react-router-dom"
import resetPasswordFormSchema from "@/lib/validation/reset-password-form-schema"

export type  ResetPasswordFormProps = {
    form: UseFormReturn<z.infer<typeof resetPasswordFormSchema>, any, undefined >,
    onSubmit: (values: z.infer<typeof resetPasswordFormSchema>) => void,
    isLoading: boolean,
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { form, onSubmit, isLoading } = props;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`relative max-w-[450px] w-full rounded-xl px-8 py-4 border-white border ${isLoading ? 'pointer-events-none' : ''}`}>
            <p className="text-3xl font-semibold mb-4">Reset your password</p>
            <Spinner className="absolute inset-1/2" isOpening={isLoading} />
            <div className={`${isLoading ? 'invisible' : ''}`}>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem className="mb-6">
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your password" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Confirm your password</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your password again!" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Link className=" text-blue-500 hover:underline mt-8" to={'/login'}>Return to login page?</Link>
                <Button type="submit" className="mt-6 w-full" disabled={Object.keys(form.formState.errors).length > 0}>Reset password</Button>
            </div>
            </form>
        </Form>
    )
};

export default ResetPasswordForm;