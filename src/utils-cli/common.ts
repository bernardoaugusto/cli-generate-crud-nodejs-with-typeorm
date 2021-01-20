import { camelCase, upperFirst } from 'lodash';

export const generateCamelCase = (name: string): string => {
    return camelCase(name);
};

export const generateCamelCaseUpperFirst = (name: string): string => {
    return upperFirst(camelCase(name));
};

export const generateCamelCaseArray = (array: string[]): string[] =>
    array.map(property => generateCamelCase(property));

export const generateCamelCaseUpperFirstArray = (array: string[]): string[] =>
    array.map(property => generateCamelCaseUpperFirst(property));
