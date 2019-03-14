export const ERROR_CODES = {
    ERR_INTERNAL_SERVER_ERROR: 'ERR_INTERNAL_SERVER_ERROR',
    ERR_USER_VERIFIED: 'ERR_USER_VERIFIED',
    // tslint:disable-next-line:object-literal-sort-keys
    ERR_OTP_MANDATORY: 'ERR_OTP_MANDATORY',
    ERR_INVALID_OTP: 'ERR_INVALID_OTP',
    ERR_OTP_EXPIRED: 'ERR_OTP_EXPIRED',
    ERR_INVALID_INPUT: 'ERR_INVALID_INPUT',
    ERR_USER_ALREADY_EXISTS: 'ERR_USER_ALREADY_EXISTS',
    SUCCESS: 'SUCCESS',
    ERR_UNAUTHORIZED: 'ERR_UNAUTHORIZED',
    ERR_INVALID_EMAIL: 'ERR_INVALID_EMAIL',
    ERR_INVALID_PASSWORD: 'ERR_INVALID_PASSWORD',
    ERR_INCORRECT_PASSWORD: 'ERR_INCORRECT_PASSWORD',
    ERR_EMAIL_NOT_FOUND: 'ERR_EMAIL_NOT_FOUND',
    ERR_INVALID_CREDENTIALS: 'ERR_INVALID_CREDENTIALS',
    ERR_VALIDATING_OTP: 'ERR_VALIDATING_OTP',
    ERR_USER_REGISTRATION: 'ERR_USER_REGISTRATION',
    ERR_INVALID_REFRESH_TOKEN: 'ERR_INVALID_REFRESH_TOKEN',
};

export const ERROR_MESSAGES = {
    ERR_INTERNAL_SERVER_ERROR: 'ERR_INTERNAL_SERVER_ERROR',
    ERR_USER_VERIFIED: 'ERR_USER_VERIFIED',
    // tslint:disable-next-line:object-literal-sort-keys
    ERR_OTP_MANDATORY: 'ERR_OTP_MANDATORY',
    ERR_INVALID_OTP: 'ERR_INVALID_OTP',
    ERR_OTP_EXPIRED: 'ERR_OTP_EXPIRED',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    USER_ALREADY_EXISTS: 'Email Id already exists',
    INVALID_EMAIL: 'Invalid Email id found',
    INVALID_PASSWORD: 'Invlaid Password. Password can not be empty',
    ERR_UNAUTHORIZED: 'You are not authorized to perform this action',
    ERR_VALIDATING_OTP: 'ERR_VALIDATING_OTP',
    ERR_USER_REGISTRATION: 'ERR_USER_REGISTRATION',
    MSG_INVALID_REFRESH_TOKEN: 'MSG_INVALID_REFRESH_TOKEN',
    MSG_UNKNOWN_ERROR: 'MSG_UNKNOWN_ERROR',
};

export const ERROR_MSG_STRINGS = {
    INVALID_REFRESH_TOKEN: 'Invalid Refresh Token',
    MISSING_REFRESH_TOKEN: 'Mandatory query string parameter refresh_token is missing',
};

export const GOOGLE_EXCEPTION_MSGS = {
    WRONG_RECIPIENTS: 'Wrong recipient, payload audience != requiredAudience',
};

export default {
    ERROR_CODES,
    ERROR_MESSAGES,
    GOOGLE_EXCEPTION_MSGS,
    // tslint:disable-next-line:object-literal-sort-keys
    ERROR_MSG_STRINGS,
};
