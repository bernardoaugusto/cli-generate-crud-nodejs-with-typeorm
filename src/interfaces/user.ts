import { RelationalWithTenantidInterface } from './metadata/RelationalWithoutTenantid';

export interface UserInterface extends RelationalWithTenantidInterface {
    name: string;
    description: string;
    code: number;
}
