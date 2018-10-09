const pretty = require('./prettyPrint.js');

const errDict = {
    1 : "No arguments are found, please provide a JSON filename.",
    2 : "Error loading JSON file, either wrong filename or does not exist.",
    3 : "Error loading HTML file from the link, either host is down or invalid link.",
    4 : "An error occurred while retrieving HTML document.",
    5 : "Exhausted retries in retrieving HTML document.",
    6 : "An error occured while retrieving novel image source.",
    7 : "Exhausted retries in retrieving novel image source.",
    8 : "An error occured while retrieving group translation name.",
    9 : "Exhausted retries in retrieving group translation name.",
    10 : "An error occured while retrieving novel chapter link.",
    11 : "Exhausted retries in retrieving novel chapter link.",
    12 : "An error occured while retrieving chapter table max page link.",
    13 : "Exhausted retries in retrieving chapter table max page link."
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

/**
 * Prints an indented error message based from the catched error message body
 * 
 * @param {String} message This is the error message body from the catched error
 */
exports.customError = function(message){

    pretty.cPrint("\n\t" + message + "\n", "r");
}