import { getCurrentAuthentication, logOut } from "@/app/api/auth/auth-slice"
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux"

export const Homepage = () => {
    const authenticatedUser = useSelector(getCurrentAuthentication);
    const dispatch = useDispatch();

    const onLogoutClick = () => {
        dispatch(logOut())
    }

    return <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <h1 className="text-4xl">{'Welcome ' + authenticatedUser.fullname!}</h1>
        <Button onClick={onLogoutClick}> Logout </Button>
    </div>
}