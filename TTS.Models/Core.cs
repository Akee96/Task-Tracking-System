using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTS.Models
{
    public class Core
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string Title { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CurrentUser { get; set; }
        public bool IsActive { get; set; }
    }
}