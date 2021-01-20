import { inject, injectable } from 'tsyringe';
import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import User from '../database/entities/User';
import { UserRequestInterface } from '../interfaces/metadata/RelationalWithoutTenantid';
import { UserInterface, UserRequestGetAllInterface } from '../interfaces/user';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { HttpError } from '../utils/errors/HttpError';
import { PaginateResponseProperties } from '../interfaces/pagination';
import {
    buildActivationWithUser,
    buildCreateWithUser,
    buildInactivationWithUser,
    buildUpdateWithUser,
} from '../utils/builders/dynamicBuilders';

@injectable()
export default class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async create(
        userData: UserInterface,
        userRequestData: UserRequestInterface,
        tenantid: string,
    ): Promise<UserInterface> {
        const buildedUser = buildCreateWithUser(userData, userRequestData, tenantid);

        return this.userRepository.createAndSave(buildedUser);
    }

    public async findById(id: string, tenantid: string): Promise<User> {
        const findedUser = await this.userRepository.findById(id, tenantid);

        if (!findedUser) {
            throw new HttpError(404, 'User not found');
        }

        return findedUser;
    }

    public async getAll(
        queryParams: UserRequestGetAllInterface,
        withPagination: boolean,
        showInactive: boolean,
        tenantid: string,
    ): Promise<
        | User[]
        | ({
              data: User[];
          } & PaginateResponseProperties)
    > {
        const options = typeorm.formatParamsToTypeOrmOptionsWithPaginate(
            queryParams,
            showInactive,
            tenantid,
        );

        if (withPagination) {
            const arrayUser = await this.userRepository.getAllWithPagination(
                options,
            );

            return typeorm.formatPaginateDataToResponse(queryParams, arrayUser);
        }

        return this.userRepository.getAllWithoutPagination(options);
    }

    public async update(
        userId: string,
        userDataUpdates: UserInterface,
        userRequestData: UserRequestInterface,
        tenantid: string,
    ): Promise<User> {
        const findUser = await this.findById(userId, tenantid);

        const updates = { ...findUser, ...userDataUpdates };

        const buildUpdateUser = buildUpdateWithUser(
            updates,
            userRequestData,
            userId,
            tenantid,
        );

        return this.userRepository.createAndSave(buildUpdateUser);
    }

    public async activation(
        userRequestData: UserRequestInterface,
        userId: string,
        tenantid: string,
    ): Promise<UserInterface> {
        await this.findById(userId, tenantid);

        const buildInactivateUser = buildActivationWithUser(
            userRequestData,
            userId,
            tenantid,
        ) as UserInterface;

        return this.userRepository.createAndSave(buildInactivateUser);
    }

    public async inactivation(
        userRequestData: UserRequestInterface,
        userId: string,
        tenantid: string,
    ): Promise<UserInterface> {
        await this.findById(userId, tenantid);

        const buildInactivateUser = buildInactivationWithUser(
            userRequestData,
            userId,
        ) as UserInterface;

        return this.userRepository.createAndSave(buildInactivateUser);
    }
}
