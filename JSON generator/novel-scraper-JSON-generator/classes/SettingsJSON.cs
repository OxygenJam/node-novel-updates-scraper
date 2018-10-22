using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace novel_scraper_JSON_generator.classes
{
    /// <summary>
    /// This is the class for the default settings JSON
    /// </summary>
    class SettingsJSON
    {
        private string image, translator, chapter, outputdir,table_row,table_page;

        /// <summary>
        /// This is the default constructor for the SettingsJSON class
        /// </summary>
        /// <param name="image">The CSS for the Novel Updates novel image location</param>
        /// <param name="translator">The CSS for the Novel Updates novel translator location</param>
        /// <param name="chapter">The CSS for the Novel Updates novel chapter location</param>
        /// <param name="outputdir">The CSS for the output directory location</param>
        /// <param name="table_page">The CSS for the Novel Updates novel table pagination location</param>
        /// <param name="table_row">The CSS for the Novel Updates novel table row location</param>
        public SettingsJSON(
            string image,
            string translator,
            string chapter,
            string outputdir,
            string table_page,
            string table_row)
        {
            this.image = image;
            this.translator = translator;
            this.chapter = chapter;
            this.outputdir = outputdir;
            this.table_page = table_page;
            this.table_row = table_row;
        }


        // == PROPERTIES == //

        public string ImageCSS
        {
            get { return this.image; }
            set { this.image = value; }
        }

        public string TranslatorCSS
        {
            get { return this.translator; }
            set { this.translator = value; }
        }

        public string ChapterCSS
        {
            get { return this.chapter; }
            set { this.chapter = value; }
        }

        public string OutputDirCSS
        {
            get { return this.outputdir; }
            set { this.outputdir = value; }
        }

        public string TableRowCSS 
        {
            get { return this.table_row; }
            set { this.table_row = value; }
        }

        public string TablePageCSS
        {
            get { return this.table_page; }
            set { this.table_page = value; }
        }

        // == END OF PROPERTIES == //
    }
}
