import { Spinner } from "./spinner";

export const FallbackScreen = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black">
      <div className="text-center flex flex-col items-center">
        <Spinner isOpening={true} />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
};
