using Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TaskTrackingSystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetFullName(string userid)
        {
            ADService aDService = new ADService();
            return Json(aDService.getFullName(userid));
        }
    }
}