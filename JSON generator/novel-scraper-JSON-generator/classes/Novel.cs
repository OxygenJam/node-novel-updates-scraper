using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using novel_scraper_JSON_generator.classes;

namespace novel_scraper_JSON_generator.classes
{
    /// <summary>
    /// This is the Novel Class, contains all the necessary properties needed
    /// for the JSON file to be generated and to be used by the NodeJS application.
    /// </summary>
    public class Novel
    {
        private string name, url, author;
        private List<string> groups;

        // == CONSTRUCTORS == //

        /// <summary>
        /// This is the default constructor for the <c>Novel</c> class
        /// </summary>
        /// <param name="name">This represents the name of the Novel</param>
        /// <param name="url">This represents the URL of the Novel Updates page of the Novel</param>
        /// <param name="author">This represents the glorious author of the novel</param>
        /// <param name="groups">This represents the list of translation groups to ignore</param>
        public Novel(string name, string url, string author, List<string> groups)
        {
            this.name = name;
            this.url = url;
            this.author = author;
            this.groups = groups;
        }

        /// <summary>
        /// This is the overloaded/alternate constructor that allows no groups supplied
        /// </summary>
        /// <param name="name">This represents the name of the Novel</param>
        /// <param name="url">This represents the URL of the Novel Updates page of the Novel</param>
        /// <param name="author">This represents the glorious author of the novel</param>
        public Novel(string name, string url, string author)
        {
            this.name = name;
            this.url = url;
            this.author = author;
        }

        // == END OF CONSTRUCTORS == //

        // == PROPERTIES == //

        public string Name
        {
            get { return this.name; }
            set { this.name = value; }
        }

        public string URL
        {
            get { return this.url; }
            set { this.url = value; }
        }

        public string Author
        {
            get { return this.author; }
            set { this.author = value; }
        }

        public List<string> GroupsToIgnore
        {
            get { return this.groups; }
            set { this.groups = value; }
        }

        // == END OF PROPERTIES == //
    }
}
