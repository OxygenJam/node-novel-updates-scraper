/**
 * Sub module of the main program to compile the final results
 * into a readable PDF format
 * 
 * -Zird Triztan Driz
 */
const PDFDocument = require('pdfkit');
const errDict = require('./errorDict.js');
const pretty = require('./prettyPrint.js');

const fs = require('fs');

var exports = module.exports = {};

/**
 * This is the class that will create your PDF document.
 */
exports.PDFModule = class PDFModule{

    /**
     * @param {String} outputdir This is the output directory where to write your PDF file
     */
    constructor(outputdir){
        this.doc = new PDFDocument;
        this.dir = outputdir;
    }

    /**
     * This will compile the novel image and name in the PDF pipeline
     * 
     * @param {Object} novelData This is the object data containing the novel image and name
     * 
     * @throws The an error code when an exception occurs 
     */
    compileCoverPage(novelData){

        const {name, cover, author} = novelData;
        const myRepos = "https://github.com/OxygenJam/node-novel-updates-scraper";
        const pdfkitLink = "http://pdfkit.org";

        try{

            this.doc.pipe(fs.createWriteStream(formatNovelName(name) + ".pdf"));

            pretty.logPrint("Compiling novel cover page...");

            this.doc.fontSize(36)
                .text(name, {align:'center'})
                .moveDown()
                .fontSize(16)
                .text('By: '+ author, {align:'center'})
                .moveDown();
    
            this.doc.fontSize(8)
                .text('Created using ', {align:'center'})
                .fillColor('blue')
                .text('node-novel-updates-scraper ', {link:myRepos, underline:true, align: 'center'})
                .fillColor('black')
                .text('and ', {align:'center'})
                .fillColor('blue')
                .text('PDFkit', {link:pdfkitLink, align:'center', underline: true})
                .fillColor('black')
                .moveDown();
            
            this.doc.image(cover)
                .moveDown();

                pretty.logPrint("Nover cover page done.");
        }
        catch(err){

            errDict.customError(err);
            throw 23;

        }

    }

    /**
     * This will compile all the chapters to the PDF pipeline.
     * 
     * @param {Array} chapterlist This is the array of chapters of the novel, containing its contents
     * 
     * @throws An error code when an exception occurs
     */
    compileNovelPages(chapterlist){

        try{

            pretty.logPrint("Compiling novel contents...");
            // Iterate through the list of chapters where c is the chapters
            // and the p is your paragraph, this has a time complexity of O(c*p)
            for(c = 0; c<chapterlist.length; c++){

                let { chapter, paragraphs } = chapterlist[c];

                this.doc.addPage()
                    .fontSize(25)
                    .text(chapter, 100, 100)
                    .moveDown();

                for(p=0; p<paragraphs; p++){

                    this.doc.fontSize(12)
                        .text(paragraphs[p])
                        .moveDown();

                }
            }

            this.doc.end();

            pretty.logWrite("Compiling of novel is done! Check the output on: ");
            pretty.cPrint(`${this.dir}`,"b");
            pretty.lineBreak();
        }
        catch(err){
            errDict.customError(err);
            throw 24;
        }
        
    }
}

/**
 * Format the name to an acceptible filename format
 * 
 * @param {String} name The name of the novel
 * 
 * @returns The formatted filename in lowercase letters
 */
function formatNovelName(name){
    name = name.replace(/[/() -]/g,"_");
    name = name.replace(/[.'?,]/g,"");

    // While there is _ repetitions remove
    while(name.indexOf("__")!=-1){

        name = name.replace("__","_");
    }
    
    name = name.replace("%","pct");
    name = name.replace("#","nbr");
    name = name.replace("&","and");
    name = name.replace("+","and");
    name = name.replace("<","less_than");
    name = name.replace(">","greater_than");

    return name.toLowerCase();
}

