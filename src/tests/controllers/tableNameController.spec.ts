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

    it('should be call controller with TableName data and returns status 201', async () => {
        const tableNameBuild = new TableNameBuilder()
            .withSettings('settings')
            .withUrl('url')
            .withCpf(123)
            .build();

        const userAndTenantId = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
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

    it('should return 400 status when not sending params when creating the tableName ', async () => {
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app).post('/api/table-name');

        expect(response.status).toBe(400);
        expect(
            validation.validationErrors.isParamsInValidationErrors(
                ['settings', 'url', 'cpf', 'username', 'useremail'],
                response.body.errors,
            ),
        ).toBeTruthy();
        expect(tableNameServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be return status 400 when send invalid params when creating the tableName', async () => {
        const tableNameData = new TableNameBuilder().build();

        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .post('/api/table-name')
            .send(tableNameData);

        expect(response.status).toBe(400);
        expect(
            validation.validationErrors.isParamsInValidationErrors(
                ['settings', 'url', 'cpf', 'username', 'useremail'],
                response.body.errors,
            ),
        ).toBeTruthy();
        expect(tableNameServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be able to call controller findById with id and tenantid returns status 200', async () => {
        const tableNameId = uuid();

        const userAndTenantId = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        tableNameServiceSpy.findById.resolves(<any>'tableNameData');
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .get(`/api/table-name/${tableNameId}`)
            .set(userAndTenantId);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual('tableNameData');
        expect(
            tableNameServiceSpy.findById.calledWithExactly(tableNameId),
        ).toBeTruthy();
    });

    it('should be able to  call controller findOne return status 400 when not send params', async () => {
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app).get('/api/table-name/123');

        expect(response.status).toBe(400);
        expect(
            validation.validationErrors.isParamsInValidationErrors(
                ['id', 'username', 'useremail'],
                response.body.errors,
            ),
        ).toBeTruthy();

        expect(tableNameServiceSpy.create.notCalled).toBeTruthy();
    });
});
