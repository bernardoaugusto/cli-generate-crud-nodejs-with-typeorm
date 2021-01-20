import { inject, injectable } from 'tsyringe';
import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import User from '../database/entities/User';
import { UserRequestInterface } from '../interfaces/metadata/RelationalWithoutTenantid';
import { UserInterface } from '../interfaces/user';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { buildCreateWithUser } from '../utils/builders/dynamicBuilders';
import { HttpError } from '../utils/errors/HttpError';

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
}
