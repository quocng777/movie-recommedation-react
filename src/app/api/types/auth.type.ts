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

export type TokeRes = {
    accessToken: string,
    refreshToken: string
};