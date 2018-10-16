/**
 * This program serves to compile all your weeb LN needs
 * to a readable PDF format.
 * 
 * -Zird Triztan Driz
 */
const pretty = require("./local/prettyPrint");
const scrape = require("./local/webScraping.js");
const errDict = require("./local/errorDict.js");
const pdfCompile = require('./local/pdfCompile.js');

//Core package dependencies
const cheerio = require("cheerio");
const request = require("request-promise");
const pdf = require("pdfkit");

var novel_metadata = null;


// ================SYNTAX CHECKING================= //
/**
 * This checks for proper syntax in the command line on run.
 * 
 * @param {Array} args This is the list of sys.args from running the program
 * 
 * @returns exit code of novel metadata or non-zero exit code
 */
function isSyntaxCorrect(args){

    args = args.slice(2);
    // If no arguments
    if(args.length == 0){
        return 1;
    }

    // args = [json_filename]
    filename = args[0].toLowerCase() + ".json";

    // Load JSON file
    try{

        let novel_metadata = require('./novels/' + filename);
        
        // Check if JSON file is in correct format
        if(!novel_metadata.novel_name && !novel.novel_link){
            return 16;
        }

        return novel_metadata;
        
    }catch(err){

        errDict.customError(err);
        return 2;
    }
}


// ================================================ //

// ======================MAIN====================== //

function main(){

    // Check for any arguments or syntax errors
    const novelMeta = isSyntaxCorrect(process.argv);

    if(! isNaN(novelMeta)){

        return Promise.reject(novelMeta);
    }


    // Default CSS selectors are stored in the default.json
    const selectors = require("./static/default.json");
    const { output_directory } = selectors;
    const { novel_link } = novelMeta;

    return new Promise((resolve,reject)=>{

        // Load main HTML webpage of Novel Updates page of novel OwO
        scrape.retrieveHTML(novel_link, 3)
            .then(async (body)=>{

                // Scraping Section
                novelHeader = scrape.retrieveNovelHeaders(body, novelMeta, selectors);
                chapters = await scrape.retrieveNovelChapters(body, novelMeta, selectors);

                console.log(chapters);

                pretty.lineBreak();
                // PDF Section
                let pdf = new pdfCompile.PDFModule(output_directory);

                try{
                    pretty.logPrint("Compiling your Novel into a PDF format...");
                    pretty.logPrint()
                    await pdf.compileCoverPage(novelHeader);
                    pdf.compileNovelPages(chapters);
                }
                catch(err){
                    
                    reject(err);
                }

                resolve(0);

            })
            .catch((err)=>{

                errDict.getError(err);
                reject(err);
            })

    })
}

// If this application is imported or is being ran as is
if(typeof module != 'undefined' && !module.parent){

    async function start(){
        start = new Date();
        code = await main().catch((err)=>{
            return err;
        })

        if(code == 0){
            pretty.logWrite("Application ran with ");
            pretty.cPrint("no errors!");
        }
        else{
            pretty.logWrite("Application ran with ");
            pretty.cPrint("ERROR CODE " + code.toString(), "r");

            errDict.getError(code);
        }

        // Elapsed time
        end = new Date();

        // Results are always in milleseconds
        diff = end - start;

        elapsed = {
            seconds : parseInt(diff / 1000),
            minutes : parseInt(diff / 60000),
            mille : parseInt(diff % 1000)
        }

        pretty.logWrite("Time Elapsed: ");
        pretty.cPrint(elapsed.minutes + "m : " + elapsed.seconds + "s : " + elapsed.mille + "ms", "b");

    }

    start();
}

// ================================================ //