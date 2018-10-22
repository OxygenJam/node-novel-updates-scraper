using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace novel_scraper_JSON_generator.classes.shared
{
    /// <summary>
    /// The custom Exception class for the novel sraper JSON generator application
    /// </summary>
    public class NovelException : Exception
    {
        private int code;
        private string definition;
        private string detailDefinition;

        // == CONTSTRUCTOR == //

        /// <summary>
        /// The default constructor of the custom Exception class for the application
        /// </summary>
        /// <param name="code">The error code</param>
        /// <param name="detailDefinition">The error message of the Exeption caught during a try catch block</param>
        public NovelException(int code, string detailDefinition) : base(detailDefinition)
        {
            this.code = code;
            this.definition = NovelScraperErrorDict.GetErrorDefinition(this.code);
            this.detailDefinition = detailDefinition;
        }

        // == END OF CONSTRUCTOR == //

        // == METHODS == //

        /// <summary>
        /// Gets the error code, definition, and its detailed information of the NovelException class
        /// </summary>
        /// <returns> returns a string containing the error code, definition, and message</returns>
        public string GetErrorMessage()
        {
            return String.Format("ERROR CODE: {0}; {1} \n DETAILED INFO: {2}", this.code, this.definition, this.detailDefinition);
        }

        // == END OF METHODS == //


    }
}
