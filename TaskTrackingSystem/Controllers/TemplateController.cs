using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTS.Business;
using TTS.Models;

namespace TaskTrackingSystem.Controllers
{
    public class TemplateController : Controller
    {
        private TemplateBL templateBL = new TemplateBL();
        public Template AddTemplateDetails(Inititiative inititiative)
        {
            return templateBL.AddTemplateDetails(inititiative);
        }

        [HttpPost]
        public JsonResult GetTemplateDetailsByName(Group group)
        {
            return Json(templateBL.GetTemplateDetailsByName(group));
        }
    }
}