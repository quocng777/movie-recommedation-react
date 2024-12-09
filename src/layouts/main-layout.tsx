import { Button } from "@/components/ui/button";
import { useAuthentication } from "@/hooks/use-authentication"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

export type AuthLayoutProps = {
    children: React.ReactNode,
}

export const MainLayout = ({ children}: AuthLayoutProps) => {
    const { isAuthenticated, authentication } = useAuthentication();
    return (
        <>
            {
                <div className="min-h-screen">
                    <header className="w-full border-b py-4 px-6 sticky top-0 bg-opacity-70">
                        <div className="flex w-full justify-between">
                            <p>TMDB</p>
                            <div>
                                {isAuthenticated && 
                                <div className="border size-10 rounded-full flex justify-center items-center ">
                                    <Avatar>
                                            <AvatarImage src={authentication?.picture} className="size-6 rounded-full" />
                                            <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                }
                                {!isAuthenticated && 
                                    <div className="flex space-x-4">
                                        <Link to={'/login'}><Button size='sm' className="font-semibold rounded-full" >Login</Button></Link>
                                        <Link to='/register'>
                                            <Button size='sm' className="font-semibold rounded-full" >Register</Button>
                                        </Link>
                                    </div>}
                            </div>
                        </div>
                    </header>
                    {children}
                </div>
            }
        </>
    )
} 