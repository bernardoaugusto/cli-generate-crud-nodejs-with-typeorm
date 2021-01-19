import { RelationalWithoutTenantidInterface } from './RelationalWithoutTenantid';

export interface RelationalTenantidInterface
    extends RelationalWithoutTenantidInterface {
    tenantid?: string;
}
