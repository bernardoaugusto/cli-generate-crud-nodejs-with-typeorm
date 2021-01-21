

import User from '../../../database/entities/User';
import { UserInterface } from '../../../interfaces/user';
import UserRepository from '../../../repositories/UserRepository';
import UserBuilder from '../../testBuilders/UserBuilder';

export default async (userData?: Partial<UserInterface>): Promise<User> => {
    const userRepository = new UserRepository();
    const userBuild = new UserBuilder()
        .withMovimentId('moviment_id')
        .withDescription('description')
        .withOi('oi')
        .withCode(123)
        .withTest(123)
        .withMenor(123)
        .withCreatedByName('Create')
        .withCreatedByEmail('test@create.com')
        .withUpdatedByName('Update')
        .withUpdatedByEmail('test@update.com.br')
        .build();

    return userRepository.createAndSave(Object.assign(userBuild, userData));
};
