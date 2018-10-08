const pretty = require('./prettyPrint.js');

const errDict = {
    1 : "No arguments are found, please provide a JSON filename.",
    2 : "Error loading JSON file, either wrong filename or does not exist.",
    3 : "Error loading HTML file from the link, either host is down or invalid link."
}

var exports = module.exports;


/**
 * Retrieves the error definition based on the error code, based from
 * the developer's own error dictionary. Prints out the error.
 * 
 * @param {Number} code This represents the code key for what error definition it is
 */
exports.getError = function(code){

    pretty.errPrint(errDict[code]);
}