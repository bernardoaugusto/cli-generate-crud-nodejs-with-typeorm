import { RequestGetAllInterface } from '@seidor-cloud-produtos/lib-seidor-common/dist/packages/typeorm/lib/interfaces';
import { RelationalWithTenantidInterface } from './metadata/RelationalWithoutTenantid';

export interface SchoolInterface extends RelationalWithTenantidInterface {
    name: string;
    address: string;
    director: string;
    telephone: number;
}

export interface SchoolRequestGetAllInterface extends RequestGetAllInterface {
    name?: string;
    address?: string;
    director?: string;
    telephone?: number;
}
