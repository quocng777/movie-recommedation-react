import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ErrorResponseData = {
    statusCode: number,
    message: string,
    timestamp: Date
}

export const getErrorResponseData = (error: FetchBaseQueryError | SerializedError) => {
    if ('status' in error) {
        const data = 
       (error.data as ErrorResponseData);
       return data;
    } 

    return null;
}