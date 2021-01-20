import { GluegunCommand } from 'gluegun';
import {
    generateCamelCase,
    generateCamelCaseArray,
    generateCamelCaseUpperFirst,
    generateCamelCaseUpperFirstArray,
} from '../utils-cli/common';

const command: GluegunCommand = {
    name: 'node-crud-typeorm',
    description: 'Create CRUD',
    run: async toolbox => {
        const { print, parameters, template } = toolbox;

        const tableName = parameters.first;
        if (!tableName) {
            print.error('Table name must be specified');
            return;
        }
        const nameCamelCase = generateCamelCase(tableName);
        const nameCamelCaseUpperFirst = generateCamelCaseUpperFirst(nameCamelCase);

        const options = parameters.options as Record<string, string>;

        const { strings, numbers } = options;
        const tenantid = options.tenantid !== 'false';

        if (!strings && !numbers) {
            print.error('parameters must be specified, strings / numbers');
            return;
        }

        const props = {
            strings: strings ? strings.split(',') : [],
            numbers: numbers ? numbers.split(',') : [],
        };

        const properties = {
            original: props,
            camelCase: {
                strings: generateCamelCaseArray(props.strings),
                numbers: generateCamelCaseArray(props.numbers),
            },
            camelCaseUpperFirst: {
                strings: generateCamelCaseUpperFirstArray(props.strings),
                numbers: generateCamelCaseUpperFirstArray(props.numbers),
            },
        };

        await template.generate({
            template: 'entities.ts.ejs',
            target: `src/database/entities/${nameCamelCaseUpperFirst}.ts`,
            props: { tableName, nameCamelCaseUpperFirst, properties, tenantid },
        });

        await template.generate({
            template: 'interface.ts.ejs',
            target: `src/interfaces/${nameCamelCase}.ts`,
            props: { tableName, nameCamelCaseUpperFirst, properties, tenantid },
        });

        await template.generate({
            template: 'tests-templates/testBuilder.ts.ejs',
            target: `src/tests/testBuilders/${nameCamelCaseUpperFirst}Builder.ts`,
            props: { nameCamelCase, nameCamelCaseUpperFirst, properties, tenantid },
        });

        await template.generate({
            template: 'repositoryInterface.ts.ejs',
            target: `src/interfaces/repositories/I${nameCamelCaseUpperFirst}.ts`,
            props: { nameCamelCase, nameCamelCaseUpperFirst, properties, tenantid },
        });

        await template.generate({
            template: 'repository.ts.ejs',
            target: `src/repositories/${nameCamelCaseUpperFirst}Repository.ts`,
            props: { nameCamelCase, nameCamelCaseUpperFirst, properties, tenantid },
        });

        await template.generate({
            template: 'tests-templates/repository.ts.ejs',
            target: `src/tests/repositories/${nameCamelCase}.spec.ts`,
            props: { nameCamelCase, nameCamelCaseUpperFirst, properties, tenantid },
        });

        print.success(`Successfully generated CRUD.`);
    },
};

module.exports = command;
