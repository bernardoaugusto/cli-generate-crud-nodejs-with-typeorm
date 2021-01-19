import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
    name: 'node-crud-typeorm',
    run: async toolbox => {
        const { print, parameters } = toolbox
        const { options } = parameters

        const strings = options.strings as string

        console.log(parameters)

        print.info('Welcome to your CLI')
    }
}

module.exports = command
