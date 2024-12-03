import { Google } from "react-bootstrap-icons";
import { Button } from "../ui/button";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";


export type CustomGoogleLoginProps = {
    onGoogleAuthSuccess: (tokenRes: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => void,
    onGoogleAuthError: (errorResponse: Pick<TokenResponse, "error" | "error_description" | "error_uri">) => void
}

export const CustomGoogleLogin = ({onGoogleAuthError, onGoogleAuthSuccess}: CustomGoogleLoginProps) => {

    const googleLogin = useGoogleLogin({
        onSuccess: onGoogleAuthSuccess,
        onError: onGoogleAuthError,
    })

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        googleLogin();
    }

    return (
        <Button className="font-semibold" onClick={onClick}>
            <Google />
            Google
        </Button>
    )
};