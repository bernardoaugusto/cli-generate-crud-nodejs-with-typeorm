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

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        tableNameServiceSpy.create.resolves(<any>tableNameBuild);
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .post('/api/table-name')
            .send(tableNameBuild)
            .set({ ...userRequestData });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(tableNameBuild.id);
        expect(
            tableNameServiceSpy.create.calledWithExactly(
                tableNameBuild,
                userRequestData,
            ),
        ).toBeTruthy();
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

    it('should be able to call controller findById with id returns status 200', async () => {
        const tableNameId = uuid();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        tableNameServiceSpy.findById.resolves(<any>'tableNameData');
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .get(`/api/table-name/${tableNameId}`)
            .set(userRequestData);

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

        expect(tableNameServiceSpy.findById.notCalled).toBeTruthy();
    });

    it('should be able to call controller getAll returns status 200', async () => {
        const queryParams = { withPagination: 'true', showInactive: 'false' };

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        tableNameServiceSpy.getAll.resolves(<any>'tableNameData');
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .get('/api/table-name/')
            .set(userRequestData);

        expect(response.status).toBe(200);

        expect(response.body).toStrictEqual('tableNameData');
        expect(tableNameServiceSpy.getAll.calledOnceWith(queryParams, true, false));
    });

    it('should be able to call controller getAll return 400 when not send params', async () => {
        tableNameServiceSpy.getAll.resolves(<any>'tableNameData');
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app).get('/api/table-name/');

        expect(response.status).toBe(400);

        expect(
            validation.validationErrors.isParamsInValidationErrors(
                ['username', 'useremail'],
                response.body.errors,
            ),
        ).toBeTruthy();

        expect(tableNameServiceSpy.getAll.notCalled).toBeTruthy();
    });

    it('should be able to call controller update with tableName id and tenantid and return 200', async () => {
        const tableNameId = uuid();

        const tableName = new TableNameBuilder()
            .withSettings('update settings')
            .withUrl('update url')
            .withCpf(456)
            .build();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        tableNameServiceSpy.update.resolves(<any>tableName);
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .put(`/api/table-name/${tableNameId}`)
            .send(tableName)
            .set({ ...userRequestData });

        expect(response.status).toBe(200);

        expect(response.body.id).toBe(tableName.id);
    });

    it('should be able to call controller update return 400 when send invalid params', async () => {
        const tableNameId = uuid();

        const tableName = new TableNameBuilder()
            .withSettings(<any>123)
            .withUrl(<any>123)
            .withCpf(<any>'invalid cpf')
            .build();

        tableNameServiceSpy.update.resolves(<any>tableName);
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .put(`/api/table-name/${tableNameId}`)
            .send(tableName);

        expect(response.status).toBe(400);

        expect(
            validation.validationErrors.isParamsInValidationErrors(
                ['settings', 'url', 'cpf', 'username', 'useremail'],
                response.body.errors,
            ),
        ).toBeTruthy();

        expect(tableNameServiceSpy.update.notCalled).toBeTruthy();
    });

    it('should be able to call controller inactive with tableName id and tenantid and return 204', async () => {
        const tableNameId = uuid();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        tableNameServiceSpy.inactivation.resolves();
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app)
            .post(`/api/table-name/inactivation/${tableNameId}`)
            .set({ ...userRequestData });

        expect(response.status).toBe(204);
        expect(response.body).toStrictEqual({});

        expect(
            tableNameServiceSpy.inactivation.calledWithExactly(
                userRequestData,
                tableNameId,
            ),
        ).toBeTruthy();
    });

    it('should be able to call controller remove return 400 when not send params', async () => {
        const tableNameId = uuid();

        tableNameServiceSpy.inactivation.resolves();
        sinon.stub(container, 'resolve').returns(tableNameServiceSpy);

        const response = await request(app).post(
            `/api/table-name/inactivation/${tableNameId}`,
        );

        expect(response.status).toBe(400);
        expect(
            validation.validationErrors.isParamsInValidationErrors(
                ['username', 'useremail'],
                response.body.errors,
            ),
        ).toBeTruthy();
        expect(tableNameServiceSpy.inactivation.notCalled).toBeTruthy();
    });
});
