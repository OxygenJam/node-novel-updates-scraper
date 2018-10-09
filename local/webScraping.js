const request = require('request-promise');
const cheerio = require("cheerio");

const pretty = require('./prettyPrint.js');
const errDict = require('./errorDict.js')

var exports = module.exports; 

/**
 * Sends a request and sends out the body of the web page
 * 
 * @param {string} link This is the website link of the web page
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns A promise of the requested  body of the web page, else error code is returned
 */
exports.retrieveHTML = function(link, retries){

    // Valid Novel Updates novel page link must be passed
    return request(link).catch(function(error){

        if(retries > 0){

            errDict.getError(4);
            errDict.customError(error)
            pretty.logPrint(`Retrying to retrieve HTML body... (Retries left: ${retries-1})`);

            return exports.retrieveHTML(link, retries-1);
        }
        else{
            return Promise.reject(5);
        }
        
    });
}

/**
 * Retrieves the source link of the novel image.
 * 
 * @param {String} HTML The HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the novel image
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The source link of the novel image, null if error or does not exist.
 */
exports.retrieveNovelImage = function(HTML, selector, retries){
    const $ = cheerio.load(HTML);

    try{

        // Image CSS selector for novel image goes here
        image = $(selector).attr('src');

        return image;

    }catch(err){
        
        if(retries>0){

            errDict.getError(6);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve novel cover image... (Retries left: ${retries-1})`);
            return exports.retrieveNovelImage(HTML,selector,retries-1);
        }
        else{
            errDict.getError(7);
            return null;
        }
        
    }
    
}

/**
 * Retrieves the group scanlation name of the novel.
 * 
 * @param {String} HTML The HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the group translation name
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The source name of the group translation, null if error or does not exist.
 */
exports.retrieveNovelScanlationGroup = function(HTML, selector, retries){
    const $ = cheerio.load(HTML);

    try{

        // Get the 2nd TD element from each TR in the table; it's usually 
        // where the translation group column is located.
        group = $(selector).text();

        return group;
    }catch(err){

        if(retries>0){
            
            errDict.getError(8);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve novel chapter group translation ... (Retries left: ${retries-1})`);
            return exports.retrieveNovelScanlationGroup(HTML,selector,retries-1);
        }
        else{
            errDict.getError(9);
            return null;
        }
    }

}

/**
 * Retrieves the chapter link of the novel.
 * 
 * @param {String} HTML The HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the chapter link
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The link of the chapter, null if error or does not exist.
 */
exports.retrieveNovelChapterLink = function(HTML, selector, retries){
    const $ = cheerio.load(HTML);

    try{

        // Get the 3rd TD element from each TR in the table; it's usually 
        // where the chapter link is located.
        chapter_link = $(selector).text();

        return chapter_link;
    }catch(err){

        if(retries>0){
            
            errDict.getError(10);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve chapter link... (Retries left: ${retries-1})`);
            return exports.retrieveNovelScanlationGroup(HTML,selector,retries-1);
        }
        else{
            errDict.getError(11);
            return null;
        }
    }

}

/**
 * Retrieves the max page number of the chapter table of the novel.
 * 
 * @param {String} HTML The HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the pagination
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The max page of the chapter table, null if error or does not exist.
 */
exports.retrieveNovelChapterTableMaxPage = function(HTML, selector, retries){
    const $ = cheerio.load(HTML);

    try{

        // Get the 5th child element or 3rd anchor child element from class
        // digg_pagination in the table; it's usually where the max page is located.
        last_page = $(selector).text();

        return parseInt(last_page);
    }catch(err){

        if(retries>0){
            
            errDict.getError(12);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to max page of chapter table... (Retries left: ${retries-1})`);
            return exports.retrieveNovelScanlationGroup(HTML,selector,retries-1);
        }
        else{
            errDict.getError(13);
            return null;
        }
    }

}