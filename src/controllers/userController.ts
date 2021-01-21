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
    

    const userService = container.resolve(UserService);
    const response = await userService.create(userData, userRequestData);

    return res.status(201).json(response);
};

export const findOne = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;

    const userService = container.resolve(UserService);
    const response = await userService.findOne(userId);

    return res.status(200).json(response);
};

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const query = (await getAllUserSchema.validate(req.query, {
        stripUnknown: true,
    })) as UserRequestGetAllInterface;

    const filterOptions: FilterOptionsInterface = {
        withPagination: JSON.parse(query.withPagination || 'true'),
        showInactive: JSON.parse(query.showInactive || 'false'),
    };

    const userService = container.resolve(UserService);
    const response = await userService.getAll(query, filterOptions);

    return res.status(200).json(response);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    const updates = req.body;
    const userId = req.params.id;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };

    const userService = container.resolve(UserService);

    const response = await userService.update(
        updates,
        userRequestData,
        userId,
    );

    return res.status(201).json(response);
};

export const activation = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };

    const userService = container.resolve(UserService);
    await userService.activation(userRequestData, userId);

    return res.status(204).json();
};

export const inactivation = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const userId = req.params.id;
    const userRequestData: UserRequestInterface = {
        username: req.headers.username as string,
        useremail: req.headers.useremail as string,
    };

    const userService = container.resolve(UserService);
    await userService.inactivation(userRequestData, userId);

    return res.status(204).json();
};
