import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup
        .string()
        .strict(true)
        .required('The property username is required'),
    useremail: yup
        .string()
        .email()
        .strict(true)
        .required('The property useremail is required'),
});

export const tenantidSchema = yup.object().shape({
    tenantid: yup
        .string()
        .uuid()
        .strict(true)
        .required('The property tenantid is required'),
    ...userSchema.fields,
});

export const idParamSchema = yup.object().shape({
    id: yup.string().uuid().strict(true).required('The property id is required'),
});

export const getAllRequestSchema = yup.object().shape({
    withPagination: yup
        .string()
        .strict(true)
        .matches(/(true|false)/, {
            excludeEmptyString: true,
            message: 'Only available true and false values.',
        }),
    page: yup.string().strict(true),
    size: yup.string().strict(true),
    sortParam: yup.string().strict(true),
    sortOrder: yup
        .string()
        .strict(true)
        .matches(/(desc|DESC|asc|ASC)/, {
            excludeEmptyString: true,
            message: 'Only available DESC and ASC values.',
        }),
    showInactive: yup.string().strict(true),
    created_by_name: yup.string().strict(true),
    created_by_email: yup.string().strict(true),
    updated_by_name: yup.string().strict(true),
    updated_by_email: yup.string().strict(true),
    created_at: yup.string().strict(true),
    dateFilter: yup.string().strict(true),
    startDateFilter: yup.string().strict(true),
    endDateFilter: yup.string().strict(true),
});
