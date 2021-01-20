/* eslint-disable @typescript-eslint/no-unused-vars */
import { uuid } from 'uuidv4';
import {
    GetAllWithoutPagination,
    OptionsTypeOrmGetAll,
} from '@seidor-cloud-produtos/lib-seidor-common/dist/packages/typeorm/lib/interfaces';

import User from '../../../database/entities/User';
import { UserInterface } from '../../../interfaces/user';
import IUser from '../../../interfaces/repositories/IUser';

export default class FakeUserRepository implements IUser {
    private arrayUser: User[] = [];

    public async createAndSave(userData: UserInterface): Promise<User> {
        if (!userData.id) {
            const userCreated = Object.assign(new User(), userData);
            userCreated.id = uuid();
            userCreated.active = true;
            userCreated.created_at = new Date();
            userCreated.updated_at = new Date();
            this.arrayUser.push(userCreated);
            return userCreated;
        }

        const index = this.arrayUser.findIndex(item => item.id === userData.id);

        this.arrayUser[index] = {
            ...userData,
            updated_at: new Date(),
        } as User;

        return this.arrayUser[index];
    }

    public async findById(id: string, tenantid: string): Promise<User | undefined> {
        return this.arrayUser.find(
            user => user.id === id && user.tenantid === tenantid,
        );
    }

    public async getAllWithoutPagination(
        options: OptionsTypeOrmGetAll,
    ): Promise<User[]> {
        return this.arrayUser;
    }

    public async getAllWithPagination(
        options: GetAllWithoutPagination,
    ): Promise<{ data: User[]; count: number }> {
        const { arrayUser } = this;

        return { data: arrayUser, count: arrayUser.length };
    }
}
