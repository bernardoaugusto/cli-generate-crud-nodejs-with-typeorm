import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { UserRequestGetAllInterface } from '../interfaces/user';
import UserService from '../services/UserService';
import { UserRequestInterface } from '../interfaces/metadata/RelationalWithoutTenantid';
import { getAllUserSchema } from '../utils/user/validators';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const userData = req.body;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };
    const tenantid = req.headers.tenantid as string;

    const userService = container.resolve(UserService);
    const response = await userService.create(userData, userRequestData, tenantid);

    return res.status(201).json(response);
};

export const findOne = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const tenantid = req.headers.tenantid as string;

    const userService = container.resolve(UserService);
    const response = await userService.findById(userId, tenantid);

    return res.status(200).json(response);
};

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const tenantid = req.headers.tenantid as string;
    const query = (await getAllUserSchema.validate(req.query, {
        stripUnknown: true,
    })) as UserRequestGetAllInterface;

    const withPagination = JSON.parse(query.withPagination || 'true');
    const showInactive = JSON.parse(query.showInactive || 'false');

    const userService = container.resolve(UserService);
    const response = await userService.getAll(
        query,
        withPagination,
        showInactive,
        tenantid,
    );

    return res.status(200).json(response);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    const tenantid = req.headers.tenantid as string;
    const updates = req.body;
    const userId = req.params.id;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };

    const userService = container.resolve(UserService);

    const response = await userService.update(
        userId,
        updates,
        userRequestData,
        tenantid,
    );

    return res.status(201).json(response);
};

export const activation = async (req: Request, res: Response): Promise<Response> => {
    const tenantid = req.headers.tenantid as string;
    const userId = req.params.id;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };

    const userService = container.resolve(UserService);
    await userService.activation(userRequestData, userId, tenantid);

    return res.status(204).json();
};

export const inactivation = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const tenantid = req.headers.tenantid as string;
    const userId = req.params.id;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };

    const userService = container.resolve(UserService);
    await userService.inactivation(userRequestData, userId, tenantid);

    return res.status(204).json();
};
