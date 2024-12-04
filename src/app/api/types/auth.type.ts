export type CreateUserReq = {
    username: string,
    fullname: string,
    password: string,
    email: string,
};

export type LoginReq = {
    email: string,
    password: string
};

export type TokenRes = {
    accessToken: string,
    refreshToken: string
};