import { Router } from 'express';
import { middleware, validation } from '@seidor-cloud-produtos/lib-seidor-common';

import * as TableNameController from '../controllers/tableNameController';
import {
    createTableNameSchema,
    getAllTableNameSchema,
    updateTableNameSchema,
} from '../utils/tableName/validators';

const router = Router();

/**
 * @swagger
 * /api/table-name:
 *   post:
 *     tags:
 *       - TableName
 *     description: Create TableName
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
 *       - name: tableName
 *         description: JSON with TableName attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/TableNameCreate'
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TableName'
 */

router.post(
    '/',
    middleware.validatorMiddleware({ body: createTableNameSchema, headers: validation.commomValidators.tenantidSchema }),
    TableNameController.create,
);

/**
 * @swagger
 * /api/table-name/:tableNameId:
 *   get:
 *     tags:
 *       - TableName
 *     description: Get TableName by Id
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
 *         name: tableNameId
 *         type: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TableName'
 */

router.get(
    '/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    TableNameController.findOne,
);

/**
 * @swagger
 * /api/table-name:
 *   get:
 *     tags:
 *      - TableName
 *     description: GetAll TableName
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
 *         enum: [ settings, url, cpf, created_at, created_by_name, created_by_email, updated_at, updated_by_name, updated_by_email ]
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
 *         name: settings
 *         type: string
 *       - in: query
 *         name: url
 *         type: string
 *       - in: query
 *         name: cpf
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
 *                 - title: GetAll TableName with pagination
 *                   allOf:
 *                     - type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             type: object
 *                             $ref: '#/definitions/TableName'
 *                     - $ref: '#/definitions/PaginationResponse'
 *                 - title: GetAll TableName without pagination
 *                   allOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         $ref: '#/definitions/TableName'
 */

router.get(
    '/',
    middleware.validatorMiddleware({ headers: validation.commomValidators.tenantidSchema, query: getAllTableNameSchema }),
    TableNameController.findAll,
);

/**
 * @swagger
 * /api/table-name/:tableNameId:
 *   put:
 *     tags:
 *       - TableName
 *     description: Update TableName
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
 *         name: tableNameId
 *         type: uuid
 *         required: true
 *       - name: tableName
 *         description: JSON with tableName attributes.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/TableNameUpdate'
 *
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TableName'
 */

router.put(
    '/:id',
    middleware.validatorMiddleware({
        body: updateTableNameSchema,
        params: validation.commomValidators.idParamSchema,
        headers: validation.commomValidators.tenantidSchema,
    }),
    TableNameController.update,
);

/**
 * @swagger
 * /api/table-name/activation/:tableNameId:
 *   post:
 *     tags:
 *       - TableName
 *     description: Activate TableName
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
 *         name: tableNameId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successfull
 */

router.post(
    '/activation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    TableNameController.activation,
);

/**
 * @swagger
 * /api/table-name/inactivation/:tableNameId:
 *   post:
 *     tags:
 *       - TableName
 *     description: Inactivate TableName
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
 *         name: tableNameId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successfull
 */

router.post(
    '/inactivation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.tenantidSchema }),
    TableNameController.inactivation,
);

export default router;
