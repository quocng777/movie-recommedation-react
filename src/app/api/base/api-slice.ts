import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");
        if(token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    }, 
}); 

export const apiSlice = createApi({
        baseQuery,
        endpoints: () => ({}),
    }
);