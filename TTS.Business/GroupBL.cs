using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TTS.Data;
using TTS.Models;

namespace TTS.Business
{
    public class GroupBL
    {
        private GroupDL groupDL = new GroupDL();

        public bool AddGroup(Group group)
        {
            return groupDL.AddGroup(group);
        }

        public List<Group> GetGroups()
        {
            return groupDL.GetGroups();
        }
    }
}