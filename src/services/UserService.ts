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
        
    ): Promise<User> {
        const buildedUser = buildCreateWithUser(userData, userRequestData);

        return this.userRepository.createAndSave(buildedUser);
    }

    public async findById(id: string): Promise<User> {
        const findedUser = await this.userRepository.findById(id);

        if (!findedUser) {
            throw new HttpError(404, 'User not found');
        }

        return findedUser;
    }

    public async getAll(
        queryParams: UserRequestGetAllInterface,
        withPagination: boolean,
        showInactive: boolean,
        
    ): Promise<
        | User[]
        | ({
              data: User[];
          } & PaginateResponseProperties)
    > {
        const options = typeorm.formatParamsToTypeOrmOptionsWithPaginate(
            queryParams,
            showInactive,
            
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
        
    ): Promise<User> {
        const findUser = await this.findById(userId);

        const updates = { ...findUser, ...userDataUpdates };

        const buildUpdateUser = buildUpdateWithUser(
            updates,
            userRequestData,
            userId,
            
        );

        return this.userRepository.createAndSave(buildUpdateUser);
    }

    public async activation(
        userRequestData: UserRequestInterface,
        userId: string,
        
    ): Promise<UserInterface> {
        await this.findById(userId);

        const buildInactivateUser = buildActivationWithUser(
            userRequestData,
            userId,
            
        ) as UserInterface;

        return this.userRepository.createAndSave(buildInactivateUser);
    }

    public async inactivation(
        userRequestData: UserRequestInterface,
        userId: string,
        
    ): Promise<UserInterface> {
        await this.findById(userId);

        const buildInactivateUser = buildInactivationWithUser(
            userRequestData,
            userId,
            
        ) as UserInterface;

        return this.userRepository.createAndSave(buildInactivateUser);
    }
}
