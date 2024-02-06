const { fetchCode } = require('./checks/code_query')
const fs = require('fs/promises');
const args = require('yargs').argv
const parsee_file = args.file
const lang = args.lang
const smell = args.smell

const { longMethods } = require('./checks/smell_long_method')
const {longParameters} = require('./checks/smell_long_param')
const {longClass} = require('./checks/smell_long_class')

async function main(){
    codes = await fs.readFile(parsee_file, { encoding: 'utf8' });
    if (smell == 'long_method'){
        code_matches = fetchCode(codes,lang,'method_definition')
        longMethods(code_matches,1)
    } else if (smell == 'long_parameter'){
        code_matches = fetchCode(codes,lang,'method_definition')
        longParameters(code_matches,1,lang)
    } else if (smell == 'long_class'){
        code_matches = fetchCode(codes,lang,'class_definition')
        longClass(code_matches,1,1,lang)
    }
}

main()