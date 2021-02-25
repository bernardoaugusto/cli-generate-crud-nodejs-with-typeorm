/* eslint-disable */
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

require('express-async-errors');

import routes from './routes';
import { HttpError } from './utils/errors/HttpError';
import * as libSeidor from '@seidor-cloud-produtos/lib-seidor-common';
import logger from './utils/middleware/logger';
import { ValidationError } from 'yup';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        dotenv.config();

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(logger);
        this.app.use(routes);
        this.app.use(App.errorHandling);
        this.app.disable('x-powered-by');
    }

    private static errorHandling(
        error: Error | HttpError | libSeidor.error.ValidateError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { code, message, errors } = <any>error;

        const apiError = {
            code:
                <any>error instanceof HttpError ||
                <any>error instanceof ValidationError ||
                <any>error instanceof libSeidor.error.ValidateError
                    ? code
                    : 500,
            message,
            errors,
        };

        if (<any>error instanceof ValidationError && !code) {
            apiError.code = 400;
        }

        return res.status(apiError.code || 500).send(apiError);
    }
}

export default new App().app;
