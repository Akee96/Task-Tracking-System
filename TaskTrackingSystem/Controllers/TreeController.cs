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
        IList<JsTreeModel> nodes = new List<JsTreeModel>();
        [HttpPost]
        public JsonResult GetTree(string currentUser)
        {
            if (currentUser != null)
            {
                List<Task> tasks = taskController.GetTasks(currentUser);
                List<Group> groups;

                foreach (var itemT in tasks)
                {
                    if (itemT.Group.Id != 0)
                    {
                        groups = groupController.GetGroups(itemT.Group.Id);

                        foreach (var itemG in groups)
                        {
                            if (!IsIdExsist("G" + itemG.Id.ToString()))
                            {
                                nodes.Add(new JsTreeModel

                                {
                                    id = "G" + itemG.Id.ToString(),
                                    parent = itemG.ParentId == 0 ? "#" : "G" + itemG.ParentId.ToString(),
                                    text = itemG.Title,
                                    icon = itemG.Template.Name == "" ? "fa fa-ravelry" : "fa fa-list",
                                    //addbutton = "<button id="+ item.Id + "> <i class='fa fa-plus'></i></button>"
                                    templateName = itemG.Template.Name,
                                    templateId = itemG.Template.Id.ToString()
                                });
                            }
                        }
                    }
                }

                foreach (var item in tasks)
                {
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
                            exdended_date_count = item.ExtendedDateCount == 0 ? null : item.ExtendedDateCount.ToString(),
                            username = aDService.getFullName(item.AssignTo.ToString()),
                            actual_cost = item.ActualCost.ToString()
                        }
                    });
                }
            }
            else
            {
                List<Task> tasks = taskController.GetTasks(null);
                List<Group> groups = groupController.GetGroups(0);

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
                            exdended_date_count = item.ExtendedDateCount == 0 ? null : item.ExtendedDateCount.ToString(),
                            username = aDService.getFullName(item.AssignTo.ToString()),
                            actual_cost = item.ActualCost.ToString()
                        }
                    });
                }
            }
            return Json(nodes, JsonRequestBehavior.AllowGet);
        }

        public bool IsIdExsist(string id)
        {
            bool isFound = false;
            foreach (var item in nodes)
            {
                if (item.id == id)
                {
                    isFound = true;
                    break;
                }
            }
            return isFound;
        }
    }
}