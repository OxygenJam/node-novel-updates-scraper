using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace novel_scraper_JSON_generator.classes
{
    /// <summary>
    /// This contains all the metadata of the translator site, as well its CSS selectors
    /// </summary>
    public class Translator
    {
        private string name, hasredirect, content, title;

        // == CONSTRUCTORS == //

        /// <summary>
        /// This is the default constructor for the Translator class.
        /// </summary>
        /// <param name="name">The name of the group or translator</param>
        /// <param name="hasredirect">The CSS selector for the redirect link if available</param>
        /// <param name="content">The CSS selector for the content of the chapter</param>
        /// <param name="title">The CSS selector for the content of the title</param>
        public Translator(string name, string hasredirect, string content, string title)
        {
            this.name = name;
            this.hasredirect = hasredirect;
            this.content = content;
            this.title = title;
        }

        // == END OF CONSTRUCTORS == //

        // == PROPERTIES == //

        public string Name
        {
            get { return this.name; }
            set { this.name = value; }
        }

        public string HasRedirect
        {
            get { return this.hasredirect; }
            set { this.hasredirect = value; }
        }

        public string Content
        {
            get { return this.content; }
            set { this.content = value; }
        }

        public string Title
        {
            get { return this.title; }
            set { this.title = value; }
        }

        // == END OF PROPERTIES == //
    }
}
