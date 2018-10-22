using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.IO;

namespace novel_scraper_JSON_generator.classes.shared
{
    static public class NovelJSON
    {
        // Default output directory of the corresponding piece of JSON file is relative to the 
        // current path of the running application
        static private string groupsDir = @"../../output/groups";
        static private string novelsDir = @"../../output/novels";

        // == CONSTRUCTOR == //

        static NovelJSON()
        {
            try
            {
                CheckAppDirectory();
            }
            catch(NovelException err)
            {
                throw err;
            }

        }

        // == END OF CONSTRUCTOR == //

        // == STATIC METHODS == //

        // == PUBLIC METHODS == //

        static public string LoadJSONData(string filename)
        {

            return null;
        }

        static public List<string> LoadGroupJSONData(Translator groups)
        {

            return null;
        }

        /// <summary>
        /// Generate the novel JSON data file
        /// </summary>
        /// <param name="novel">The instance of the Novel class containing the metadata of the novel</param>
        static public void GenNovelJSON(Novel novel)
        {
            string path = novelsDir + FormatName(novel.Name);

            WriteJSONData(path, novel);
        }

        /// <summary>
        /// Generate the group JSON data file
        /// </summary>
        /// <param name="group">The instance of the Group class containing the metadata of the group or translator</param>
        static public void GenGroupJSON(Translator group)
        {
            string path = groupsDir + FormatName(group.Name);

            WriteJSONData(path, group);
        }

        /// <summary>
        /// Reads the existing group of JSON data in the groups directory
        /// </summary>
        /// <returns>The list of group JSON data found in the groups directory</returns>
        static public List<string> ReadListOfExistingGroupsJSONData()
        {
            try
            {
                string[] files = Directory.GetFiles(groupsDir, "*.json").Select(f => Path.GetFileName(f)).ToArray();
                List<string> groups = new List<string>(files);

                return groups;
            }
            catch(Exception err)
            {
                throw new NovelException(2, err.Message);
            }
        }

        // == END OF PUBLIC METHODS == //

        // == PRIVATE METHODS == //

        /// <summary>
        /// Writes the JSON 
        /// </summary>
        /// <param name="path">The full formatted path file of the JSON file to be generated</param>
        /// <param name="obj"></param>
        static private void WriteJSONData(string path, object obj)
        {
            Type type = obj.GetType();

            try
            {
                File.OpenWrite(path);
            }
            catch (Exception err)
            {
                throw new NovelException(3, err.Message);
            }
        }

        /// <summary>
        /// This checks first if the folders are present in the current
        /// directory setup of the application, if not creates them
        /// </summary>
        /// <exception> Throws a non-zero error code when an error occurs </exception>
        static private void CheckAppDirectory()
        {
            try
            {
                if (!Directory.Exists(groupsDir))
                {
                    Directory.CreateDirectory(groupsDir);
                }

                if (!Directory.Exists(novelsDir))
                {
                    Directory.CreateDirectory(novelsDir);
                }
            }
            catch(Exception err)
            {
                throw new NovelException(1, err.Message);
            }

        }

        /// <summary>
        /// This formats the name of the novel or the group to appropriate file naming
        /// convention, to avoid errors and problems when writing or generating the JSON file
        /// </summary>
        /// <param name="name">The name of the novel or groupt translating the piece of work</param>
        /// <returns>A formatted name in proper file naming convention</returns>
        static private string FormatName(string name)
        {
            // Regular Expression formatting
            name = Regex.Replace(name, @"[/() -]", "_");
            name = Regex.Replace(name, @"[.',]", "");

            // Remove duplicate and trailing underscores
            while (name.IndexOf("__") != -1)
            {
                name = name.Replace("__", "_");
            }

            name = name.Replace(" % ", "pct");
            name = name.Replace("#", "nbr");
            name = name.Replace("&", "and");
            name = name.Replace("+", "and");
            name = name.Replace("=", "is");
            name = name.Replace("<", "less_than");
            name = name.Replace(">", "greater_than");

            return String.Format("{0}.json",name);
        }

        // == END OF PRIVATE METHODS == //

        // == END OF STATIC METHODS == //
    }
}
