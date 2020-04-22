using Authentication;
using SLA_Authentication_DLL;
using System;
using System.Data;
using System.Web.Mvc;

namespace TaskTrackingSystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Welcome to Task Tracking System";

            //var currentUserServer = (Request.ServerVariables["LOGON_USER"]) != "" ? Request.ServerVariables["LOGON_USER"] : System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            //var loggedUser = currentUserServer.Substring(currentUserServer.LastIndexOf("\\", StringComparison.Ordinal) + 1).ToUpper();

            //if (loggedUser != "")
            //{
            //    var role = new clsRole();
            //    DataTable dt = role.getUserRolesforApplication(loggedUser, "TTS");

            //    if (dt != null && dt.Rows.Count > 0)
            //    {
            //        var Role = dt.Rows[0][1].ToString();
            //    }
            //    else
            //    {
            //        return RedirectToAction("Unauthorized", "Home");
            //    }
            //}
            //else
            //{
            //    return RedirectToAction("Unauthorized", "Home");
            //}

            return View();
        }

        public ActionResult Unauthorized()
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