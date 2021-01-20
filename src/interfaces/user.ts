import { RelationalWithTenantidInterface } from './metadata/RelationalWithoutTenantid';

export interface UserInterface extends RelationalWithTenantidInterface {
    name: string;
    description: string;
    oi: string;
    code: number;
    test: number;
    menor: number;
}
