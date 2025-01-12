import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { AiNavigation } from "../types/ai-navigation.type";

export const aiApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    aiNavigation: builder.query<Response<AiNavigation>, {query: string}>({
        query: (queryArg) => ({
          url: `/ai/navigate`,
          method: 'GET',
          params: queryArg,
        })
    })
  })
})

export const {
  useLazyAiNavigationQuery,
} = aiApiSlice;