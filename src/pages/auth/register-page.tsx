import RegisterForm from "./register-form";
import authBgImage from '../../assets/auth-background.svg';
import { useForm } from "react-hook-form";
import { custom, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerFormSchema from "@/lib/validation/register-form-schema";
import { useRegisterMutation } from "@/app/api/auth/auth-api-slice";
import { CreateUserReq } from "@/app/api/types/auth.type";
import { getErrorResponseData } from "@/lib/helpers/get-error-response-data";
import { customApiCode } from "@/app/api/constants";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const RegisterPage = () => {

    const [registerUser,  {isLoading, isSuccess, isError, error}] = useRegisterMutation();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            fullname: '',
            password: '',
            confirmPassword: '',
            email: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof registerFormSchema>
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
            if (errorData.statusCode === customApiCode.EMAIL_DUPLICATED.customCode) {
                form.setError('email', {type: 'custom', message: 'This email is used by others'});
                return;
            }
            if (errorData.statusCode === customApiCode.USERNAME_DUPLICATED.customCode) {
                form.setError('username', {type: 'custom', message: 'This username is used by others'});
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

    return (
        <div className="flex w-full justify-center h-full min-h-screen items-center gap-10">
            <div className="max-w-[480px] w-full flex justify-center flex-col items-center max-md:hidden">
                <h3 className=" text-4xl font-semibold">PopcornBox</h3>
                <img src={authBgImage}/>
            </div>
            <RegisterForm 
                form={form} 
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    )
};

export default RegisterPage;