export const ERROR_CODES = {
    ERR_INTERNAL_SERVER_ERROR: '500',
    ERR_INVALID_INPUT: 'ERR_INVALID_INPUT',
    ERR_USER_ALREADY_EXISTS: 'ERR_USER_ALREADY_EXISTS',
    SUCCESS: '200',
    BAD_REQUEST: '400',
    NOT_FOUND: '404',
    UNPROCESSABLE_ENTITY: '422',
    NO_CONTENT: '204',
};

export const ERROR_MESSAGES = {
    ERR_INTERNAL_SERVER_ERROR: 'ERR_INTERNAL_SERVER_ERROR',
    NOT_FOUND: 'ERR_NOT_FOUND',
    BAD_REQUEST: 'ERR_BAD_REQUEST',
    SUCCESS: 'OK',
    NO_CONTENT: 'NO_CONTENT_FOUND',
};

export default {
    ERROR_CODES,
    ERROR_MESSAGES,
};
