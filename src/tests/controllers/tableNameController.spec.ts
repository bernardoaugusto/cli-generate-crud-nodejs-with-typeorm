import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { uuid } from 'uuidv4';
import { validation } from '@seidor-cloud-produtos/lib-seidor-common';

import app from '../../app';
import TableNameService from '../../services/TableNameService';
import TableNameBuilder from '../testBuilders/TableNameBuilder';

describe('TableName Route context', () => {
    let tableNameServiceSpy: sinon.SinonStubbedInstance<TableNameService>;

    beforeEach(() => {
        sinon.restore();
        tableNameServiceSpy = sinon.createStubInstance(TableNameService);
    });

    it('should be call controller with tableName data and returns status 201', async () => {
        const tenantid = uuid();

        const tableNameBuild = new TableNameBuilder()
            .withTenantId(uuid())
            .withSettings('settings')
            .withUrl('url')
            .build();

        const userAndTenantId = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
            tenantid,
        };

        tableNameServiceSpy.create.resolves(<any>tableNameBuild);
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .post('/api/table-name')
            .send(tableNameBuild)
            .set(userAndTenantId);

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(tableNameBuild.id);
    });
});
