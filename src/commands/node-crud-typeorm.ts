import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
    name: 'node-crud-typeorm',
    description: 'Create CRUD',
    run: async (toolbox) => {
        const { print, parameters } = toolbox

        const name = parameters.first
        if (!name) {
            print.error('Table name must be specified')
            return
        }

        const options = parameters.options as Record<string, string>

        const { strings, numbers } = options

        if (!strings && !numbers) {
            print.error('parameters must be specified, strings / numbers')
            return
        }

        const stringProperties = strings ? strings.split(',') : []
        const numbersProperties = numbers ? numbers.split(',') : []

        console.log(name)
        console.log(stringProperties)
        console.log(numbersProperties)

        print.success(`Generated CRUD.`)
    },
}

module.exports = command
