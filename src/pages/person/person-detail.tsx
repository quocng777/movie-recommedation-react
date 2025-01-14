import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FallbackScreen } from "@/components/custom/fallback-screen";
import { MovieCardSkeleton } from "@/components/custom/movie-card-sekeleton";
import {
  useLazyPersonDetailQuery,
  useLazyPersonCombinedCreditsQuery,
} from "@/app/api/person/person-api-slice";
import { getResourceFromTmdb } from "@/lib/helpers/get-resource-tmbd";
import { Credit, Person } from "@/app/api/types/person.type";
import { MovieCreditsCard } from "@/components/custom/movie-credits-card";

function getGenderText(gender: number | undefined): string {
  const genderMap: { [key: number]: string } = {
    0: "Not set / not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  return gender !== undefined ? genderMap[gender] || "Unknown" : "Unknown";
}
const PersonDetail = () => {
  const navigate = useNavigate();
  const { person_id } = useParams<{ person_id: string }>();
  const [person, setPerson] = useState<Person>();
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [
    getPersonDetail,
    {
      data: personData,
      isSuccess: IsSuccessGetPersonDetail,
      isError: isErrorGetPersonDetail,
    },
  ] = useLazyPersonDetailQuery();
  const [
    getPersonMovieCredit,
    {
      data: movieData,
      isSuccess: IsSuccessGetPersonMovieCredit,
      isError: isErrorGetPersonMovieCredit,
    },
  ] = useLazyPersonCombinedCreditsQuery();

  const onMovieClick = (movie_id: string) => {
    navigate("/movie/" + movie_id);
    return;
  };
  useEffect(() => {
    if (person_id) {
      setIsLoading(true);
      getPersonDetail({ person_id });

      getPersonMovieCredit({ person_id });
      setIsMovieLoading(true);
    }
  }, [person_id, getPersonDetail, getPersonMovieCredit]);

  useEffect(() => {
    if (IsSuccessGetPersonDetail && personData) {
      setPerson(personData.data);
      setIsLoading(false);
      setIsMovieLoading(false);
    }
  }, [IsSuccessGetPersonDetail, personData]);
  useEffect(() => {
    if (IsSuccessGetPersonMovieCredit && movieData) {
      if (!movieData.data?.cast!) {
        setHasError(true);
      } else {
        setIsMovieLoading(false);
      }
    }
  }, [IsSuccessGetPersonMovieCredit, movieData]);

  useEffect(() => {
    if (isErrorGetPersonDetail) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [
    isErrorGetPersonDetail,
    isErrorGetPersonMovieCredit,
    IsSuccessGetPersonDetail,
    IsSuccessGetPersonMovieCredit,
  ]);
  if (isLoading) return <FallbackScreen />;

  if (hasError || !person || !person.movie_credits) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold text-white">Person Not Found</h1>
        <p className="text-white mt-2">
          We couldn't find the person you were looking for. Please check the ID
          and try again.
        </p>
      </div>
    );
  }
  const sortedCredits = person.movie_credits.cast
    .map((credit) => ({
      ...credit,
      releaseYear: credit.release_date
        ? new Date(credit.release_date).getFullYear()
        : undefined,
    }))
    .sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
  return (
    <div className="flex flex-col md:flex-row bg-black bg-center p-6 rounded-lg shadow-md">
      {/* Left Section - Image and Personal Info */}
      <div className="flex flex-col items-center w-full md:w-1/4 p-4">
        {/* Profile Image */}
        <img
          src={getResourceFromTmdb(person?.profile_path ?? "default-image-url")}
          className="w-full h-auto rounded-lg shadow-lg"
        />

        {/* Personal Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Personal Info</h2>

          <div className="text-left ">
            <p className="mb-2">
              <span className="font-bold">Known For:</span>{" "}
              {person?.known_for_department}
            </p>
            <p className="mb-2">
              {/* <span className="font-bold">Known Credits:</span> {person?.known_for_department} */}
            </p>
            <p className="mb-2">
              <span className="font-bold">Gender:</span>{" "}
              {getGenderText(person?.gender)}
            </p>
            <p className="mb-2">
              <span className="font-bold">Birthday:</span> {person?.birthday}
            </p>
            <p className="mb-2">
              <span className="font-bold">Place of Birth:</span>{" "}
              {person?.place_of_birth}
            </p>
            <p className="mb-2">
              <span className="font-bold">Also Known As:</span>{" "}
              {person?.also_known_as.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Known For and Acting Credits */}
      <div className="flex flex-col w-full md:w-3/4 p-4">
        {/* Known For */}
        <h2 className="text-2xl font-bold mb-2">{person?.name}</h2>

        <p className="mb-2">
          <span className="font-bold">Biography</span>
          <p>
            {person?.biography && person.biography.trim() !== ""
              ? person.biography
              : `We don't have a biography for ${
                  person?.name || "this person"
                }.`}
          </p>
        </p>
        <div className="max-w-[1300px] w-full">
          <div className="max-w-[1300px] flex items-center space-x-6">
            <span className="font-bold">Acting list:</span>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-4 py-6">
              {isMovieLoading &&
                new Array(10).fill(null).map((_, idx) => {
                  return <MovieCardSkeleton key={idx} />;
                })}
              {person?.movie_credits.cast.map((credit) => {
                return (
                  <MovieCreditsCard
                    key={credit.id}
                    movie={credit}
                    onClick={() => onMovieClick(credit.id.toString())}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="p-6 bg-black">
          <div className="bg-black shadow-md rounded-lg p-4 border border-gray-700">
            {sortedCredits.map((credit, index) => (
              <div
                key={index}
                className="flex items-start py-3 border-b border-gray-700 last:border-b-0"
              >
                <div className="w-16 text-gray-500 font-medium">
                  {credit.releaseYear ? credit.releaseYear : "N/A"}
                </div>
                <div className="flex-grow">
                  <h3
                    className="text-white font-semibold hover:text-blue-500 cursor-pointer"
                    onClick={() => onMovieClick(credit.id.toString())}
                  >
                    {credit.title}
                  </h3>
                  <p className="text-gray-300 text-sm">as {credit.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
