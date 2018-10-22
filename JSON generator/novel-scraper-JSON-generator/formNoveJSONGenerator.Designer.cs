namespace novel_scraper_JSON_generator
{
    partial class formNoveJSONGenerator
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.txtBoxNovelName = new System.Windows.Forms.TextBox();
            this.grpBoxNovelMeta = new System.Windows.Forms.GroupBox();
            this.btnGenJSON = new System.Windows.Forms.Button();
            this.btnClear = new System.Windows.Forms.Button();
            this.btnRemoveGroup = new System.Windows.Forms.Button();
            this.btnAddGroup = new System.Windows.Forms.Button();
            this.label6 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.lstBoxIgnore = new System.Windows.Forms.ListBox();
            this.lstBoxGroups = new System.Windows.Forms.ListBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtBoxNovelAuthor = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtBoxNovelLink = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.lstBoxLogs = new System.Windows.Forms.ListBox();
            this.grpBoxNovelMeta.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(26, 26);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(69, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Novel Name:";
            this.label1.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // txtBoxNovelName
            // 
            this.txtBoxNovelName.Location = new System.Drawing.Point(101, 23);
            this.txtBoxNovelName.Name = "txtBoxNovelName";
            this.txtBoxNovelName.Size = new System.Drawing.Size(198, 20);
            this.txtBoxNovelName.TabIndex = 1;
            // 
            // grpBoxNovelMeta
            // 
            this.grpBoxNovelMeta.Controls.Add(this.btnGenJSON);
            this.grpBoxNovelMeta.Controls.Add(this.btnClear);
            this.grpBoxNovelMeta.Controls.Add(this.btnRemoveGroup);
            this.grpBoxNovelMeta.Controls.Add(this.btnAddGroup);
            this.grpBoxNovelMeta.Controls.Add(this.label6);
            this.grpBoxNovelMeta.Controls.Add(this.label5);
            this.grpBoxNovelMeta.Controls.Add(this.label4);
            this.grpBoxNovelMeta.Controls.Add(this.lstBoxIgnore);
            this.grpBoxNovelMeta.Controls.Add(this.lstBoxGroups);
            this.grpBoxNovelMeta.Controls.Add(this.label3);
            this.grpBoxNovelMeta.Controls.Add(this.txtBoxNovelAuthor);
            this.grpBoxNovelMeta.Controls.Add(this.label2);
            this.grpBoxNovelMeta.Controls.Add(this.txtBoxNovelLink);
            this.grpBoxNovelMeta.Controls.Add(this.label1);
            this.grpBoxNovelMeta.Controls.Add(this.txtBoxNovelName);
            this.grpBoxNovelMeta.Location = new System.Drawing.Point(12, 12);
            this.grpBoxNovelMeta.Name = "grpBoxNovelMeta";
            this.grpBoxNovelMeta.Size = new System.Drawing.Size(306, 315);
            this.grpBoxNovelMeta.TabIndex = 2;
            this.grpBoxNovelMeta.TabStop = false;
            this.grpBoxNovelMeta.Text = "Novel JSON";
            // 
            // btnGenJSON
            // 
            this.btnGenJSON.Location = new System.Drawing.Point(155, 270);
            this.btnGenJSON.Name = "btnGenJSON";
            this.btnGenJSON.Size = new System.Drawing.Size(144, 39);
            this.btnGenJSON.TabIndex = 14;
            this.btnGenJSON.Text = "Generate JSON";
            this.btnGenJSON.UseVisualStyleBackColor = true;
            this.btnGenJSON.Click += new System.EventHandler(this.btnGenJSON_Click);
            // 
            // btnClear
            // 
            this.btnClear.Location = new System.Drawing.Point(6, 270);
            this.btnClear.Name = "btnClear";
            this.btnClear.Size = new System.Drawing.Size(143, 39);
            this.btnClear.TabIndex = 13;
            this.btnClear.Text = "Clear";
            this.btnClear.UseVisualStyleBackColor = true;
            this.btnClear.Click += new System.EventHandler(this.btnClear_Click);
            // 
            // btnRemoveGroup
            // 
            this.btnRemoveGroup.Location = new System.Drawing.Point(132, 208);
            this.btnRemoveGroup.Name = "btnRemoveGroup";
            this.btnRemoveGroup.Size = new System.Drawing.Size(41, 25);
            this.btnRemoveGroup.TabIndex = 12;
            this.btnRemoveGroup.Text = "<-";
            this.btnRemoveGroup.UseVisualStyleBackColor = true;
            this.btnRemoveGroup.Click += new System.EventHandler(this.btnRemoveGroup_Click);
            // 
            // btnAddGroup
            // 
            this.btnAddGroup.Location = new System.Drawing.Point(132, 177);
            this.btnAddGroup.Name = "btnAddGroup";
            this.btnAddGroup.Size = new System.Drawing.Size(41, 25);
            this.btnAddGroup.TabIndex = 11;
            this.btnAddGroup.Text = "->";
            this.btnAddGroup.UseVisualStyleBackColor = true;
            this.btnAddGroup.Click += new System.EventHandler(this.btnAddGroup_Click);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(176, 140);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(53, 13);
            this.label6.TabIndex = 10;
            this.label6.Text = "To Ignore";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(6, 140);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(80, 13);
            this.label5.TabIndex = 9;
            this.label5.Text = "Existing Groups";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(40, 110);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(203, 16);
            this.label4.TabIndex = 8;
            this.label4.Text = "Translation groups to ignore";
            // 
            // lstBoxIgnore
            // 
            this.lstBoxIgnore.FormattingEnabled = true;
            this.lstBoxIgnore.Location = new System.Drawing.Point(179, 156);
            this.lstBoxIgnore.Name = "lstBoxIgnore";
            this.lstBoxIgnore.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.lstBoxIgnore.Size = new System.Drawing.Size(120, 108);
            this.lstBoxIgnore.TabIndex = 7;
            // 
            // lstBoxGroups
            // 
            this.lstBoxGroups.FormattingEnabled = true;
            this.lstBoxGroups.Location = new System.Drawing.Point(6, 156);
            this.lstBoxGroups.Name = "lstBoxGroups";
            this.lstBoxGroups.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.lstBoxGroups.Size = new System.Drawing.Size(120, 108);
            this.lstBoxGroups.TabIndex = 6;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(23, 78);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(72, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "Novel Author:";
            // 
            // txtBoxNovelAuthor
            // 
            this.txtBoxNovelAuthor.Location = new System.Drawing.Point(101, 75);
            this.txtBoxNovelAuthor.Name = "txtBoxNovelAuthor";
            this.txtBoxNovelAuthor.Size = new System.Drawing.Size(198, 20);
            this.txtBoxNovelAuthor.TabIndex = 5;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(6, 52);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(89, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "Novel Page Link:";
            // 
            // txtBoxNovelLink
            // 
            this.txtBoxNovelLink.Location = new System.Drawing.Point(101, 49);
            this.txtBoxNovelLink.Name = "txtBoxNovelLink";
            this.txtBoxNovelLink.Size = new System.Drawing.Size(198, 20);
            this.txtBoxNovelLink.TabIndex = 3;
            // 
            // groupBox1
            // 
            this.groupBox1.Location = new System.Drawing.Point(325, 13);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(332, 314);
            this.groupBox1.TabIndex = 3;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Output";
            // 
            // lstBoxLogs
            // 
            this.lstBoxLogs.FormattingEnabled = true;
            this.lstBoxLogs.Location = new System.Drawing.Point(12, 334);
            this.lstBoxLogs.Name = "lstBoxLogs";
            this.lstBoxLogs.Size = new System.Drawing.Size(645, 108);
            this.lstBoxLogs.TabIndex = 4;
            // 
            // formNoveJSONGenerator
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(666, 453);
            this.Controls.Add(this.lstBoxLogs);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.grpBoxNovelMeta);
            this.Name = "formNoveJSONGenerator";
            this.Text = "Novel Scraper JSON Generator";
            this.grpBoxNovelMeta.ResumeLayout(false);
            this.grpBoxNovelMeta.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtBoxNovelName;
        private System.Windows.Forms.GroupBox grpBoxNovelMeta;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtBoxNovelLink;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtBoxNovelAuthor;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ListBox lstBoxIgnore;
        private System.Windows.Forms.ListBox lstBoxGroups;
        private System.Windows.Forms.Button btnRemoveGroup;
        private System.Windows.Forms.Button btnAddGroup;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button btnGenJSON;
        private System.Windows.Forms.Button btnClear;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.ListBox lstBoxLogs;
    }
}

