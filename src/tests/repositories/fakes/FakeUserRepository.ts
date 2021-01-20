import { uuid } from 'uuidv4';

import User from '../../../database/entities/User';
import { UserInterface } from '../../../interfaces/user';
import IUser from '../../../interfaces/repositories/IUser';

export default class FakeUserRepository implements IUser {
    private fiscalDatasMovements: User[] = [];

    public async createAndSave(userData: UserInterface): Promise<User> {
        if (!userData.id) {
            const userCreated = Object.assign(new User(), userData);
            userCreated.id = uuid();
            userCreated.created_at = new Date();
            this.fiscalDatasMovements.push(userCreated);
            return userCreated;
        }

        const index = this.fiscalDatasMovements.findIndex(
            item => item.id === userData.id,
        );

        this.fiscalDatasMovements[index] = userData as User;

        return this.fiscalDatasMovements[index];
    }
}
