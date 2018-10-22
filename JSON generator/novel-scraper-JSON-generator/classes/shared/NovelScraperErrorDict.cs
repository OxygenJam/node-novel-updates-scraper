using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace novel_scraper_JSON_generator.classes.shared
{
    public static class NovelScraperErrorDict
    {
        private static List<Error> errors;

        // Constructor to initialize the list of errors in the static class

        // == CONSTRUCTOR == //

        static NovelScraperErrorDict()
        {
            errors = new List<Error>(new Error[]
            {
                Error.Create(1, "Error in reading or creating the default directory"),
                Error.Create(2, "Error in reading the list of files from the groups directory"),
                Error.Create(3, "Error in writing the JSON file for the Novel")
                
            });
        }

        // == END OF CONSTRUCTOR == //

        // == INTERNAL CLASSES == //

        private class Error
        {
            private int code;
            private string definition;

            /// <summary>
            /// Factory method for creating a new Error instance
            /// </summary>
            /// <param name="code">The error code</param>
            /// <param name="defintion">The error definition or message</param>
            /// <returns>The Error instance</returns>
            public static Error Create(int code, string defintion)
            {
                return new Error(code, defintion);
            }

            private Error(int code, string definition)
            {
                this.code = code;
                this.definition = definition;
            }

            public int Code
            {
                get { return this.code; }
            }

            public string Definition
            {
                get { return this.definition; }
            }
        }

        // == END OF INTERNAL CLASSES == //

        // == METHODS == //

        /// <summary>
        /// Gets the error definition based on the error code
        /// </summary>
        /// <param name="code"> This is the code number of the error </param>
        /// <returns> The definition of the error based on the code number </returns>
        static public string GetErrorDefinition(int code)
        {
            return errors[code - 1].Definition;
        }

        // == END OF METHODS == //

    }
}
