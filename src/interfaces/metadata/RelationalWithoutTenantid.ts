export interface RelationalWithoutTenantidInterface
    extends CreatedByAndUpdatedByInterface,
        ActivateDataInterface {
    id?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface RelationalWithTenantidInterface
    extends RelationalWithoutTenantidInterface {
    tenantid?: string;
}

export type CreatedByAndUpdatedByInterface = CreatedByInterface & UpdatedByInterface;
export interface CreatedByInterface {
    created_by_name?: string;
    created_by_email?: string;
}

export interface UpdatedByInterface {
    updated_by_name?: string;
    updated_by_email?: string;
}

export interface ActivateDataInterface {
    active?: boolean;
    inactivation_date?: Date;
}
export interface UserRequestInterface {
    username: string;
    useremail: string;
}

export interface UserRequestInterfaceWithTenantId extends UserRequestInterface {
    tenantid: string;
}
