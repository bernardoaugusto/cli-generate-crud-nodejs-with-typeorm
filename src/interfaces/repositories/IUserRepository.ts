import { OptionsTypeOrmGetAll, GetAllWithoutPagination, } from '@seidor-cloud-produtos/lib-seidor-common/dist/packages/typeorm/lib/interfaces';

import User from '../../database/entities/User';
import { UserInterface } from '../user';

export default interface IUserRepository {
    createAndSave(
        userData: UserInterface,
    ): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    getAllWithPagination(
        options: OptionsTypeOrmGetAll,
    ): Promise<{ data: User[]; count: number }>;
    getAllWithoutPagination(options: GetAllWithoutPagination): Promise<User[]>;
}

