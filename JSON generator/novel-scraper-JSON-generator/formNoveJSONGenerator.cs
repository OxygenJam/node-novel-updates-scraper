using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using novel_scraper_JSON_generator.classes;
using novel_scraper_JSON_generator.classes.shared;

namespace novel_scraper_JSON_generator
{
    public partial class formNoveJSONGenerator : Form
    {
        public formNoveJSONGenerator()
        {
            InitializeComponent();

            // Non-data source binding
            List<string> files = NovelJSON.ReadListOfExistingGroupsJSONData();
            foreach (string file in files)
            {
                lstBoxGroups.Items.Add(file);
            }
        }

        // == BUTTON EVENTS == //

        private void btnClear_Click(object sender, EventArgs e)
        {
            txtBoxNovelAuthor.Text = null;
            txtBoxNovelLink.Text = null;
            txtBoxNovelName.Text = null;

            var toignore = lstBoxIgnore.Items;
            int count = toignore.Count - 1;

            if (count >= 0)
            {
                while (count >= 0)
                {
                    lstBoxGroups.Items.Add(toignore[count]);
                    lstBoxIgnore.Items.Remove(toignore[count]);
                    count--;
                }
            }
            
            
        }

        private void btnGenJSON_Click(object sender, EventArgs e)
        {
            string name = txtBoxNovelName.Text;
            string link = txtBoxNovelLink.Text;
            string author = txtBoxNovelAuthor.Text;
            List<string> toignore = new List<string>();

            foreach(string item in lstBoxIgnore.Items)
            {

                toignore.Add(item.Split(new[] { ".json" }, StringSplitOptions.None)[0]);
            }
            NovelJSON.GenNovelJSON(new Novel(name, link, author, toignore));
        }

        /// <summary>
        /// Removes the selected groups in the available groups list, and adds them to the
        /// list of groups to ignore in the other listbox.
        /// </summary>
        private void btnAddGroup_Click(object sender, EventArgs e)
        {
            var selected = lstBoxGroups.SelectedItems;
            int count = selected.Count-1;

            if (count >= 0)
            {
                while (count >= 0)
                {
                    lstBoxIgnore.Items.Add(selected[count]);
                    lstBoxGroups.Items.Remove(selected[count]);
                    count--;
                }
            }

        }

        /// <summary>
        /// Removes the selected groups in the ignore list, and returns them back to the
        /// available groups in the other listbox.
        /// </summary>
        private void btnRemoveGroup_Click(object sender, EventArgs e)
        {
            var selected = lstBoxIgnore.SelectedItems;
            int count = selected.Count - 1;

            if (count >= 0)
            {
                while (count >= 0)
                {
                    lstBoxGroups.Items.Add(selected[count]);
                    lstBoxIgnore.Items.Remove(selected[count]);
                    count--;
                }
            }
        }

        // == END OF BUTTON EVENTS == //
    }
}
