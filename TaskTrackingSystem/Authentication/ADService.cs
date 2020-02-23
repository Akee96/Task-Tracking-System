using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;

namespace Authentication
{
    public class ADService
    {
        /// <summary>
        /// Get fullname from AD
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public string getFullName(string userid)
       {
            
            StringBuilder fullName = new StringBuilder();
            try
            {
                //userid = "UL\\SP7403";
                DirectoryEntry UpdateDE = new DirectoryEntry("LDAP://srilankan.corp", "SP7401", "Airnut@456");
                //DirectoryEntry UpdateDE = new DirectoryEntry("LDAP://srilankan.corp");
                DirectorySearcher dirSearcher = new DirectorySearcher(UpdateDE);
                dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(SAMAccountName=" + userid + "))";
                dirSearcher.SearchScope = SearchScope.Subtree;
                SearchResult searchResults = dirSearcher.FindOne();       

                //Log4NetLogger.Info("search result");
                //Log4NetLogger.Info(searchResults);

                if (searchResults != null)
                {
                    DirectoryEntry dirEntryResults = new DirectoryEntry(searchResults.Path);
                    //if (searchResults.GetDirectoryEntry().Properties["givenName"].Value != null || searchResults.GetDirectoryEntry().Properties["sn"].Value != null)
                    //    fullName.Append(searchResults.GetDirectoryEntry().Properties["givenName"].Value.ToString()).Append(" ").Append(searchResults.GetDirectoryEntry().Properties["sn"].Value.ToString());

                    if (searchResults.GetDirectoryEntry().Properties["givenName"].Value != null)
                    {
                        fullName = fullName.Append(searchResults.GetDirectoryEntry().Properties["givenName"].Value.ToString()).Append(" ");
                    }
                    if(searchResults.GetDirectoryEntry().Properties["sn"].Value != null)
                    {
                        fullName.Append(searchResults.GetDirectoryEntry().Properties["sn"].Value.ToString());
                    }
                          
                }
                //Log4NetLogger.Info(fullName);
                
            }
            catch (Exception ex)
            {
                //Log4NetLogger.Info("exp");
                //Log4NetLogger.Error("Error : " + System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, ex);

                return string.Empty;

            }
            //Log4NetLogger.Error(fullName.ToString());
            return fullName.ToString();
        }



        /// <summary>
        /// Get Email From AD
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public string getEmailAddress(string userid)
        {
            string email = string.Empty;
            try
            {
                DirectoryEntry UpdateDE = new DirectoryEntry();
                DirectorySearcher dirSearcher = new DirectorySearcher(UpdateDE);
                dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(SAMAccountName=" + userid + "))";
                dirSearcher.SearchScope = SearchScope.Subtree;
                SearchResult searchResults = dirSearcher.FindOne();

                if (searchResults != null)
                {
                    DirectoryEntry dirEntryResults = new DirectoryEntry(searchResults.Path);
                    if (searchResults.GetDirectoryEntry().Properties["mail"].Value != null)
                        email = searchResults.GetDirectoryEntry().Properties["mail"].Value.ToString();
                }
            }
            catch (Exception f)
            {
                return string.Empty;

            }
            return email;
        }

        /// <summary>
        /// Get Active Directory Details
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public string[] getADDetails(string userid)
        {
            string officeNo = string.Empty;
            string mobileNo = string.Empty;
            string officeext = string.Empty;
            string personalEmail = string.Empty;
            string personalNo = string.Empty;
           
            var ADres = new string[5];
            try
            {
                //DirectoryEntry UpdateDE = new DirectoryEntry(ConfigurationManager.AppSettings["ADDomain"], ConfigurationManager.AppSettings["ADAuthUser"], ConfigurationManager.AppSettings["ADAuthPass"]);
                DirectoryEntry UpdateDE = new DirectoryEntry();

                DirectorySearcher dirSearcher = new DirectorySearcher(UpdateDE);
                dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(SAMAccountName=" + userid + "))";
                dirSearcher.SearchScope = SearchScope.Subtree;
                SearchResult searchResults = dirSearcher.FindOne();

                if (searchResults != null)
                {
                    DirectoryEntry dirEntryResults = new DirectoryEntry(searchResults.Path);
                    if (searchResults.GetDirectoryEntry().Properties["telephoneNumber"].Value != null)
                    {
                        officeNo = searchResults.GetDirectoryEntry().Properties["telephoneNumber"].Value.ToString();
                        ADres[0] = (officeNo.Contains("+94") == true) ? officeNo.Replace("+94", "0") : officeNo;
                    }
                    if (searchResults.GetDirectoryEntry().Properties["Mobile"].Value != null)
                    {
                        ADres[1] = searchResults.GetDirectoryEntry().Properties["Mobile"].Value.ToString().Trim();
                        //ADres[1] = (mobileNo.Contains("+94") == true) ? mobileNo.Replace("+94", "0") : mobileNo;
                    }

                    if (searchResults.GetDirectoryEntry().Properties["mail"].Value != null)
                    {
                        ADres[2] = searchResults.GetDirectoryEntry().Properties["mail"].Value.ToString();
                    }

                    if (searchResults.GetDirectoryEntry().Properties["telephoneNumber"].Value != null)
                    {
                        ADres[3] = searchResults.GetDirectoryEntry().Properties["telephoneNumber"].Value.ToString();
                        
                    }
                }               
            }
            catch (Exception ex)
            {
                //Log4NetLogger.Error("Error : " + System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, ex);
                return null;

            }
            return ADres;
        }
    }
}
