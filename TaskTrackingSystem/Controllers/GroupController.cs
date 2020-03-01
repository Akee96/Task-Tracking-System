using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using TTS.Business;
using TTS.Models;

namespace TaskTrackingSystem.Controllers
{
    public class GroupController : Controller
    {
        private GroupBL groupBL = new GroupBL();
       
        public JsonResult AddGroup(Group group, Inititiative inititiative)
        {
            bool isSuccess = false;
            TemplateController templateController = new TemplateController();
            Template template = null;
            if (inititiative != null)
            {
                template = templateController.AddTemplateDetails(inititiative);
                if (template.Id != 0)
                {
                    group.Template.Id = template.Id;
                    if (groupBL.AddGroup(group))
                    {
                        isSuccess = true;
                    }
                }
                
            }
            else
            {
                if (groupBL.AddGroup(group))
                {
                    isSuccess = true;
                }
            }

            return Json(isSuccess);
        }

        public List<Group> GetGroups(int Id)
        {
            return groupBL.GetGroups(Id);
        }
    }
}