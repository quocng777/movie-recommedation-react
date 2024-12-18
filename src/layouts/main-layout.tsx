import { UserPopover } from "@/components/custom/user-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthentication } from "@/hooks/use-authentication"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export type AuthLayoutProps = {
    children: React.ReactNode,
}

export const MainLayout = ({ children}: AuthLayoutProps) => {
    const { isAuthenticated, authentication } = useAuthentication();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery) {
        navigate(`/search?query=${searchQuery}`);
      }
    };


    return (
        <>
            {
                <div className="min-h-screen">
                    <header className="w-full border-b py-4 px-12 sticky top-0 bg-opacity-80 z-50 bg-black">
                        <div className="flex w-full justify-between">
                            <Link to={'/'}>
                                <p className="font-bold">TMDB</p>
                            </Link>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Input
                                        className="rounded-full px-4"
                                        placeholder="Search..."
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                                    />
                                    <Search 
                                            className="text-white cursor-pointer absolute top-2 right-3 end-5" 
                                            onClick={handleSearch}/>
                                </div>
                                {isAuthenticated && 
                                <UserPopover>
                                    <div className="border size-10 rounded-full flex justify-center items-center  cursor-pointer shrink-0">
                                        <Avatar className="shrink-0">
                                                <AvatarImage src={authentication?.picture} className="size-10 rounded-full shrink-0" />
                                                <AvatarFallback>{authentication.username[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </UserPopover>
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