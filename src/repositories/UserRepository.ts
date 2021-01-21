import { Repository, getRepository } from 'typeorm';
import {
    OptionsTypeOrmGetAll,
    GetAllWithoutPagination,
} from '@seidor-cloud-produtos/lib-seidor-common/dist/packages/typeorm/lib/interfaces';

import User from '../database/entities/User';
import { UserInterface } from '../interfaces/user';
import IUser from '../interfaces/repositories/IUser';

export default class UserRepository implements IUser {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async createAndSave(
        userData: UserInterface,
    ): Promise<User> {
        const user = this.ormRepository.create(userData);

        return this.ormRepository.save(user);
    }

    public async findById(
        id: string): Promise<User | undefined> {
        return this.ormRepository.findOne({ where: { id } });
    }

    public async getAllWithPagination(
        options: OptionsTypeOrmGetAll,
    ): Promise<{ data: User[]; count: number }> {
        const [data, count] = await this.ormRepository.findAndCount(options);

        return { data, count };
    }

    public async getAllWithoutPagination(
        options: GetAllWithoutPagination,
    ): Promise<User[]> {
        return this.ormRepository.find(options);
    }
}
