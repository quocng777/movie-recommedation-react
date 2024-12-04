import { getCurrentAuthentication } from "@/app/api/auth/auth-slice"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom";

export type UseRedirectToHomePageProps = {
    redirectTo?: string
}

export const useRedirectToHomePage = ({redirectTo}: UseRedirectToHomePageProps = {}) => {
    const authenticatedUser = useSelector(getCurrentAuthentication);
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!authenticatedUser) {
            return;
        }

        const redirectToSite = redirectTo || searchParams.get('redirectTo') || '/';
        console.log('redirectTo', redirectToSite)
        navigate(redirectToSite, {
            replace: true
        })
    }, [authenticatedUser])
};
