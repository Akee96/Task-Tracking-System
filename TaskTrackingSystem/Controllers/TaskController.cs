using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TTS.Business;
using TTS.Models;

namespace TaskTrackingSystem.Controllers
{
    public class TaskController : Controller
    {
        private TaskBL taskBL = new TaskBL();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult AddTask(Task task)
        {
            return Json(taskBL.AddTask(task));
        }
        public JsonResult UpdateTask(Task task)
        {
            return Json(taskBL.UpdateTask(task));
        }

        public List<Task> GetTasks(string assignedUser)
        {
            return taskBL.GetTasks(assignedUser);
        }
    }
}