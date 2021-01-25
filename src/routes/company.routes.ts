import { Router } from 'express';
import { middleware, validation } from '@seidor-cloud-produtos/lib-seidor-common';

import * as CompanyController from '../controllers/companyController';
import {
    createCompanySchema,
    getAllCompanySchema,
    updateCompanySchema,
} from '../utils/company/validators';

const router = Router();

/**
 * @swagger
 * /api/company:
 *   post:
 *     tags:
 *       - Company
 *     description: Create Company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - name: company
 *         description: JSON with Company attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/CompanyCreate'
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Company'
 */

router.post(
    '/',
    middleware.validatorMiddleware({ body: createCompanySchema, headers: validation.commomValidators.tenantidSchema }),
    CompanyController.create,
);

/**
 * @swagger
 * /api/company/:companyId:
 *   get:
 *     tags:
 *       - Company
 *     description: Get Company by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: companyId
 *         type: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Company'
 */

router.get(
    '/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    CompanyController.findOne,
);

/**
 * @swagger
 * /api/company:
 *   get:
 *     tags:
 *      - Company
 *     description: GetAll Company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: query
 *         name: page
 *         type: number
 *       - in: query
 *         name: size
 *         type: number
 *       - in: query
 *         name: withPagination
 *         type: boolean
 *       - in: query
 *         name: showInactive
 *         type: boolean
 *       - in: query
 *         name: sortParam
 *         type: string
 *         enum: [ name, cnpj, address, value, created_at, created_by_name, created_by_email, updated_at, updated_by_name, updated_by_email ]
 *       - in: query
 *         name: sortOrder
 *         type: string
 *         enum: [asc, desc, ASC, DESC]
 *       - in: query
 *         name: dateFilter
 *         type: enum [created_at, updated_at]
 *       - in: query
 *         name: startDateFilter
 *         type: string
 *         example: '2021-01-01'
 *       - in: query
 *         name: endDateFilter
 *         type: string
 *         example: '2021-01-31'
 *       - in: query
 *         name: name
 *         type: string
 *       - in: query
 *         name: cnpj
 *         type: string
 *       - in: query
 *         name: address
 *         type: string
 *       - in: query
 *         name: value
 *         type: number
 *       - in: query
 *         name: created_by_name
 *         type: string
 *       - in: query
 *         name: created_by_email
 *         type: string
 *       - in: query
 *         name: updated_by_name
 *         type: string
 *       - in: query
 *         name: updated_by_email
 *         type: string
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - title: GetAll Company with pagination
 *                   allOf:
 *                     - type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             type: object
 *                             $ref: '#/definitions/Company'
 *                     - $ref: '#/definitions/PaginationResponse'
 *                 - title: GetAll Company without pagination
 *                   allOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         $ref: '#/definitions/Company'
 */

router.get(
    '/',
    middleware.validatorMiddleware({ headers: validation.commomValidators.tenantidSchema, query: getAllCompanySchema }),
    CompanyController.findAll,
);

/**
 * @swagger
 * /api/company/:companyId:
 *   put:
 *     tags:
 *       - Company
 *     description: Update Company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: companyId
 *         type: uuid
 *         required: true
 *       - name: company
 *         description: JSON with company attributes.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/CompanyUpdate'
 *
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Company'
 */

router.put(
    '/:id',
    middleware.validatorMiddleware({
        body: updateCompanySchema,
        params: validation.commomValidators.idParamSchema,
        headers: validation.commomValidators.tenantidSchema,
    }),
    CompanyController.update,
);

/**
 * @swagger
 * /api/company/activation/:companyId:
 *   post:
 *     tags:
 *       - Company
 *     description: Activate Company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: companyId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successfull
 */

router.post(
    '/activation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    CompanyController.activation,
);

/**
 * @swagger
 * /api/company/inactivation/:companyId:
 *   post:
 *     tags:
 *       - Company
 *     description: Inactivate Company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: companyId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successfull
 */

router.post(
    '/inactivation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    CompanyController.inactivation,
);

export default router;
