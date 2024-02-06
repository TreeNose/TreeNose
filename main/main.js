const { fetchCode } = require('./checks/code_query')
const fs = require('fs/promises');
const { longMethods } = require('./checks/smell_long_method')
const {longParameters} = require('./checks/smell_long_param')
const {longClass} = require('./checks/smell_long_class')

async function main(){
    codes = await fs.readFile('./example_codes/js_codes/classes.js', { encoding: 'utf8' });
    code_matches = fetchCode(codes,'javascript','class_definition')
    longClass(code_matches,1,1,'javascript')
}

main()