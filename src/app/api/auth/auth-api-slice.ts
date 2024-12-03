import { apiSlice } from "../base/api-slice";
import { Response } from "../types/response";
import { UserRes } from "../types/user.type";
import { CreateUserReq } from "../types/auth.type";
import { apiEndpoints } from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<Response<UserRes>, CreateUserReq>({
            query: body => ({
                url: apiEndpoints.REGISTER,
                method: 'POST',
                body 
            })
        })
    })
});

export const {
    useRegisterMutation,
} = authApiSlice