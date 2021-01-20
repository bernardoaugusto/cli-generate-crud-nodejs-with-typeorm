import { GluegunCommand } from 'gluegun';
import { camelCase, upperFirst } from 'lodash';

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
        const nameCamelCase = camelCase(tableName);
        const nameCamelCaseUpperFirst = upperFirst(nameCamelCase);

        const options = parameters.options as Record<string, string>;

        const { strings, numbers } = options;
        const tenantid = options.tenantid !== 'false';

        if (!strings && !numbers) {
            print.error('parameters must be specified, strings / numbers');
            return;
        }

        const properties = {
            strings: strings ? strings.split(',') : [],
            numbers: numbers ? numbers.split(',') : [],
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
            template: 'repositoryInterface.ts.ejs',
            target: `src/interfaces/repositories/I${nameCamelCaseUpperFirst}.ts`,
            props: { nameCamelCase, nameCamelCaseUpperFirst, properties, tenantid },
        });

        await template.generate({
            template: 'repository.ts.ejs',
            target: `src/repositories/${nameCamelCaseUpperFirst}.ts`,
            props: { nameCamelCase, nameCamelCaseUpperFirst, properties, tenantid },
        });

        print.success(`Generated CRUD.`);
    },
};

module.exports = command;
