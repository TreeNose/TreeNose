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
const {smellDB} = require('./report_generator')

var SmellDataBase = new smellDB()

async function main(){
    // for await (const target_file of walk('./example_codes/java_codes', '.java')){
    for await (const target_file of walk('../projects/java_projects/gson', '.java')){

        console.log(target_file)
        const src_code = await fs.readFile(target_file, 'utf8')
        checkCodeSmells(src_code, 'java', target_file)

    }
    console.log(SmellDataBase.getSmell('longMessageChain'))
    }

function checkCodeSmells(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'method_definition')
    var lmCaptured = longMethods(code_matches,100)
 
    var code_matches = fetchCode(src_code,lang,'method_definition')
    var lpCaptured = longParameters(code_matches,5,lang)

    var code_matches = fetchCode(src_code,lang,'class_definition')
    var lcCaptured = longClass(code_matches,200,10,lang)

    var code_matches = fetchCode(src_code,lang,'call')
    var lmcCaptured = longMessageChains(code_matches,3, lang)
    
    SmellDataBase.addSmell(curFile, lmCaptured, 'longMethod')
    SmellDataBase.addSmell(curFile, lpCaptured, 'longParameter')
    SmellDataBase.addSmell(curFile, lcCaptured, 'longClass')
    SmellDataBase.addSmell(curFile, lmcCaptured, 'longMessageChain')

    SmellDataBase.generateCSV('./example_codes/csv/')

    return true
}



main()