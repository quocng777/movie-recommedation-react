import { apiSlice } from "../base/api-slice";
import { AiNavigation } from "../types/ai-response.type";
import { RetrieverResult } from "../types/ai-response.type";
import { Response } from "../types/response";

export const aiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    aiNavigation: builder.query<Response<AiNavigation>, { query: string }>({
      query: (queryArg) => ({
        url: `/ai/navigate`,
        method: 'GET',
        params: queryArg,
      }),
    }),
    retrieve: builder.query<
      Response<RetrieverResult>,
      { collection_name: string; query: string; amount: number; threshold: number }
    >({
      query: ({ collection_name, query, amount, threshold }) => ({
        url: `/ai/retriever`,
        method: 'GET',
        params: { collection_name, query, amount, threshold },
      }),
    }),
  }),
});

export const {
  useLazyAiNavigationQuery,
  useRetrieveQuery,
  useAiNavigationQuery,
  useLazyRetrieveQuery
} = aiApiSlice;
