import { Router } from 'express';
import { middleware, validation } from '@seidor-cloud-produtos/lib-seidor-common';

import * as SchoolController from '../controllers/schoolController';
import {
    createSchoolSchema,
    getAllSchoolSchema,
    updateSchoolSchema,
} from '../utils/school/validators';

const router = Router();

/**
 * @swagger
 * /api/school:
 *   post:
 *     tags:
 *       - School
 *     description: Create School
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
 *       - name: school
 *         description: JSON with School attributes.
 *         in: body
 *         required: true
 *         schema:
 *            $ref: '#/definitions/SchoolCreate'
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/School'
 */

router.post(
    '/',
    middleware.validatorMiddleware({ body: createSchoolSchema, headers: validation.commomValidators.userSchema }),
    SchoolController.create,
);

/**
 * @swagger
 * /api/school/:schoolId:
 *   get:
 *     tags:
 *       - School
 *     description: Get School by Id
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
 *         name: schoolId
 *         type: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/School'
 */

router.get(
    '/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.userSchema }),
    SchoolController.findOne,
);

/**
 * @swagger
 * /api/school:
 *   get:
 *     tags:
 *      - School
 *     description: GetAll School
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
 *         enum: [ name, address, director, telephone, created_at, created_by_name, created_by_email, updated_at, updated_by_name, updated_by_email ]
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
 *         name: address
 *         type: string
 *       - in: query
 *         name: director
 *         type: string
 *       - in: query
 *         name: telephone
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
 *                 - title: GetAll School with pagination
 *                   allOf:
 *                     - type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             type: object
 *                             $ref: '#/definitions/School'
 *                     - $ref: '#/definitions/PaginationResponse'
 *                 - title: GetAll School without pagination
 *                   allOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         $ref: '#/definitions/School'
 */

router.get(
    '/',
    middleware.validatorMiddleware({ headers: validation.commomValidators.userSchema, query: getAllSchoolSchema }),
    SchoolController.findAll,
);

/**
 * @swagger
 * /api/school/:schoolId:
 *   put:
 *     tags:
 *       - School
 *     description: Update School
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
 *         name: schoolId
 *         type: uuid
 *         required: true
 *       - name: school
 *         description: JSON with school attributes.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/SchoolUpdate'
 *
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/School'
 */

router.put(
    '/:id',
    middleware.validatorMiddleware({
        body: updateSchoolSchema,
        params: validation.commomValidators.idParamSchema,
        headers: validation.commomValidators.userSchema,
    }),
    SchoolController.update,
);

/**
 * @swagger
 * /api/school/activation/:schoolId:
 *   post:
 *     tags:
 *       - School
 *     description: Activate School
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
 *         name: schoolId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successfull
 */

router.post(
    '/activation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.userSchema }),
    SchoolController.activation,
);

/**
 * @swagger
 * /api/school/inactivation/:schoolId:
 *   post:
 *     tags:
 *       - School
 *     description: Inactivate School
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
 *         name: schoolId
 *         type: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Successfull
 */

router.post(
    '/inactivation/:id',
    middleware.validatorMiddleware({ params: validation.commomValidators.idParamSchema, headers: validation.commomValidators.userSchema }),
    SchoolController.inactivation,
);

export default router;
