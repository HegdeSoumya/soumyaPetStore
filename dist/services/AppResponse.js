"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppResponse {
    constructor() {
        this.SUCCESS = 200;
        this.NO_CONTENT = 204;
        this.BAD_REQUEST = 400;
        this.NOT_FOUND = 404;
        this.CONFLICT = 409;
        this.UNPROCESSABLE_ENTITY = 422;
        this.INTERNAL_SERVER_ERROR = 500;
        this.success = (res, data) => {
            res.status(this.SUCCESS).send({
                status: 'SUCCESS',
                // tslint:disable-next-line:object-literal-sort-keys
                data,
            });
        };
        this.error = (res, code, message, description = '') => {
            res.status(this.INTERNAL_SERVER_ERROR).send({
                status: 'ERROR',
                // tslint:disable-next-line:object-literal-sort-keys
                data: {
                    error: {
                        code,
                        message,
                        // tslint:disable-next-line:object-literal-sort-keys
                        description,
                    },
                },
            });
        };
        this.unprocessableEntity = (res, code, message, description = '') => {
            res.status(this.UNPROCESSABLE_ENTITY).send({
                status: 'FAILURE',
                // tslint:disable-next-line:object-literal-sort-keys
                data: {
                    error: {
                        code,
                        message,
                        // tslint:disable-next-line:object-literal-sort-keys
                        description,
                    },
                },
            });
        };
        this.badRequest = (res, code, message, description = '') => {
            res.status(this.BAD_REQUEST).send({
                status: 'FAILURE',
                // tslint:disable-next-line:object-literal-sort-keys
                data: {
                    error: {
                        code,
                        message,
                        // tslint:disable-next-line:object-literal-sort-keys
                        description,
                    },
                },
            });
        };
        this.conflict = (res, code, message, description = '') => {
            res.status(this.CONFLICT).send({
                status: 'FAILURE',
                // tslint:disable-next-line:object-literal-sort-keys
                data: {
                    error: {
                        code,
                        message,
                        // tslint:disable-next-line:object-literal-sort-keys
                        description,
                    },
                },
            });
        };
        this.noContent = (res) => {
            res.status(this.NO_CONTENT).send({});
        };
        this.notFound = (res, code, message, description = '') => {
            res.status(this.NOT_FOUND).send({
                status: 'FAILURE',
                // tslint:disable-next-line:object-literal-sort-keys
                data: {
                    error: {
                        code,
                        message,
                        // tslint:disable-next-line:object-literal-sort-keys
                        description,
                    },
                },
            });
        };
    }
}
exports.AppResponse = AppResponse;
//# sourceMappingURL=AppResponse.js.map