import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react"
import { Response } from "../types/response";
import { TokenRes } from "../types/auth.type";
import { logOut } from "../auth/auth-slice";
import { apiEndpoints } from "../constants";


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("access_token");
        if(token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    }, 
}); 

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        const refreshToken = localStorage.getItem("refresh_token");

        if(refreshToken) {
            try {
                const refreshResult = await baseQuery(apiEndpoints.REFRESH_TOKEN, api, {body: {refreshToken}, method: 'POST'}) as Response<TokenRes>;
                if(refreshResult.data) {
                    console.log(refreshResult.data);
                    localStorage.setItem("refresh_token", refreshResult.data.refreshToken);
                    localStorage.setItem("access_token", refreshResult.data.accessToken);
                }
            } catch(e) {
                api.dispatch(logOut());
            }
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }

        return result;
    }


    return result;

}

export const apiSlice = createApi({
        baseQuery: baseQueryWithReAuth,
        endpoints: () => ({}),
    }
);