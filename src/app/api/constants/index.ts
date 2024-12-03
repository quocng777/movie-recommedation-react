export const apiEndpoints = {
    REGISTER: '/auth/register',
    GOOGLE_AUTH: '/auth/google',
    LOGIN: '/auth/login',
};

export const customApiCode = {
    "USERNAME_DUPLICATED" : {
        customCode: 601,
        message: 'username is duplicated'
    },
    "EMAIL_DUPLICATED" : {
        customCode: 602,
        message: 'email is duplicated'
    }
};
