import { uuid } from 'uuidv4';

import User from '../../database/entities/User';
import UserService from '../../services/UserService';
import UserBuilder from '../testBuilders/UserBuilder';
import { makeUserService } from './makeInstance/user';
import { UserInterface } from '../../interfaces/user';

describe('User Service', () => {
    let userService: UserService;

    beforeAll(async () => {
        userService = makeUserService;
    });

    const makeSut = (userData?: Partial<UserInterface>): Promise<User> => {
        const user = new UserBuilder()
            .withTenantId(uuid())
            .withMovimentId('moviment_id')
            .withDescription('description')
            .withOi('oi')
            .withCode(123)
            .withTest(123)
            .withMenor(123)
            .build();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        return userService.create(
            Object.assign(user, userData),
            userRequestData,
            user.tenantid!,
        );
    };

    it('should be able to create a new User', async () => {
        const sut = new UserBuilder()
            .withTenantId(uuid())
            .withMovimentId('moviment_id')
            .withDescription('description')
            .withOi('oi')
            .withCode(123)
            .withTest(123)
            .withMenor(123)
            .build();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        const expectedRes = {
            ...sut,
            tenantid: sut.tenantid,
            created_by_name: userRequestData.username,
            created_by_email: userRequestData.useremail,
            updated_by_name: userRequestData.username,
            updated_by_email: userRequestData.useremail,
        };

        const {
            id,
            created_at,
            updated_at,
            active,
            ...entityProps
        } = await userService.create(sut, userRequestData, sut.tenantid!);

        expect(entityProps).toEqual(expectedRes);
        expect(id).not.toBeUndefined();
        expect(active).toBe(true);
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });

    it('Should be able to find a User by id', async () => {
        const sut = await makeSut();

        const userFinded = await userService.findById(sut.id!, sut.tenantid,);

        expect(userFinded).toEqual(sut);
    });

    it('Shoud return a User list without paginated', async () => {
        const sut = await makeSut();

        const res = (await userService.getAll(
            {},
            false,
            false,
            sut.tenantid,
        )) as User[];

        expect(res.findIndex(user => user.id === sut.id)).toBeGreaterThanOrEqual(0);
    });

    it('Shoud return a User List with paged', async () => {
        const sut = await makeSut();
        const { data } = (await userService.getAll(
            {},
            true,
            false,
            sut.tenantid,
        )) as {
            data: User[];
            count: number;
        };

        expect(data.findIndex(user => user.id === sut.id)).toBeGreaterThanOrEqual(0);
    });

    it('Shoud return a update User', async () => {
        const sut = await makeSut();

        const updates: UserInterface = {
            active: false,
            moviment_id: 'update moviment_id',
            description: 'update description',
            oi: 'update oi',
            code: 999,
            test: 999,
            menor: 999,
        };

        const userRequestData = {
            username: 'Teste update',
            useremail: 'update@teste.com.br',
        };

        const expectedRes: UserInterface = {
            ...updates,
            id: sut.id,
            tenantid: sut.tenantid,
            created_at: sut.created_at,
            created_by_name: sut.created_by_name,
            created_by_email: sut.created_by_email,
            updated_by_name: userRequestData.username,
            updated_by_email: userRequestData.useremail,
        };

        const { updated_at, ...entityProps } = await userService.update(
            sut.id,
            updates,
            userRequestData,
            sut.tenantid,
        );

        expect(entityProps).toEqual(expectedRes);
        expect(updated_at).not.toBeUndefined();
    });

    it('should update a User to active', async () => {
        const sut = await makeSut();

        let userRequestData = {
            username: 'Teste update',
            useremail: 'update@teste.com.br',
        };

        await userService.update(
            sut.id,
            <any>{ active: false, inactivation_date: new Date() },
            userRequestData,
            sut.tenantid,
        );

        userRequestData = {
            username: 'Teste activation',
            useremail: 'activation@teste.com.br',
        };

        const expectedRes = {
            active: true,
            id: sut.id,
            inactivation_date: null,
            tenantid: sut.tenantid,
            updated_by_name: 'Teste activation',
            updated_by_email: 'activation@teste.com.br',
        };

        const { updated_at, ...entityProps } = await userService.activation(
            userRequestData,
            sut.id,
            sut.tenantid,
        );

        expect(entityProps).toEqual(expectedRes);
        expect(updated_at).not.toBeUndefined();
    });

    it('should update a User to inactivation', async () => {
        const sut = await makeSut();

        const userRequestData = {
            username: 'Teste inactivation',
            useremail: 'inactivation@teste.com.br',
        };

        const expectedRes = {
            active: false,
            id: sut.id,
            tenantid: sut.tenantid,
            updated_by_name: 'Teste inactivation',
            updated_by_email: 'inactivation@teste.com.br',
        };

        const {
            updated_at,
            inactivation_date,
            ...entityProps
        } = await userService.inactivation(userRequestData, sut.id, sut.tenantid);

        expect(entityProps).toEqual(expectedRes);
        expect(updated_at).not.toBeUndefined();
        expect(inactivation_date).not.toBeUndefined();
    });
});
