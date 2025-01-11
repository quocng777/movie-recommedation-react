import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { apiEndpoints } from "../constants";
import { Person } from "../types/person.type";
import { Credit } from "../types/person.type";
import { PersonMovieCreditsResponse } from "../types/person.type";
export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        personDetail: builder.query<Response<Person>, { person_id: string }>({
            query: ({person_id}) => ({
                url: `${apiEndpoints.PERSON}/${person_id}`,
                method: 'GET' ,
            })
        }),
        personCombinedCredits: builder.query< Response<PersonMovieCreditsResponse<Credit>>, { person_id: string }>({
            query: ({person_id}) => ({
                url: `${apiEndpoints.PERSON}/${person_id}/${apiEndpoints.MOVIE_CREDITS}`,
                method: 'GET' ,
            })
        }),
       

    })
});

export const {
  useLazyPersonDetailQuery,
  usePersonDetailQuery,
  useLazyPersonCombinedCreditsQuery,
  usePersonCombinedCreditsQuery
} = movieApiSlice;