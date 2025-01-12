import { apiSlice } from "../base/api-slice";
import { AiNavigation } from "../types/ai-navigation.type";
import { LlmApiRetrieverResponse, RetrieverResult } from "../types/llm.type";
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
      Response<LlmApiRetrieverResponse<RetrieverResult<string>>>,
      { collection_name: string; query: string; amount: number; threshold: number }
    >({
      query: ({ collection_name, query, amount, threshold }) => ({
        url: `/ai/retriever`,
        method: 'GET',
        params: { collection_name, query, amount, threshold }, // Truyền params dưới dạng đối tượng
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
