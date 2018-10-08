/**
 * This program serves to compile all your weeb LN needs
 * to a readable PDF format.
 * 
 * -Zird Triztan Driz
 */
const pretty = require('./prettyPrint.js');
const scrape = require("./webScraping.js");
const errDict = require("./errorDict.js");

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
 * @returns exit code of 0 or 1
 */
function isSyntaxCorrect(args){

    // If no arguments
    if(args.slice(2).length == 0){
        return 1;
    }

    // args = [json_filename]
    filename = args[0].toLowerCase() + ".json";

    // Load JSON file
    try{
        novel_metadata = require('./novels/' + filename);
        return 0;
    }catch(e){
        return 0;
    }
}


// ================================================ //

// ======================MAIN====================== //

function main(){

    // Check for any arguments or syntax errors
    if(isSyntaxCorrect(process.argv) != 0){
        code = isSyntaxCorrect(process.argv);

        errDict.getError(code);
        return code
    }

    return new Promise((resolve,reject)=>{

        // Load main HTML webpage of Novel Updates page of novel OwO
        scrape.retrieveHTML("http://google.com")
            .then(function(body){
                pretty.logPrint("HTML BODY:\n")
                console.log(body);

                resolve(0);

            })
            .catch(function(err){

                errDict.getError(3);
                reject(3);
            })

    })
}

// If this application is imported or is being ran as is
if(typeof module != 'undefined' && !module.parent){

    async function start(){
        start = new Date();
        code = await main()

        if(code == 0){
            pretty.logWrite("Application ran with ");
            pretty.cPrint("no errors!");
        }
        else{
            pretty.logWrite("Application ran with ");
            pretty.cPrint("ERROR CODE " + code.toString(), "r");
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