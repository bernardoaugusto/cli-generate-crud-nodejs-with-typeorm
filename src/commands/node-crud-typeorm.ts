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

        if (!strings && !numbers) {
            print.error('parameters must be specified, strings / numbers');
            return;
        }

        const properties = {
            strings: strings ? strings.split(',') : [],
            numbers: numbers ? numbers.split(',') : [],
        };

        // properties.strings.forEach(string => console.log(string));

        await template.generate({
            template: 'entities.ts.ejs',
            target: `src/database/entities/${nameCamelCaseUpperFirst}.ts`,
            props: { tableName, nameCamelCaseUpperFirst, properties },
        });

        print.success(`Generated CRUD.`);
    },
};

module.exports = command;
