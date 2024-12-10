import { ReactNode } from "react"
import { useDispatch } from "react-redux"
import { setAuthenticatedUser } from "../api/auth/auth-slice"
import { useGetAuthenticationQuery } from "../api/user/user.api.slice"
import { UserRes } from "../api/types/user.type"
import { FallbackScreen } from "@/components/custom/fallback-screen"

type AuthLoaderProps = {
    children: ReactNode
}

export const AuthLoader = ({ children}: AuthLoaderProps) => {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem("access_token");
    const {data, isSuccess, isLoading, isError} = useGetAuthenticationQuery(undefined, {
        skip: !accessToken
    });
    
    if(data) {
        dispatch(setAuthenticatedUser(data?.data as UserRes))
    }

    return (
        <>
            {isLoading && <FallbackScreen />}
            {(!accessToken || isSuccess || isError) && children}
        </>
    )
}