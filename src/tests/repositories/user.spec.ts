import { uuid } from 'uuidv4';

import connect from '../../database/connection/connection';
import { UserInterface } from '../../interfaces/user';
import UserRepository from '../../repositories/UserRepository';
import { deleteFileDatabase } from '../deleteFileDatabase';
import UserBuilder from '../testBuilders/UserBuilder';
import makeSut from './makeSuts/user';

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

    it('should be able to insert a new User', async () => {
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

    it('Should be able to find a User', async () => {
        const sut = await makeSut();

        const userFinded = await userRepository.findById(sut.id, sut.tenantid);

        expect(userFinded).toEqual(sut);
    });

    it('Should be able to update a User', async () => {
        const sut = await makeSut();

        const updates: UserInterface = {
            ...sut,
            active: false,
            name_id: 'update name_id',
            description: 'update description',
            oi: 'update oi',
            code: 999,
            test: 999,
            menor: 999,
        };

        const cashierUpdated = await userRepository.createAndSave(updates);

        expect(cashierUpdated.id).toBe(sut.id);
        expect(cashierUpdated.active).toBe(false);
        expect(cashierUpdated.name_id).toBe('update name_id');
        expect(cashierUpdated.description).toBe('update description');
        expect(cashierUpdated.oi).toBe('update oi');
        expect(cashierUpdated.code).toBe(999);
        expect(cashierUpdated.test).toBe(999);
        expect(cashierUpdated.menor).toBe(999);
    });
});
