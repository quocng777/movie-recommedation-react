// types/llm.ts
export type LlmApiRetrieverResponse<T> = {
    data: T,
    status: number
  }
  
  export type  RetrieverResult<T> =  {
    result : T[]
  }