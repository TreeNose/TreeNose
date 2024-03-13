const { fetchCode } = require('./detectors/code_query')

const fs = require('fs');
const Parser = require('tree-sitter');
const parser = new Parser();

// CLI arguments
const args = require('yargs').argv
const parsee_path = args.input
const out_path = args.out
const lang = args.lang
// By default, all smells are checked
const smellArgv = require('yargs').array('smells').default('smells',['all']).argv;
const targetSmells = smellArgv.smells
const SupportedSmells = ['long-method', 'long-parameter', 'long-class', 'long-message-chain', 'complex-conditional']

// Smell detectors
const { longMethods } = require('./detectors/smell_long_method')
const {longParameters} = require('./detectors/smell_long_param')
const {longClass} = require('./detectors/smell_long_class')
const {longMessageChains} = require('./detectors/smell_long_message_chains')
const {complexConditional} = require('./detectors/smell_complex_conditional')

const { walk } = require('./code_extractor')
const {smellDB} = require('./report_generator')

var SmellDataBase = new smellDB()

//Get language suffixes
const ExtConfig = JSON.parse(fs.readFileSync('./configs/lang_suffixes.json', 'utf8'));

//Get detection thresholds
const detectConfig = JSON.parse(fs.readFileSync('./configs/detect_config.json', 'utf8'));

//Define detection thresholds
const longClassThreshold_nol = detectConfig.longClass.threshold_nol
const longClassThreshold_noc = detectConfig.longClass.threshold_noc
const longMethodThreshold = detectConfig.longMethod.threshold
const longParameterThreshold = detectConfig.longParameter.threshold
const longMessageChainThreshold = detectConfig.longMessageChain.threshold
const complexConditionalThreshold = detectConfig.complexConditional.threshold

/**
    This is the main function of entire program.
    It takes CLI arguments and runs the code smell detection on input programs.
    And then generates CSV reports of the detected smells with project inf.
 */
async function runCodeSmellDetection(){
    // for await (const target_file of walk('./example_codes/java_codes', '.java')){
    if (parsee_path == undefined || lang == undefined|| out_path == undefined){
        console.log('Please provide an input path, language and output dir to check: . e.g. node main.js --input=./example_codes/java_codes --lang=java --output=./example_codes/csv/ out ./outputs')
        return
    }

    // If the path is a file, then check the file for code smells
    if (fs.statSync(parsee_path).isFile()){
        console.log(parsee_path)
        const src_code = fs.readFileSync(parsee_path, 'utf8')
        checkCodeSmells(src_code, lang, parsee_path)
        SmellDataBase.fileCount = 1
    } else{
        // If the path is a directory, then walk through the directory and its subdirectories to find matching files
        for await (const target_file of walk(parsee_path, ExtConfig[lang])){
            console.log(target_file)
            const src_code = fs.readFileSync(target_file, 'utf8')
            SmellDataBase.fileCount += 1

            // Set up tree sitter parser and get rootNode
            const targetLang = require(`tree-sitter-${lang}`);
            parser.setLanguage(targetLang);
            const tree = parser.parse(src_code);
            const root = tree.rootNode

            // Count the number of lines in the program
            const fileloc = root.endPosition.row - root.startPosition.row + 1
            SmellDataBase.loc += fileloc

            checkCodeSmells(src_code, lang, target_file)
        }
    }
    SmellDataBase.generateCSV(out_path)
}

/**
 * Call the respective smell detectors based on the CLI arguments
 * @param {*} src_code: a rootNode gereted by tree-sitter
 * @param {string} lang: language of the source code
 * @param {string} curFile: the file path of the source code
 * @returns 
 */
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
                // If the given smell isn't in supported smell lists, throw an error
                throw new Error('Invalid smell provided')
            }
        }
    }
    return true
}

/**
 * check for long methods in the source code
 * @param {*} src_code: a rootNode gereted by tree-sitter
 * @param {string} lang: language of the source code
 * @param {string} curFile: the file path of the source code
 */
function detectLongMethod(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'method_definition')
    var lmCaptured = longMethods(code_matches,longMethodThreshold,lang)
    SmellDataBase.addSmell(curFile, lmCaptured, 'longMethod')
}

/**
 * check for long parameters in the source code
 * @param {*} src_code: a rootNode gereted by tree-sitter
 * @param {string} lang: language of the source code
 * @param {string} curFile: the file path of the source code
 */
function detectLongParameter(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'method_definition')
    var lpCaptured = longParameters(code_matches,longParameterThreshold,lang)
    SmellDataBase.addSmell(curFile, lpCaptured, 'longParameter')
}

/**
 * check for long classes in the source code
 * @param {*} src_code: a rootNode gereted by tree-sitter
 * @param {string} lang: language of the source code
 * @param {string} curFile: the file path of the source code
 */
function detectLongClass(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'class_definition')
    var lcCaptured = longClass(code_matches,longClassThreshold_nol,longClassThreshold_noc,lang)
    SmellDataBase.addSmell(curFile, lcCaptured, 'longClass')

}

/**
 * check for long message chains in the source code
 * @param {*} src_code: a rootNode gereted by tree-sitter
 * @param {string} lang: language of the source code
 * @param {string} curFile: the file path of the source code
 */
function detectLongMessageChains(src_code, lang, curFile){
    var code_matches = fetchCode(src_code,lang,'check_call_chains')
    var lmcCaptured = longMessageChains(code_matches,longMessageChainThreshold, lang)
    SmellDataBase.addSmell(curFile, lmcCaptured, 'longMessageChain')
}


/**
 * check for complex conditionals in the source code
 * @param {*} src_code: a rootNode gereted by tree-sitter
 * @param {string} lang: language of the source code
 * @param {string} curFile: the file path of the source code
 */
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