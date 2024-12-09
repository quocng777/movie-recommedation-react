import { getCurrentAuthentication } from "@/app/api/auth/auth-slice"
import { useMemo } from "react";
import { useSelector } from "react-redux"

export const useAuthentication = () => {
    const authentication = useSelector(getCurrentAuthentication);

    const isAuthenticated = useMemo(() => !!authentication, [authentication]);

    return {
        authentication,
        isAuthenticated
    }; 
}