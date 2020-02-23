using Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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

            //if(currentUser != null)
            //{
            //    foreach (var taskItem in tasks)
            //    {
            //        if (taskItem.AssignTo.ToString() == "SP7403")
            //        {
            //            if (taskItem.Group.Id != 0)
            //            {
            //                foreach (var groupItem in groups)
            //                {
            //                    if (groupItem.Id == taskItem.Group.Id)
            //                    {
            //                        nodes.Add(new JsTreeModel
            //                        {
            //                            id = "G" + groupItem.Id.ToString(),
            //                            parent = groupItem.ParentId == 0 ? "#" : "G" + groupItem.ParentId.ToString(),
            //                            text = groupItem.Title,
            //                            icon = groupItem.Template.Name == "" ? "fa fa-ravelry" : "fa fa-list",
            //                            //addbutton = "<button id="+ item.Id + "> <i class='fa fa-plus'></i></button>"
            //                            templateName = groupItem.Template.Name,
            //                            templateId = groupItem.Template.Id.ToString()
            //                        });
            //                    }

                                
            //                }
            //            }
            //            nodes.Add(new JsTreeModel
            //            {
            //                id = "T" + taskItem.Id.ToString(),
            //                parent = taskItem.Group.Id == 0 ? "T" + taskItem.ParentId.ToString() : "G" + taskItem.Group.Id.ToString(),
            //                text = taskItem.Title,
            //                icon = "fa fa-file-text",
            //                data = new JsTreeTableModel
            //                {
            //                    assignedTo = taskItem.AssignTo.ToString(),
            //                    due_Date = (taskItem.DueDate.ToString() == "1/1/0001 12:00:00 AM") ? "" : taskItem.DueDate.ToString("dd/MM/yyyy"),
            //                    status = taskItem.Status.Name.ToString(),
            //                    exdended_date_count = taskItem.ExtendedDateCount == 0 ? null : taskItem.ExtendedDateCount.ToString()
            //                }
            //            });
            //        }
            //    }
            //}
            //else
            //{
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
                            due_Date = (item.DueDate.ToString() == "1/1/0001 12:00:00 AM") ? "" : item.DueDate.ToString("dd/MM/yyyy"),
                            status = item.Status.Name.ToString(),
                            exdended_date_count = item.ExtendedDateCount == 0 ? null : item.ExtendedDateCount.ToString()
                        }
                    });
                }
            //}
 
            return Json(nodes, JsonRequestBehavior.AllowGet);
        }
    }
}