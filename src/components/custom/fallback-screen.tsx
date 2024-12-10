import { useTopBarLoader } from "@/hooks/use-top-loader";
import { useEffect } from "react";
import { Spinner } from "./spinner";

export const FallbackScreen = () => {
    const {staticStart, complete} = useTopBarLoader();

    useEffect(() => {
        staticStart();
        return () => {
            complete();
        }
    }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="text-center flex flex-col items-center">
        <Spinner isOpening={true} />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
};
