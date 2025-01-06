import authBgImage from '../../assets/auth-background.svg';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@/app/api/auth/auth-api-slice";
import { getErrorResponseData } from "@/lib/helpers/get-error-response-data";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import ResetPasswordForm from "./reset-password-form";
import resetPasswordFormSchema from "@/lib/validation/reset-password-form-schema";
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const [resetPassword,  {isLoading, isSuccess, isError, error}] = useResetPasswordMutation();
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>
    ) => {
        resetPassword({
          token: token ?? '',
          password: values.password,
        })
    };

    useEffect(() => {
        if(isError) {
            const errorData = getErrorResponseData(error);
            console.log(errorData)
            if(!errorData) {
                return;
            }

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                duration: 2000
            })
        }
    }, [isError]);

    useEffect(() => {
      if(!isSuccess) {
        return;
      }
      navigate('/login');
      toast({
        title: 'Success',
        description: 'Set new password successfully'
      })
    }, [isSuccess]);

    return (
        <div className="flex w-full justify-center h-full min-h-screen items-center gap-10">
            <div className="max-w-[480px] w-full flex justify-center flex-col items-center max-md:hidden">
                <h3 className=" text-4xl font-semibold">TMDB2</h3>
                <img src={authBgImage}/>
            </div>
            <ResetPasswordForm 
                form={form} 
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    )
};

export default ResetPasswordPage;