import { Repository, getRepository } from 'typeorm';
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
}
