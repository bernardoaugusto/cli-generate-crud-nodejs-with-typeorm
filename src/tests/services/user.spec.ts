import { uuid } from 'uuidv4';

import UserService from '../../services/UserService';
import UserBuilder from '../testBuilders/UserBuilder';
import { makeUserService } from './makeInstance/user';

describe('User Movement Service', () => {
    let userService: UserService;

    beforeAll(async () => {
        userService = makeUserService;
    });

    it('should be able to create a new User Movement', async () => {
        const tenantid = uuid();
        const sut = new UserBuilder()
            .withTenantId(uuid())
            .withNameId('name_id')
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
            tenantid,
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
        } = await userService.create(sut, userRequestData, tenantid);

        expect(entityProps).toEqual(expectedRes);
        expect(id).not.toBeUndefined();
        expect(active).toBe(true);
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });
});
