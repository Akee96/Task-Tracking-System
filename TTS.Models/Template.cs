using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTS.Models
{
    public class Template : Core
    {
        public string Name { get; set; }
        public string Item { get; set; }
        public string Value { get; set; }
    }

    public class Inititiative
    {
        public string WorkGroupResponsibility { get; set; }
        public string CoreGroupResponsibility { get; set; }
        public string ProjectedDOC { get; set; }
        public string ProjectedNetRevenue { get; set; }
        public string InitiativeWhyNotCarried { get; set; }
        public string ProjectedContribution { get; set; }
        public string ExpectedAchievedContribution { get; set; }
        public string AchievedContribution { get; set; }
        public string GAP { get; set; } 
    }
}