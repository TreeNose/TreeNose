const { fetchCode } = require('./checks/code_query')
const fs = require('fs/promises');
const args = require('yargs').argv
const parsee_file = args.file
const lang = args.lang
const smell = args.smell

const { longMethods } = require('./checks/smell_long_method')
const {longParameters} = require('./checks/smell_long_param')
const {longClass} = require('./checks/smell_long_class')
const {longMessageChains} = require('./checks/smell_long_message_chains')
const { walk } = require('./code_extractor')

async function main(){
    // for await (const target_file of walk('../projects/js_projects', '.js')){
    for await (const target_file of walk('./example_codes/java_codes', '.java')){

        console.log(target_file)
        const src_code = await fs.readFile(target_file, 'utf8')
        checkCodeSmells(src_code, 'java')
    }
    // src_code = await fs.readFile('./example_codes/python_codes/long_method_chain.py', 'utf8')
    // checkCodeSmells(src_code, 'python')
    }

function checkCodeSmells(src_code, lang){
    // code_matches = fetchCode(src_code,lang,'method_definition')
    // longMethods(code_matches,100)

    // code_matches = fetchCode(src_code,lang,'method_definition')
    // longParameters(code_matches,5,lang)

    // code_matches = fetchCode(src_code,lang,'class_definition')
    // longClass(code_matches,200,10,lang)

    code_matches = fetchCode(src_code,lang,'call')
    longMessageChains(code_matches,3, lang)
}

main()