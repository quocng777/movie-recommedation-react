import RegisterForm from "./register-form";
import authBgImage from '../../assets/auth-background.svg';

const RegisterPage = () => {
    return (
        <div className="flex w-full justify-center h-full min-h-screen items-center gap-10">
            <div className="max-w-[480px] w-full flex justify-center flex-col items-center max-md:hidden">
                <h3 className=" text-4xl font-semibold">PopcornBox</h3>
                <img src={authBgImage}/>
            </div>
            <RegisterForm />
        </div>
    )
};

export default RegisterPage;