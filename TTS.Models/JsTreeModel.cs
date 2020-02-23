﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TTS.Models
{
    public class JsTreeModel
    {
        public string id { get; set; }
        public string parent { get; set; }
        public string text { get; set; }
        public JsTreeTableModel data { get; set; }
        public string icon { get; set; }
        public string addbutton { get; set; }
        public string templateName { get; set; }
        public string templateId { get; set; }
        //public string state { get; set; }
        //public bool opened { get; set; }
        //public bool disabled { get; set; }
        //public bool selected { get; set; }
        //public string li_attr { get; set; }
        //public string a_attr { get; set; }
    }

    public class JsTreeTableModel
    {
        public string assignedTo { get; set; }
        public string due_Date { get; set; }
        public string status { get; set; }
        public string exdended_date_count { get; set; }
    }
}
