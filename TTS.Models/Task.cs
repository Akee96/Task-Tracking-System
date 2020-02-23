using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTS.Models
{
    public class Task : Core
    {
        public Group Group { get; set; }
        public DateTime DueDate { get; set; }
        public string AssignTo { get; set; }
        public TaskStatus Status { get; set; }
        public int ExtendedDateCount { get; set; }
    }
}