import { RootState } from "@/app/api/store";
import { PlaylistCard } from "@/components/custom/playlist-card";
import { useSelector } from "react-redux";

export const PlaylistPage = () => {
    const playlists = useSelector((state: RootState) => {
        return state.playlist;
    });

    return (
        <div className="w-full py-4 px-8 max-w-[1200px] mx-auto">
            <h3 className="text-3xl font-semibold">Playlists</h3>

            <div className="grid gap-8 max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 w-full justify-center mt-8">
                {
                    playlists.map((playlist) => (
                        <div key={playlist.id} className="justify-self-center">
                            <PlaylistCard playlist={playlist}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
