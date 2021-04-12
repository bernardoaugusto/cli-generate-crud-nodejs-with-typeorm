import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalTenantidInterface } from './metadata/RelationalTenantid';

export interface TableNameInterface extends RelationalTenantidInterface {
    name: string;
    cpf: string;
    test_number: number;
    code: number;
}

export interface TableNameRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    name?: string;
    cpf?: string;
    test_number?: number;
    code?: number;
}
