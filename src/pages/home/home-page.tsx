import { SliderButton } from "@/components/custom/slider-button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Homepage = () => {

    return <div className="w-full">
        <section className="px-8 flex justify-center w-full bg-discover-bg py-8 bg-black bg-center relative">
            <div className="absolute inset-0 bg-black opacity-35 z-10"></div>
            <div className="max-w-[1300px] z-20" >
                <h3 className="text-4xl font-semibold">Welcome to TMDB</h3>
                <p className="text-2xl font-medium mt-2">Millions of movies, TV shows and people to discover. Explore now.</p>

                <div className="relative">
                    <Input className="rounded-full py-6 px-6 mt-8" placeholder="Search for a movie, tv show, person"></Input>

                    <Search className="text-white cursor-pointer absolute top-3 end-5" />
                </div>
            </div>
        </section>

        <section className="px-8 mt-8">
            <div className="max-w-[1300px] flex items-center space-x-6">
                <h4 className="text-lg">Trending</h4>
                <SliderButton />
            </div>

            
        </section>
    </div>
}