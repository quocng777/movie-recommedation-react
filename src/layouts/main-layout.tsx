import Chatbot from "@/components/custom/chat-bot";
import Footer from "@/components/custom/footer";
import { UserPopover } from "@/components/custom/user-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthentication } from "@/hooks/use-authentication"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
      navigate(`/movie/search?query=${searchQuery}`);
    }
  };
  const [openUserPopover, setOpenUserPopover] = useState(false);

  return (
    <>
      {authentication && !authentication.activated ? (
        <Navigate
          to={`/activate-account?redirectTo=${encodeURIComponent(
            location.pathname
          )}`}
        />
      ) : (
        <div className="min-h-screen">
          <header className="w-full border-b py-4 px-12 sticky top-0 bg-opacity-80 z-50 bg-black">
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center space-x-8">
                <Link to={"/"}>
                  <p className="font-bold text-xl hover:text-rose-600 relative group">
                    TMDB2
                  </p>
                </Link>
                <Link to={"/movie"}>
                  <p className="font-semibold hover:text-rose-600 relative group pt-1 pb-1">
                    Movies
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
                  </p>
                </Link>
              </div>
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
                    onClick={handleSearch}
                  />
                </div>
                {isAuthenticated && (
                  <UserPopover
                    open={openUserPopover}
                    onOpenChange={setOpenUserPopover}
                    closePopover={() => setOpenUserPopover(false)}
                  >
                    <div className="border size-10 rounded-full flex justify-center items-center  cursor-pointer shrink-0 bg-black">
                      <Avatar className="shrink-0">
                        <AvatarImage
                          src={authentication?.picture}
                          className="size-10 rounded-full shrink-0"
                        />
                        <AvatarFallback>
                          {authentication.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </UserPopover>
                )}
                {!isAuthenticated && (
                  <div className="flex space-x-4">
                    <Link to={"/login"}>
                      <Button size="sm" className="font-semibold rounded-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="font-semibold rounded-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>
          {children}
          <Chatbot />
          <Footer />
        </div>
      )}
    </>
  );
} 