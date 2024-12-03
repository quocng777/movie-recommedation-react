export const authFormSchema = {
    USERNAME_MIN_LENGTH: 5,
    USERNAME_MAX_LENGTH: 10,
    FULLNAME_MAX_LENGTH: 40,
    FULLNAME_MIN_LENGTH: 1,
    PASSWORD_MIN_LENGTH: 5,
    PASSWORD_MAX_LENGTH: 16
}

export const authFormErrorMessage = {
    USERNAME_MIN_LENGTH: `Username must be at least ${authFormSchema.USERNAME_MIN_LENGTH} characters`,
    USERNAME_MAX_LENGTH: `Username'length must not be more than ${authFormSchema.USERNAME_MAX_LENGTH} characters`,
    FULLNAME_MIN_LENGTH: `Fullname must be at least ${authFormSchema.FULLNAME_MIN_LENGTH} characters`,
    FULLNAME_MAX_LENGTH: `Fullname'length must not be more than ${authFormSchema.USERNAME_MAX_LENGTH}`
}