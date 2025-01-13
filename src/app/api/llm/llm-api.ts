import { LlmApiRetrieverResponse, RetrieverResult } from "../types/ai-response.type";
import { Movie } from "../types/movie.type";
export const retrieveSimilarItems = async (
  query: string, 
  amount: number = 10, 
  threshold: number = 0.25
) => {
  try {
    const url = new URL('https://awd-llm.azurewebsites.net/retriever/');
    url.searchParams.append('llm_api_key', import.meta.env.VITE_LLM_API_KEY); 
    url.searchParams.append('collection_name', 'movies');
    url.searchParams.append('query', query);
    url.searchParams.append('amount', amount.toString());
    url.searchParams.append('threshold', threshold.toString());
    console.log(url.toString())
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data: LlmApiRetrieverResponse<RetrieverResult<Movie>> = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching similar items:', error);
    throw error;
  }
};
