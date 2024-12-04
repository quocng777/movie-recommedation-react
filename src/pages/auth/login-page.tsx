import authBgImage from '../../assets/auth-background.svg';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLoginMutation, useLoginMutation} from "@/app/api/auth/auth-api-slice";
import { LoginReq } from "@/app/api/types/auth.type";
import { getErrorResponseData } from "@/lib/helpers/get-error-response-data";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { TokenResponse } from "@react-oauth/google";
import LoginForm from "./login-form";
import loginFormSchema from '@/lib/validation/login-form-schema';
import { useDispatch } from 'react-redux';
import { useLazyGetAuthenticationQuery } from '@/app/api/user/user.api.slice';
import { setAuthenticatedUser } from '@/app/api/auth/auth-slice';
import { useRedirectToHomePage } from '@/hooks/use-redirect-to-hompage';

const LoginPage = () => {

    const [loginUser,  {isLoading, isSuccess, isError, error, data}] = useLoginMutation();

    const { toast } = useToast();

    const [ googleLoginMutation, { isLoading: isGgLoading, isSuccess: isGgSuccess, data: ggData } ] = useGoogleLoginMutation();

    const [ getAuth, { isSuccess : isAuthSuccess, data : authData }] = useLazyGetAuthenticationQuery();

    useRedirectToHomePage();

    const dispatch = useDispatch();

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
        await loginUser(values as LoginReq);
    };

    useEffect(() => {
        if(isSuccess || isGgSuccess) {
            const tokens = (data?.data || ggData?.data)!;
            localStorage.setItem('access_token', tokens.accessToken);
            localStorage.setItem('refresh_token', tokens.refreshToken);

            getAuth();
        }
    }, [isSuccess, isGgSuccess]);

    useEffect(() => {
        if(isError) {
            const errorData = getErrorResponseData(error);
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

    useEffect(() => {
        if(isAuthSuccess) {
            dispatch(setAuthenticatedUser(authData.data!));
        }
    }, [isAuthSuccess, authData]);

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