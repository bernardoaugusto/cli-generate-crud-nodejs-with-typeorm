import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalWithoutTenantidInterface } from './metadata/RelationalWithoutTenantid';

export interface TableNameInterface extends RelationalWithoutTenantidInterface {
    settings: string;
    url: string;
    cpf: number;
}

export interface TableNameRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    settings?: string;
    url?: string;
    cpf?: number;
}
