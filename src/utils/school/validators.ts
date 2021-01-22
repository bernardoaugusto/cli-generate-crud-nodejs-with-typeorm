import * as yup from 'yup';
import { getAllRequestSchema } from '../validation/common';

export const createSchoolSchema = yup.object().shape({
    name: yup.string().strict(true).required('The property name is required'),
    address: yup.string().strict(true).required('The property address is required'),
    director: yup
        .string()
        .strict(true)
        .required('The property director is required'),
    telephone: yup
        .number()
        .strict(true)
        .required('The property telephone is required'),
});

export const updateSchoolSchema = yup.object().shape({
    name: yup.string().strict(true).optional(),
    address: yup.string().strict(true).optional(),
    director: yup.string().strict(true).optional(),
    telephone: yup.number().strict(true).optional(),
});

export const getAllSchoolSchema = yup.object().shape({
    name: yup.string().strict(true),
    address: yup.string().strict(true),
    director: yup.string().strict(true),
    telephone: yup.number().strict(true),
    ...getAllRequestSchema.fields,
});
