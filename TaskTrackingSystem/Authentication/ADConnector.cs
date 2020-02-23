using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.DirectoryServices;

namespace Authentication
{
    public class ADConnector
    {
        DirectoryEntry UpdateDE;
        DirectorySearcher dirSearcher;

        public ADConnector()
        {
            //UpdateDE = new DirectoryEntry();
            DirectoryEntry UpdateDE = new DirectoryEntry("LDAP://srilankan.corp", "SP7401", "Airnut@456");
            dirSearcher = new DirectorySearcher(UpdateDE);
        }

        public List<String> getSMTStaffList()
        {
            DirectoryEntry DeptManagerGroupLocal = new DirectoryEntry("LDAP://CN=Departmental Managers - Local,OU=Groups,OU=CAK,DC=srilankan,DC=corp");
            DirectoryEntry DeptManagerGroupOverseas = new DirectoryEntry("LDAP://CN=Departmental Managers - Overseas,OU=Groups,OU=CAK,DC=srilankan,DC=corp");
            DirectoryEntry OtherManagers = new DirectoryEntry("LDAP://CN=Veritas_Agreement_Approvers,OU=Groups,OU=CAK,DC=srilankan,DC=corp");

            List<String> staffIdList = new List<string>();

            foreach (object dn in DeptManagerGroupLocal.Properties["member"])
            {
                String[] items = dn.ToString().Split(',');
                String name = items[0].Split('=')[1];
                staffIdList.Add(GetStaffIDAndName(name));
            }
            foreach (object dn in DeptManagerGroupOverseas.Properties["member"])
            {
                String[] items = dn.ToString().Split(',');
                String name = items[0].Split('=')[1];
                staffIdList.Add(GetStaffIDAndName(name));
            }
            foreach (object dn in OtherManagers.Properties["member"])
            {
                String[] items = dn.ToString().Split(',');
                String name = items[0].Split('=')[1];
                staffIdList.Add(GetStaffIDAndName(name));
            }
            return staffIdList;
        }

        public List<String> getGroupStaffList(string groupName)
        {
            DirectoryEntry DeptManagerGroupLocal = new DirectoryEntry("LDAP://CN="+groupName+",OU=Groups,OU=CAK,DC=srilankan,DC=corp");
            List<String> staffIdList = new List<string>();

            foreach (object dn in DeptManagerGroupLocal.Properties["member"])
            {
                String[] items = dn.ToString().Split(',');
                String name = items[0].Split('=')[1];
                staffIdList.Add(GetStaffIDAndName(name));
            }
            
            return staffIdList;
        }

        public String GetStaffIDAndName(String name)
        {
            
            String staffId = "";
            dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(name=" + name + "))";
            dirSearcher.SearchScope = SearchScope.Subtree;
            SearchResult searchResults = dirSearcher.FindOne();
            if (searchResults != null)
            {
                DirectoryEntry dirEntryResults = new DirectoryEntry(searchResults.Path);
                if (searchResults.GetDirectoryEntry().Properties["SAMAccountName"].Value != null)
                {
                    staffId = searchResults.GetDirectoryEntry().Properties["SAMAccountName"].Value.ToString();
                }
                return (formatString(staffId, name));
            }
            return staffId;
        }

        //Signatories filter from Tender Board values
        //20th January 2015
        public String GetName(String designation)
        {
            String staffName = "";
            String staffID = "";
            dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(title=" + designation + "))";
            dirSearcher.SearchScope = SearchScope.Subtree;
            SearchResult searchResults = dirSearcher.FindOne();
            if (searchResults != null)
            {
                DirectoryEntry dirEntryResults = new DirectoryEntry(searchResults.Path);
                if (searchResults.GetDirectoryEntry().Properties["displayName"].Value != null)
                {
                    staffName = searchResults.GetDirectoryEntry().Properties["displayName"].Value.ToString();
                }
                if (searchResults.GetDirectoryEntry().Properties["SAMAccountName"].Value != null)
                {
                    staffID = searchResults.GetDirectoryEntry().Properties["SAMAccountName"].Value.ToString();
                }
                return (formatString(staffID, staffName));
            }
            return (formatString(staffID, staffName));
        }

        public  String ADQueary()
        {
            String staffId = "";
            dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(name=Nalaka))";
            dirSearcher.SearchScope = SearchScope.Subtree;
            SearchResult searchResults = dirSearcher.FindOne();
            if (searchResults != null)
            {
                DirectoryEntry dirEntryResults = new DirectoryEntry(searchResults.Path);
                if (searchResults.GetDirectoryEntry().Properties["OU"].Value != null)
                {
                    staffId = searchResults.GetDirectoryEntry().Properties["OU"].Value.ToString();
                }
                
            }
            return staffId;
        }
        private String formatString(String staffID, String name)
        {
            for (int i = 0; i < (5 - staffID.Length); i++)
            {
                staffID += " ";
            }
            return staffID + " : " + name;
        }
    }
}
