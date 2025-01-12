import { LlmApiRetrieverResponse, RetrieverResult } from "../types/llm.type";

export const retrieveSimilarItems = async (
  query: string, 
  amount: number = 10, 
  threshold: number = 0.25
) => {
  try {
    // Tạo query string
    const url = new URL('https://awd-llm.azurewebsites.net/retriever/');
    url.searchParams.append('llm_api_key', import.meta.env.VITE_LLM_API_KEY); 
    url.searchParams.append('collection_name', 'movies');
    url.searchParams.append('query', query);
    url.searchParams.append('amount', amount.toString());
    url.searchParams.append('threshold', threshold.toString());
    console.log(url.toString())
    // Gửi yêu cầu GET với query string
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    // Kiểm tra nếu response thành công
    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data: LlmApiRetrieverResponse<RetrieverResult> = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching similar items:', error);
    throw error;
  }
};
