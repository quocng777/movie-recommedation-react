import authBgImage from '../../assets/auth-background.svg';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLoginMutation, useLoginMutation} from "@/app/api/auth/auth-api-slice";
import { CreateUserReq } from "@/app/api/types/auth.type";
import { getErrorResponseData } from "@/lib/helpers/get-error-response-data";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { TokenResponse } from "@react-oauth/google";
import LoginForm from "./login-form";
import loginFormSchema from '@/lib/validation/login-form-schema';

const LoginPage = () => {

    const [registerUser,  {isLoading, isSuccess, isError, error}] = useLoginMutation();

    const { toast } = useToast();

    const [ googleLoginMutation, { isLoading: isGgLoading } ] = useGoogleLoginMutation();

    const onGoogleAuthSuccess = (tokenRes: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
        googleLoginMutation({token: tokenRes.access_token});
    }

    const onGoogleAuthError = () => {
        console.log("Login failed");
    }

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            password: '',
            email: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>
    ) => {
        await registerUser(values as CreateUserReq);
    };

    useEffect(() => {
        if(isSuccess) {
            alert('sucess');
            return;
        }
    }, [isSuccess]);

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
                description: errorData.message,
                duration: 2000
            })
        }
    }, [isError]);

    return (
        <div className="flex w-full justify-center h-full min-h-screen items-center gap-10">
            <div className="max-w-[480px] w-full flex justify-center flex-col items-center max-md:hidden">
                <h3 className=" text-4xl font-semibold">PopcornBox</h3>
                <img src={authBgImage}/>
            </div>
            <LoginForm 
                form={form} 
                onSubmit={onSubmit}
                isLoading={isLoading || isGgLoading}
                onGoogleAuthError={onGoogleAuthError}
                onGoogleAuthSuccess={onGoogleAuthSuccess}
            />
        </div>
    )
};

export default LoginPage;