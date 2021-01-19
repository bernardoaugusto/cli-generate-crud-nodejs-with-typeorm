import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
    name: 'node-crud-typeorm',
    description: 'Create CRUD',
    run: async toolbox => {
        const { print, parameters, template } = toolbox;

        const name = parameters.first;
        if (!name) {
            print.error('Table name must be specified');
            return;
        }

        const options = parameters.options as Record<string, string>;

        const { strings, numbers } = options;

        if (!strings && !numbers) {
            print.error('parameters must be specified, strings / numbers');
            return;
        }

        const stringProperties = strings ? strings.split(',') : [];
        const numbersProperties = numbers ? numbers.split(',') : [];

        console.log(name);
        console.log(stringProperties);
        console.log(numbersProperties);

        await template.generate({
            template: 'entities.ts.ejs',
            target: `src/database/entities/${name}.ts`,
            props: { name },
        });

        print.success(`Generated CRUD.`);
    },
};

module.exports = command;
