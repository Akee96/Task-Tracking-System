using System.Web.Mvc;
using TTS.Business;
using TTS.Models;

namespace TaskTrackingSystem.Controllers
{
    public class TemplateController : Controller
    {
        private TemplateBL templateBL = new TemplateBL();
        public Template AddTemplateDetails(Inititiative inititiative, Item item)
        {
            return templateBL.AddTemplateDetails(inititiative, item);
        }

        public JsonResult UpdateTemplateDetails(Template template, Inititiative inititiative)
        {
            return Json(templateBL.UpdateTemplateDetails(template, inititiative));
        }

        [HttpPost]
        public JsonResult GetTemplateDetailsByName(Group group)
        {
            return Json(templateBL.GetTemplateDetailsByName(group));
        }
    }
}