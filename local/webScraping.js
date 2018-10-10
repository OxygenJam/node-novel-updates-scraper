const request = require('request-promise');
const cheerio = require("cheerio");

const pretty = require('./prettyPrint.js');
const errDict = require('./errorDict.js')

var exports = module.exports; 

// ===============SHARED FUNCTIONS================= //

/**
 * Sends a request and sends out the body of the web page
 * 
 * @param {string} link This is the website link of the web page
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns A promise of the requested  body of the web page, else error code is returned
 */
exports.retrieveHTML = function(link, retries){

    pretty.logPrint("Retrieving HTML Document...");

    // Valid Novel Updates novel page link must be passed
    return request(link).catch((error)=>{

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
 * This retrieves all chapters currently available from the Novel Updates page
 * 
 * @param {String} HTML This is the Novel Page HTML body retrieved from the request package
 * @param {Object} novel_meta The novel metadata object loaded from your JSON argument
 * @param {Object} settings The settings object used as selectors for your Novel Updates scraping
 */
exports.retrieveNovelChapters = async function (HTML, novel_meta, settings){

    // CSS selector destructuring

    // Novel Metadata
    const { novel_name, novel_link, groups_to_ignore } = novel_meta;

    // Novel Updates Selectors
    const { novel_image, novel_translator, novel_chapter, novel_table } = settings;

    const max_page = retrieveNovelChapterTableMaxPage(HTML, novel_table.pages, 3);

    pretty.logPrint("Retrieving Novel Chapters...")
    
    // Iterate through all the pages in the Novel Page Chapter Table
    for(page = max_page; page > 0; page--){

        // Set proper GET URL for table pagination based on current iteration
        let pageLink = `${link}?pg=${page}`;

        pretty.logWrite("Current Chapter Table Page: ");
        pretty.cPrint(String(page),"b");

        // Retrieve the HTML body of that table page
        let pageBody = await exports.retrieveHTML(pageLink, 3);

        // Max rows in table per page
        let max_rows = retrieveNovelChapterTableMaxRow(pageBody, novel_table.rows, 3);

        for(row = 0; row < max_rows ; row++){

            let { chapter, link } = retrieveNovelChapterLink(pageBody, novel_chapter, row, 3);
            let translator = retrieveNovelScanlationGroup(pageBody, novel_translator, row, 3);

            // If translator is in list of groups to ignore, skip this row
            if(translator in groups_to_ignore){
                continue;
            }

            let chapterBody = await exports.retrieveHTML(link, 3);


        }




    }
    
}

// ================================================ //



// ==================NOVEL PAGE=================== //

/**
 * Retrieves the source link of the novel image.
 * 
 * @param {String} HTML The Novel Page HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the novel image
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The source link of the novel image, null if error or does not exist.
 */
function retrieveNovelImage(HTML, selector, retries){
    const $ = cheerio.load(HTML);

    pretty.logPrint("Retrieving novel cover image...");

    try{

        // Image CSS selector for novel image goes here
        image = $(selector).attr('src');

        pretty.logPrint("Sucessfully retrieved novel cover image.");
        return image;

    }catch(err){
        
        if(retries>0){

            errDict.getError(6);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve novel cover image... (Retries left: ${retries-1})`);
            return retrieveNovelImage(HTML,selector,retries-1);
        }
        else{
            errDict.getError(7);
            return null;
        }
        
    }
    
}

/**
 * Retrieves the max page number of the chapter table of the novel.
 * 
 * @param {String} HTML The Novel Page HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the pagination
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The max page of the chapter table, null if error or does not exist.
 */
function retrieveNovelChapterTableMaxPage (HTML, selector, retries){
    const $ = cheerio.load(HTML);

    pretty.logPrint("Retrieving chapter table max page...");

    try{

        // Get the 5th child element or 3rd anchor child element from class
        // digg_pagination in the table; it's usually where the max page is located.
        last_page = $(selector).text();

        pretty.logPrint("Sucessfully retrieved chapter table max page.");
        return parseInt(last_page);
    }catch(err){

        if(retries>0){
            
            errDict.getError(12);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to max page of chapter table... (Retries left: ${retries-1})`);
            return retrieveNovelChapterTableMaxPage(HTML,selector,retries-1);
        }
        else{
            errDict.getError(13);
            return null;
        }
    }

}

/**
 * Retrieves the max row number of the chapter table of the novel.
 * 
 * @param {String} HTML The Novel Page HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the table rows
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns The max row of the chapter table, null if error or does not exist.
 */
function retrieveNovelChapterTableMaxRow(HTML, selector, retries){
    const $ = cheerio.load(HTML);

    pretty.logPrint("Retrieving chapter table max rows...");

    try{

        // Get the 5th child element or 3rd anchor child element from class
        // digg_pagination in the table; it's usually where the max page is located.
        rows = $(selector).get().length;

        return parseInt(rows);
    }catch(err){

        if(retries>0){
            
            errDict.getError(14);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to max page of chapter table... (Retries left: ${retries-1})`);
            return retrieveNovelChapterTableMaxPage(HTML,selector,retries-1);
        }
        else{
            errDict.getError(15);
            return null;
        }
    }

}

// ================================================ //


// ==============CHAPTER TABLE ROW================= //
/**
 * Retrieves the group scanlation name of the novel.
 * 
 * @param {String} HTML The HTML body retrieved from the request package
 * @param {String} selector The set of string CSS selector for the group translation name
 * @param {Number} row The current row index in the table
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * @returns The source name of the group translation, null if error or does not exist.
 */
function retrieveNovelScanlationGroup(HTML, selector, row, retries){
    const $ = cheerio.load(HTML);

    pretty.logPrint("Retrieving translator group name...");

    try{

        // Get the 2nd TD element from each TR in the table; it's usually 
        // where the translation group column is located.
        group = $(selector).get(row).text();

        return group;
    }catch(err){

        if(retries>0){
            
            errDict.getError(8);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve novel chapter group translation ... (Retries left: ${retries-1})`);
            return retrieveNovelScanlationGroup(HTML,selector,retries-1);
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
 * @param {Number} row The current row index in the table
 * @param {Number} retries This is the maximum number of retries till error gets thrown
 * 
 * @returns An object containing the link and the chapter number of the chapter, null if error or does not exist.
 */
function retrieveNovelChapterLink(HTML, selector, row, retries){
    const $ = cheerio.load(HTML);

    pretty.logPrint("Retrieving chapter number and link...");

    try{

        // Get the 3rd TD element from each TR in the table; it's usually 
        // where the chapter link is located.
        chapter_link = $(selector).get(row).attr("href");

        // Get Chapter number (e.g. v1c1)
        chapter_number = String($(selector).get(row).text());
        chapter_number = chapter_name.split("c")[1];

        return { chapter: chapter_number, link: chapter_link };
    }catch(err){

        if(retries>0){
            
            errDict.getError(10);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve chapter link... (Retries left: ${retries-1})`);
            return retrieveNovelChapterLink(HTML,selector,retries-1);
        }
        else{
            errDict.getError(11);
            return null;
        }
    }

}

// ================================================ //
