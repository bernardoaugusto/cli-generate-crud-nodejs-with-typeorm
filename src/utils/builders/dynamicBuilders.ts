/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ActivateDataInterface,
    CreatedByAndUpdatedByInterface,
    UpdatedByInterface,
    UserRequestInterface,
} from '../../interfaces/metadata/RelationalWithoutTenantid';

export const buildCreateWithUser = <T>(
    data: T,
    userData: UserRequestInterface,
    tenantid?: string,
):
    | (T & CreatedByAndUpdatedByInterface)
    | (T & CreatedByAndUpdatedByInterface & { tenantid: string }) => {
    const build = {
        ...data,
        created_by_name: userData.username,
        created_by_email: userData.useremail,
        updated_by_name: userData.username,
        updated_by_email: userData.useremail,
    };

    if (tenantid) return { ...build, tenantid };
    return build;
};

export const buildUpdateWithUser = <T>(
    data: T,
    userData: UserRequestInterface,
    id: string,
    tenantid?: string,
):
    | (T & UpdatedByInterface & { id: string })
    | (T & UpdatedByInterface & { id: string; tenantid: string }) => {
    const build = {
        ...data,
        id,
        updated_by_name: userData.username,
        updated_by_email: userData.useremail,
    };

    if (tenantid) return { ...build, tenantid };

    return build;
};

export const buildInactivationWithUser = (
    userData: UserRequestInterface,
    id: string,
    tenantid?: string,
):
    | (UpdatedByInterface &
          ActivateDataInterface & {
              id: string;
          })
    | (UpdatedByInterface &
          ActivateDataInterface & {
              id: string;
              tenantid: string;
          }) => {
    const build = {
        id,
        updated_by_name: userData.username,
        updated_by_email: userData.useremail,
        active: false,
        inactivation_date: new Date(),
    };

    if (tenantid) return { ...build, tenantid };
    return build;
};

export const buildActivationWithUser = (
    userData: UserRequestInterface,
    id: string,
    tenantid?: string,
):
    | (UpdatedByInterface &
          ActivateDataInterface & {
              id: string;
          })
    | (UpdatedByInterface &
          ActivateDataInterface & {
              id: string;
              tenantid: string;
          }) => {
    const build = {
        id,
        updated_by_name: userData.username,
        updated_by_email: userData.useremail,
        active: true,
        inactivation_date: <any>null,
    };

    if (tenantid) return { ...build, tenantid };
    return build;
};
