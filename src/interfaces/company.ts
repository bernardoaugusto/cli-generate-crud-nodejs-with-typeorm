import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';
import { RelationalTenantidInterface } from './metadata/RelationalTenantid';

export interface CompanyInterface extends RelationalTenantidInterface {
    name: string;
    cnpj: string;
    address: string;
    value: number;
}

export interface CompanyRequestGetAllInterface extends typeorm.RequestGetAllInterface {
    name?: string;
    cnpj?: string;
    address?: string;
    value?: number;
}
