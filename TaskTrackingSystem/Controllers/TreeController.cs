using Authentication;
using System.Collections.Generic;
using System.Web.Mvc;
using TTS.Models;

namespace TaskTrackingSystem.Controllers
{
    public class TreeController : Controller
    {
        ADService aDService = new ADService();
        GroupController groupController = new GroupController();
        TaskController taskController = new TaskController();

        [HttpGet]
        public JsonResult GetTree(string currentUser)
        {
            List<Task> tasks = taskController.GetTasks();
            List<Group> groups = groupController.GetGroups();
            IList<JsTreeModel> nodes = new List<JsTreeModel>();

            foreach (var item in groups)
            {
                nodes.Add(new JsTreeModel
                {
                    id = "G" + item.Id.ToString(),
                    parent = item.ParentId == 0 ? "#" : "G" + item.ParentId.ToString(),
                    text = item.Title,
                    icon = item.Template.Name == "" ? "fa fa-ravelry" : "fa fa-list",
                    //addbutton = "<button id="+ item.Id + "> <i class='fa fa-plus'></i></button>"
                    templateName = item.Template.Name,
                    templateId = item.Template.Id.ToString()
                });
            }

            foreach (var item in tasks)
            {
                if (aDService.getFullName(item.AssignTo.ToString()) != "")
                {
                    item.AssignTo = aDService.getFullName(item.AssignTo.ToString());
                }
                nodes.Add(new JsTreeModel
                {
                    id = "T" + item.Id.ToString(),
                    parent = item.Group.Id == 0 ? "T" + item.ParentId.ToString() : "G" + item.Group.Id.ToString(),
                    text = item.Title,
                    icon = "fa fa-file-text",
                    data = new JsTreeTableModel
                    {
                        assignedTo = item.AssignTo.ToString(),
                        due_Date = (item.DueDate.ToString() == "1/1/0001 12:00:00 AM") ? "" : item.DueDate.ToString("MM/dd/yyyy"),
                        status = item.Status.Name.ToString(),
                        exdended_date_count = item.ExtendedDateCount == 0 ? null : item.ExtendedDateCount.ToString()
                    }
                });
            }
            return Json(nodes, JsonRequestBehavior.AllowGet);
        }
    }
}