// Description: This file contains the class smellDB, which is used to store the smells and generate the CSV report
class smellDB {
    constructor() {
        this.longClass = []
        this.longMethod = []
        this.longParameter = []
        this.longMessageChain = []
        this.complexConditional = []

        this.longClassTitle = ['Line', 'Smell', 'Number of Lines', 'Threshold_nol', 'Number of Children', 'Threshold_noc', 'File']
        this.longMethodTitle = ['Line', 'Smell', 'Number of Lines', 'Threshold', 'File']
        this.longParameterTitle = ['Line', 'Smell', 'Number of Parameters', 'Threshold', 'File']
        this.longMessageChainTitle = ['Line', 'Smell', 'Threshold', 'File']
        this.complexConditionalTitle = ['Line', 'Smell', 'Cause', 'Number of Conditions', 'Threshold', 'File']
        this.packageInfTitle = ['Number of Files', 'Number of Lines']

        this.offset = 1
        this.fileCount = 0
        this.loc = 0
    }

    /** 
     * Add smell to the database, if the smell is empty, return false
     * @param {Array} smells an double array of smells
     * @param {String} type the type of smell
     * @returns {Boolean} true if the smell is added, false if the smell is empty
     **/
    addSmell(fileName, smells, type) {

        if (smells.length <= 0) {
            return false;
        }

        // Add the filename to the last column of each row
        smells = this.addFileName(fileName, smells)

        console.log('-------------------')
        console.log(type)
        console.log(smells)

        // The length of smell report and title length mismatch, the data is not valid
        if (smells[0].length != this[type + 'Title'].length) {
            // console.log(smells[0])
            // console.log(this[type + 'Title'])
            throw new Error('Smell and Title length mismatch');
        }
        smells = this.addOffset(smells)
        this[type].push(...smells);
        return true;
    }

    /**
     * Add the offset to the line number column, the first column of each row
     * @param {Array} matrix: the smell database
     * @returns {Array} the smell database with the offset added
     */
    addOffset(matrix) {
        return matrix.map(row => {
            row[0] = row[0] + this.offset
            return row
        })
    }

    /**
     * Get single type of smell database with the titles
     * @param {String} type: the type of smell
     * @returns {Array} the smell database with the titles
     */
    getSmell(type) {
        return [this[type + 'Title']].concat(this[type]);
    }

    /**
     * Add the filename to the last column of each row
     * @param {String} fileName 
     * @param {Array} smells 
     * @returns {Array} the smell database with the filename added
     */
    addFileName(fileName, smells) {

        var smellsWithFile = smells.map(row => {
            row.push(fileName)
            return row
        })

        return smellsWithFile
    }

    /** 
     * Generate the CSV report with all the smell databases
     * @param {String} desDir the destination directory
     * @returns {Boolean} true if the CSV is generated
    */
    generateCSV(desDir) {
        const fs = require('fs');
        const path = require('path');
        const csvExt = '.csv'

        // Get the smell databases
        const lc = this.getSmell('longClass')
        const lm = this.getSmell('longMethod')
        const lp = this.getSmell('longParameter')
        const lmc = this.getSmell('longMessageChain')
        const cc = this.getSmell('complexConditional')

        // Generate the CSV from double array
        const csv_lc = this.arrayToCSV(lc)
        const csv_lm = this.arrayToCSV(lm)
        const csv_lp = this.arrayToCSV(lp)
        const csv_lmc = this.arrayToCSV(lmc)
        const csv_cc = this.arrayToCSV(cc)
        const csv_package = this.arrayToCSV([this.packageInfTitle, [this.fileCount, this.loc]])

        // Write the CSV to the destination directory
        fs.writeFileSync(path.join(desDir, 'longClass') + csvExt, csv_lc, 'utf-8');
        fs.writeFileSync(path.join(desDir, 'longMethod') + csvExt, csv_lm, 'utf-8');
        fs.writeFileSync(path.join(desDir, 'longParameter') + csvExt, csv_lp, 'utf-8');
        fs.writeFileSync(path.join(desDir, 'longMessageChain') + csvExt, csv_lmc, 'utf-8');
        fs.writeFileSync(path.join(desDir, 'complexConditional') + csvExt, csv_cc, 'utf-8');
        fs.writeFileSync(path.join(desDir, 'packageInfo') + csvExt, csv_package, 'utf-8');
        return true
    }

    /**
     * Convert the double array to CSV style string
     * @param {Array} arr the double array
     * @returns {String} the CSV style string
     */
    arrayToCSV(arr) {
        const report = arr.map(row => row.join(',')).join('\n');
        return report
    }
}

module.exports = { smellDB }