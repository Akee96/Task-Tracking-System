using Authentication;
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