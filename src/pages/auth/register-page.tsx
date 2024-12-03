import RegisterForm from "./register-form";
import authBgImage from '../../assets/auth-background.svg';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerFormSchema from "@/lib/vallidation/register-form-schema";
import { useRegisterMutation } from "@/app/api/auth/auth-apil-slice";
import { CreateUserReq } from "@/app/api/types/auth.type";

const RegisterPage = () => {

    const [registerUser, {isLoading, isSuccess, isError, error}] = useRegisterMutation();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            fullname: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof registerFormSchema>
    ) => {
        try {
            await registerUser(values as CreateUserReq)
            if(isSuccess) {
                alert('sucess');
            }
            if(isError) {
                alert('error');
            }
        } catch(error) {
            alert('Create user Error');
        }
    };

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