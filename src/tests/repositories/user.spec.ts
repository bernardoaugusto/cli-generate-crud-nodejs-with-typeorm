import { uuid } from 'uuidv4';

import connect from '../../database/connection/connection';
import { UserInterface } from '../../interfaces/user';
import UserRepository from '../../repositories/UserRepository';
import { deleteFileDatabase } from '../deleteFileDatabase';
import UserBuilder from '../testBuilders/UserBuilder';

describe('User Repository context', () => {
    let userRepository: UserRepository;

    const context = `${Date.now()}`;

    beforeAll(async () => {
        await connect(true, context);
        userRepository = new UserRepository();
    });

    afterAll(async () => {
        await deleteFileDatabase(context);
    });

    it('should be able to insert a new user', async () => {
        const userBuild = new UserBuilder()
            .withTenantId(uuid())
            .withNameId('name_id')
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

        const {
            id,
            active,
            created_at,
            updated_at,
            inactivation_date,
            ...entityProps
        } = await userRepository.createAndSave(userBuild as UserInterface);

        expect(entityProps).toEqual(userBuild);
        expect(active).toBe(true);
        expect(id).not.toBeUndefined();
        expect(inactivation_date).not.toBeUndefined();
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });

    it('Should be able to find a user', async () => {
        //const sut = await makeSut();

        //const userFinded = await userRepository.findById(sut.id, sut.tenantid);

        //expect(userFinded).toEqual(sut);
    });
});
