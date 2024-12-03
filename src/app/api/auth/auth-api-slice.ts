import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { UserRes } from "../types/user.type";
import { CreateUserReq, LoginReq, TokeRes } from "../types/auth.type";
import { apiEndpoints } from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<Response<UserRes>, CreateUserReq>({
            query: body => ({
                url: apiEndpoints.REGISTER,
                method: 'POST',
                body 
            })
        }),
        googleLogin: builder.mutation<Response<any>, {token: string}>({
            query: body => ({
                url: apiEndpoints.GOOGLE_AUTH,
                method: 'POST',
                body
            })
        }),
        login: builder.mutation<Response<TokeRes>, LoginReq>({
            query: body => ({
                url: apiEndpoints.LOGIN,
                method: 'POST',
                body   
            })
        }),
    })
});

export const {
    useRegisterMutation,
    useGoogleLoginMutation,
    useLoginMutation,
} = authApiSlice