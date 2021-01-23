import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalWithoutTenantidInterface } from './metadata/RelationalWithoutTenantid';

export interface SchoolInterface extends RelationalWithoutTenantidInterface {
    name: string;
    address: string;
    director: string;
    telephone: number;
}

export interface SchoolRequestGetAllInterface
    extends typeorm.RequestGetAllInterface {
    name?: string;
    address?: string;
    director?: string;
    telephone?: number;
}
