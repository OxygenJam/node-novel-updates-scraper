const request = require('request-promise');

var exports = module.exports; 

/**
 * Sends a request and sends out the body of the web page
 * 
 * @param {string} link This is the website link of the web page
 * 
 * @returns A promise of the requested  body of the web page
 */
exports.retrieveHTML = function(link){

    return request(link)
        .then(function(body){
            return body;
        })
        .catch(function(error){
            return error;
        });
}