import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalTenantidInterface } from './metadata/RelationalTenantid';

export interface TableNameInterface extends RelationalTenantidInterface {
    settings: string;
    url: string;
}

export interface TableNameRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    settings?: string;
    url?: string;
}
