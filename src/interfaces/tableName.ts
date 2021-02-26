import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalTenantidInterface } from './metadata/RelationalTenantid';

export interface TableNameInterface extends RelationalTenantidInterface {
    settings: string;
    url: string;
    cpf: number;
    oi: number;
}

export interface TableNameRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    settings?: string;
    url?: string;
    cpf?: number;
    oi?: number;
}
