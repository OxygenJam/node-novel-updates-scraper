/**
 * This is the error dictionary submodule
 * This contains all the list of error codes and its definitions
 * 
 * -Zird Triztan Driz
 */
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
    13 : "Exhausted retries in retrieving chapter table max page link.",
    14 : "An error occured while retrieving chapter table max rows link.",
    15 : "Exhausted retries in retrieving chapter table max rows link.",
    16 : "Invalid novel JSON format, must have a novel_name and novel_link",
    17 : "groups.JSON in folder static is missing! Please find and put it back where it belongs!",
    18 : "Can't find group in the groups.JSON; provide an individual JSON file for that group, then add it to groups.JSON",
    19 : "Tried retrieving the group's JSON data, but an error occured, either it doesn't exist or location is wrong",
    20 : "An error occured while retrieving the chapter content / paragraph from the group's site.",
    21 : "Chapter already exists in the current list; skipping...",
    22 : "Group translator of the chapter is in the list of groups to ignore; skipping...",
    23 : "An error occured in the compilation of the Novel Cover Page into a PDF.",
    24 : "An error occured in the compilation of the chapters into a PDF.",
    25 : "An error occured in retrieving the image; Will use default image available"
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