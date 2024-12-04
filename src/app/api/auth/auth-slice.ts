import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRes } from "../types/user.type";

export type User = UserRes;

type AuthState = {
    user: User | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticatedUser: (state, action: PayloadAction<User>) => {
            console.log('reducer', action.payload)
            const user = action.payload;
            state.user = user;
        },
        logOut: (state) => {
            state.user = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
        renewToken: () => {}
    }
});

export const { setAuthenticatedUser, logOut, renewToken } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentAuthentication = (state: any): User => state.auth.user;