const { fetchCode } = require('./detectors/code_query')
const fs_promise = require('fs/promises');
const fs = require('fs');
const args = require('yargs').argv
const parsee_path = args.input
const out_path = args.out
const lang = args.lang
const smellArgv = require('yargs').array('smells').default('smells',['all']).argv;
const targetSmells = smellArgv.smells
const SupportedSmells = ['long-method', 'long-parameter', 'long-class', 'long-message-chain', 'complex-conditional']

const { longMethods } = require('./detectors/smell_long_method')
const {longParameters} = require('./detectors/smell_long_param')
const {longClass} = require('./detectors/smell_long_class')
const {longMessageChains} = require('./detectors/smell_long_message_chains')
const {complexConditional} = require('./detectors/smell_complex_conditional')

const { walk } = require('./code_extractor')
const {smellDB} = require('./report_generator')

var SmellDataBase = new smellDB()

const ExtConfig = JSON.parse(fs.readFileSync('./configs/lang_suffixes.json', 'utf8'));

const detectConfig = JSON.parse(fs.readFileSync('./configs/detect_config.json', 'utf8'));

const longClassThreshold_nol = detectConfig.longClass.threshold_nol
const longClassThreshold_noc = detectConfig.longClass.threshold_noc
const longMethodThreshold = detectConfig.longMethod.threshold
const longParameterThreshold = detectConfig.longParameter.threshold
const longMessageChainThreshold = detectConfig.longMessageChain.threshold
const complexConditionalThreshold = detectConfig.complexConditional.threshold

async function runCodeSmellDetection(){
    // for await (const target_file of walk('./example_codes/java_codes', '.java')){
    if (parsee_path == undefined || lang == undefined|| out_path == undefined){
        console.log('Please provide a path, language and output dir to check for. e.g. node main.js --path=./example_codes/java_codes --lang=java --dest=./example_codes/csv/')
        return
    }

    // If the path is a file
    if (fs.statSync(parsee_path).isFile()){
        console.log(parsee_path)
        const src_code = fs.readFileSync(parsee_path, 'utf8')
        checkCodeSmells(src_code, lang, parsee_path)
        return
    }
    
    // If the path is a directory, then walk through the directory and its subdirectories
    for await (const target_file of walk(parsee_path, ExtConfig[lang])){
        console.log(target_file)
        const src_code = fs.readFileSync(target_file, 'utf8')
        checkCodeSmells(src_code, lang, target_file)
    }
}


function checkCodeSmells(src_code, lang, curFile){

    if (targetSmells.includes('all')){
        detectLongMethod(src_code, lang, curFile)
        detectLongParameter(src_code, lang, curFile)
        detectLongClass(src_code, lang, curFile)
        detectLongMessageChains(src_code, lang, curFile)
        detectComplexConditional(src_code, lang, curFile)
    } else {
        for (let smell of targetSmells){
            if (SupportedSmells.includes(smell)){
                if (smell == 'long-method'){
                    detectLongMethod(src_code, lang, curFile)
                } else if (smell == 'long-parameter'){
                    detectLongParameter(src_code, lang, curFile)
                } else if (smell == 'long-class'){
                    detectLongClass(src_code, lang, curFile)
                } else if (smell == 'long-message-chain'){
                    detectLongMessageChains(src_code, lang, curFile)
                } else if (smell == 'complex-conditional'){
                    detectComplexConditional(src_code, lang, curFile)
                }
            }else{
                throw new Error('Invalid smell provided')
            }
        }
    }

    SmellDataBase.generateCSV(out_path)

    return true
}

function detectLongMethod(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'method_definition')
    var lmCaptured = longMethods(code_matches,longMethodThreshold,lang)
    SmellDataBase.addSmell(curFile, lmCaptured, 'longMethod')
}

function detectLongParameter(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'method_definition')
    var lpCaptured = longParameters(code_matches,longParameterThreshold,lang)
    SmellDataBase.addSmell(curFile, lpCaptured, 'longParameter')
}

function detectLongClass(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'class_definition')
    var lcCaptured = longClass(code_matches,longClassThreshold_nol,longClassThreshold_noc,lang)
    SmellDataBase.addSmell(curFile, lcCaptured, 'longClass')

}

function detectLongMessageChains(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'call')
    var lmcCaptured = longMessageChains(code_matches,longMessageChainThreshold, lang)
    SmellDataBase.addSmell(curFile, lmcCaptured, 'longMessageChain')
}

function detectComplexConditional(src_code, lang, curFile){
    var ifStatements = fetchCode(src_code,lang,'if_statement')
    var switchStatements = fetchCode(src_code,lang,'switch_statement')
    var ccCaptured = complexConditional(ifStatements, switchStatements, complexConditionalThreshold, lang)
    SmellDataBase.addSmell(curFile, ccCaptured, 'complexConditional')
}

async function main(){

    await runCodeSmellDetection()

    }

main()