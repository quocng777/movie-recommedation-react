import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import messageSentImage from "@/assets/message-sent.svg";
import { useLazyActivateAccountQuery } from "@/app/api/auth/auth-api-slice";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const ActivateAccountPage = () => {
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const [ activateAccount, {isSuccess, isError} ] = useLazyActivateAccountQuery();

    const onConfirmClick = () => {
      activateAccount({token: token || ''});
    }

    useEffect(() => {
      if(!isError) {
        return;
      }
      
      toast({
        variant: 'destructive',
        title: 'Error ⚠️⚠️⚠️',
        description: 'Something went wrong with your verification!'
      })
    })

    useEffect(() => {
      if(!isSuccess) {
        return;
      }

      window.location.href = '/';
    }, [isSuccess]);

    return (
        <div className="w-full min-h-screen">
            {
                !token
                    ? (
                        <div className="w-full flex flex-col justify-center items-center gap-6 py-12">
                            <img src={messageSentImage} className="max-w-60"/>
                            <div>We send you an activation account email. Please check your email!</div>
                            <Button className="font-semibold">
                                Send new email
                            </Button>
                        </div>
                    )
                    : (
                        <div className="w-full flex flex-col items-center justify-center mt-16">
                            <h3 className="font-semibold text-3xl">TMDB 2</h3>
                            <p className="font-semibold text-2xl">Account Confirmation</p>
                            <p className="my-4">
                            By click below button, your account will be activated with registed email.
                            </p>
                            <Button className="bg-red-600 text-white font-semibold hover:bg-red-400" onClick={onConfirmClick}>
                                Confirm you account
                            </Button>
                        </div>
                    )

            }
        </div>
    );
};