/**
 * This is the web-scraping module used to scrape data from the novel page
 * and the group translator's page
 * 
 * -Zird Triztan Driz
 */
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

    pretty.logWrite("Retrieving HTML document from");
    pretty.cPrint(`${link}`,"b");

    // Valid Novel Updates novel page link must be passed
    return request(link).then((body)=>{

        pretty.logPrint("Successfully retrieved HTML document.")

        return body;
    }).catch((error)=>{

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
 * This retrieves the novel header information like cover and title.
 * 
 * @param {String} HTML This is the Novel Page HTML body retrieved from the request package
 * @param {Object} novel_meta The novel metadata object loaded from your JSON argument
 * @param {Object} settings The settings object used as selectors for your Novel Updates scraping
 * 
 * @returns An object containing information of all the novel header information
 */
exports.retrieveNovelHeaders = function(HTML, novel_meta, settings){
    const { novel_name , novel_author } = novel_meta;
    const { novel_image } = settings;

    let cover = retrieveNovelImage(HTML, novel_image, 3);

    return { name: novel_name, author: novel_author, cover: cover };
}

/**
 * This retrieves all chapters currently available from the Novel Updates page
 * 
 * @param {String} HTML This is the Novel Page HTML body retrieved from the request package
 * @param {Object} novel_meta The novel metadata object loaded from your JSON argument
 * @param {Object} settings The settings object used as selectors for your Novel Updates scraping
 * 
 * @returns A promise containing the list of chapters and its contents
 */
exports.retrieveNovelChapters = async function (HTML, novel_meta, settings){

    // CSS selector destructuring

    // Novel Metadata
    const { novel_link, groups_to_ignore } = novel_meta;

    // Novel Updates Selectors
    const { novel_translator, novel_chapter, novel_table } = settings;

    const max_page = retrieveNovelChapterTableMaxPage(HTML, novel_table.pages, 3);

    var chapterList = []

    pretty.logPrint("Retrieving Novel Chapters...")
    
    // This algorithm will traverse N number of pages and R number of rows
    // the table, so the time complexity would be on average is O(N*R)

    // Iterate through all the pages in the Novel Page Chapter Table
    for(page = max_page; page > 0; page--){

        pretty.logWrite("Current Chapter Table Page: ");
        pretty.cPrint(`${page}`,"b");

        // Set proper GET URL for table pagination based on current iteration
        let pageLink = `${novel_link}?pg=${page}`;

        // Retrieve the HTML body of that table page
        let pageBody = await exports.retrieveHTML(pageLink, 3);

        // Max rows in table per page
        let max_rows = retrieveNovelChapterTableMaxRow(pageBody, novel_table.rows, 3);

        for(row = max_rows-1; row > 0 ; row--){

            let { chapter, link } = retrieveNovelChapterLink(pageBody, novel_chapter, row, 3);
            let translator = retrieveNovelScanlationGroup(pageBody, novel_translator, row, 3);

            pretty.logWrite("Retrieving ");
            pretty.cPrint(`${chapter}`,"b");
            // I should just implement a set rather than a list no? 
            // Maybe next time :p
            // -OxygenJam

            let existingChapters = chapterList.map((d) => { return d["chapter"]});

            // Checks if chapter already exists
            if(existingChapters.indexOf(chapter) > 0){
                errDict.getError(21);
                continue;
            }

            // If translator is in list of groups to ignore, skip this row
            if(groups_to_ignore.indexOf(translator)!=-1){
                pretty.logWrite("");
                pretty.cWrite(`${translator}`, "b");
                pretty.cPrint("in groups to ignore, skipping...", "w");
                continue;
            }

            let chapterBody = await exports.retrieveHTML(link, 3).catch((err)=>{
                err.getError(err);
                pretty.errPrint("Skipping chapter...");
                return null;
            });

            if(!chapterBody){
                continue;
            }

            let groupMeta = findGroupFromExistingGroups(translator);

            if(!isNaN(groupMeta)){

                // When an error occured in the function, the error code, a number, is returned
                return Promise.reject(groupMeta)
            }

            let content = await retrieveChapterData(chapterBody, groupMeta, chapter);

            // Store object containing chapter and paragraphs in an array list
            chapterList = [...chapterList, {chapter, content}];
            
        }
    }
    
    pretty.logPrint("Finished retrieving Novel Chapters.");
    return chapterList;
    
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
        let image = $(selector).attr('src');

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
        
        // Last index is always the -> button, if it does not exist, default to 0
        let page_length = ($(selector).get().length) - 2;
        page_length = page_length < 0 ? 0 : page_length

        // Last page is usually the last anchor tag before the ->
        let last_page = $($(selector).get(page_length)).text();

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
        let rows = $(selector).get().length;

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

    try{

        // Get the 2nd TD element from each TR in the table; it's usually 
        // where the translation group column is located.
        let group = $($(selector).get(row)).text();

        group = group.trim();
        group = group.replace(/[~!@#$%^&*(')_+"’]/,"");

        return group;
    }catch(err){

        if(retries>0){
            
            errDict.getError(8);
            errDict.customError(err.message);
            pretty.logPrint(`Retrying to retrieve novel chapter group translator name ... (Retries left: ${retries-1})`);
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
        let chapter_link = $($(selector).get(row)).attr("href");

        // Current implementation of hyperlinking in Novel Updates are // in before url
        // This will replace it, delete this when implementation changes
        chapter_link = chapter_link.replace("//www","https://www");

        // Get Chapter number (e.g. v1c1)
        let chapter_number = String($($(selector).get(row)).text());

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

// ==================CHAPTER PAGE================== //

/**
 * Retrieves the chapter content from the group translator's site.
 * 
 * @param {String} HTML This is the HTML body of the chapter in the group's website
 * @param {Object} groupMeta The meta data to be used for CSS scraping the chapter
 * @param {String} chapter This is the chapter string of the current iteration 
 * 
 * @returns An array of text elements that will represent each paragraph in the chapter
 */
async function retrieveChapterData(HTML, groupMeta, chapter){

    chapter = chapter.trim();
    const { content, title, hasRedirect } = groupMeta;
    const $ = cheerio.load(HTML);
    var paragraphs = [];
    var chaptertitle = ""

    // Check if it has multiple parts and redirection
    if(hasRedirect.parts){

        // Truncate to only get the chapter number
        chapter = /c[0-9]*/.exec(chapter)[0];
        chapter = chapter.replace("c","");

        if(title == "" || title == null){

            chaptertitle = `Chapter ${chapter}`;
        }

        let parts = $(hasRedirect.parts).get();

        parts = parts.map((p) => { return $(p).attr("href");});

        // Remove any undefined or null data
        parts = parts.filter((p) => { return p } );
        parts = parts.filter((p) => { return (p.indexOf(chapter)!=-1); });

        let paragraph = "";
        for(var p = 0; p<p.length; p++){
            
            try{

                HTML = await exports.retrieveHTML(parts[p], 3).catch((err)=>{
                    err.getError(err);
                    pretty.errPrint("Skipping chapter component...");
                    return null;
                });

                if(!HTML){
                    continue;
                }

                let $ = cheerio.load(HTML);

                if(p==0){

                    chaptertitle = $(title).text();
                }

                $(content).each((i,elem)=>{

                    paragraph = $(elem).text();

                    if(paragraph != null || paragrap != ""){
                        paragraphs = [...paragraphs, paragraph];
                    }

                });

            }
            catch(err){

                errDict.getError(20);
                paragraphs =  [...paragraphs, "An error occured in the retrieval of the chapter contents", err];
        
                return paragraphs;
            }

        }

        return { title: chaptertitle, content: paragraphs };

    }
    else{

        try{

            
            if(title == "" || title == null){

                // Truncate to only get the chapter number
                chapter = /c[0-9]*/.exec(chapter)[0];
                chapter = chapter.replace("c","");

                chaptertitle = `Chapter ${chapter}`;
            }
            else{

                chaptertitle = $(title).text();
            }

            $(content).each((i,elem)=>{
    
                let paragraph = $(elem).text();
    
                // Skip the paragraph if it is blank
                if(paragraph != null || paragraph != ""){
                    paragraphs = [...paragraphs, paragraph];
                }
    
            })
        }
        catch(err){
    
            errDict.getError(20);
            paragraphs =  [...paragraphs, "An error occured in the retrieval of the chapter contents", err];
    
            return paragraphs;
        }

        return { title: chaptertitle, content: paragraphs };
    }

}

/**
 * Observes and retrieves the appropriate location of the group's local JSON data
 * 
 * @param {String} groupname The name of the group translator
 * 
 * @returns returns the URL of the group JSON data
 */
function findGroupFromExistingGroups(groupname){

    pretty.logWrite("Retrieving the JSON data of ");
    pretty.cPrint(`${groupname}`,"b");

    try{
        const { groups, directory } = require('../static/groups.json');

        const names = groups.map( (group) => { return group["name"] });
        const links = groups.map( (group) => { return group["filename"]});

        if(names.indexOf(groupname) == -1){

            return 18;
        }

        return retrieveGroupMetaData(links[names.indexOf(groupname)], directory);
    }
    catch(err){

        errDict.customError(err);

    }
    
}

/**
 * Finds, loads, and retrieves the group's JSON data.
 * 
 * @param {String} link This is the location of the JSON data of the group
 * @param {String} directory This is the home directory of the group JSON files
 * 
 * @returns The JSON data of the group 
 */
function retrieveGroupMetaData(link, directory){

    try{

        const meta = require(directory + link + ".json");

        return meta;
    }
    catch(err){

        errDict.customError(err);
        return 19;
    }

}