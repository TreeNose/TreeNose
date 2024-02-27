class smellDB{
    constructor(){
        this.longClass = []
        this.longMethod = []
        this.longParameter = []
        this.longMessageChain = []

        this.longClassTitle = ['Line', 'Smell', 'Number of Lines', 'Threshold', 'Number of Children', 'Threshold', 'File']
        this.longMethodTitle = ['Line', 'Smell', 'Number of Lines', 'Threshold', 'File']
        this.longParameterTitle = ['Line', 'Smell', 'Number of Parameters', 'Threshold', 'File']
        this.longMessageChainTitle = ['Line', 'Smell', 'Threshold', 'File']
    }
    /** 
     * Add smell to the database, if the smell is empty, return false
     * @param {Array} smells an double array of smells
     * @param {String} type the type of smell
     **/
    addSmell(fileName, smells, type){

        if (smells.length <= 0){
            return false;
        } 

        // Add the filename to the last column of each row
        smells = this.addFileName(fileName, smells)
        console.log('-------------------')
        console.log(type)
        if (smells[0].length != this[type + 'Title'].length){
            throw new Error('Smell and Title length mismatch');
        }

        this[type].push(...smells);
        return true;
    }

    getSmell(type){
        return [this[type+'Title']].concat(this[type]);
    }

    /**
     * Add the filename to the last column of each row
     * @param {String} fileName 
     * @param {Array} smells 
     * @returns 
     */
    addFileName(fileName, smells){

        var smellsWithFile = smells.map(row => {
            row.push(fileName)
            return row
        })
        console.log(smellsWithFile)

        return smellsWithFile
    }

    generateCSV(desDir){
        const fs = require('fs');
        
        const csvExt = '.csv'
        const lc = this.getSmell('longClass')
        const lm = this.getSmell('longMethod')
        const lp = this.getSmell('longParameter')
        const lmc = this.getSmell('longMessageChain')

        const csv_lc = this.arrayToCSV(lc)
        const csv_lm = this.arrayToCSV(lm)
        const csv_lp = this.arrayToCSV(lp)
        const csv_lmc = this.arrayToCSV(lmc)

        fs.writeFileSync(desDir+'longClass' + csvExt, csv_lc, 'utf-8');
        fs.writeFileSync(desDir+'longMethod' + csvExt, csv_lm, 'utf-8');
        fs.writeFileSync(desDir+'longParameter' + csvExt, csv_lp, 'utf-8');
        fs.writeFileSync(desDir+'longMessageChain' + csvExt, csv_lmc, 'utf-8');

        return true
    }

    arrayToCSV(arr){
        const report = arr.map(row => row.join(',')).join('\n');
        return report
    }
}

module.exports = {smellDB}