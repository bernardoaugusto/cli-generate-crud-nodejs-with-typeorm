import { RequestGetAllInterface } from '@seidor-cloud-produtos/lib-seidor-common/dist/packages/typeorm/lib/interfaces';
import { RelationalWithoutTenantidInterface } from './metadata/RelationalWithoutTenantid';

export interface UserInterface extends RelationalWithoutTenantidInterface {
    moviment_id: string;
    description: string;
    oi: string;
    code: number;
    test: number;
    menor: number;
}

export interface UserRequestGetAllInterface extends RequestGetAllInterface {
    moviment_id?: string;
    description?: string;
    oi?: string;
    code?: number;
    test?: number;
    menor?: number;
}
