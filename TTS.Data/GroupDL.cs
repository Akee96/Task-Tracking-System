using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TTS.Data.Common;
using TTS.Models;

namespace TTS.Data
{
    public class GroupDL : DataAccessBase
    {
        public bool AddGroup(Group group)
        {
            bool isSuccess;

            try
            {
                Func<SqlCommand, bool> injector = cmd =>
                {
                    cmd.Parameters.Add("@Title", SqlDbType.VarChar).Value = group.Title;
                    cmd.Parameters.Add("@ParentId", SqlDbType.Int).Value = group.ParentId;
                    cmd.Parameters.Add("@TemplateName", SqlDbType.VarChar).Value = group.Template.Name;
                    cmd.Parameters.Add("@TemplateRecordId", SqlDbType.Int).Value = group.Template.Id;
                    cmd.Parameters.Add("@CreatedUser", SqlDbType.VarChar).Value = group.CreatedUser;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = group.IsActive = true;

                    cmd.ExecuteReader();

                    return true;
                };
                return Data.SqlSpExecute("sp_Insert_Group", injector);
            }
            catch (Exception ex)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public List<Group> GetGroups()
        {
            Func<SqlCommand, List<Group>> injector = cmd =>
            {
                List<Group> groups = new List<Group>();
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        var group = new Group
                        {
                            Id = Convert.ToInt32(rdr["Id"]),
                            Title = rdr["Title"].ToString(),
                            ParentId = (rdr["ParentId"]) == DBNull.Value ? 0 : Convert.ToInt32(rdr["ParentId"]),
                            Template = new Template()
                            {
                                Name = (rdr["TemplateName"]) == DBNull.Value ? "" : (rdr["TemplateName"]).ToString(),
                                Id = (rdr["TemplateRecordId"]) == DBNull.Value ? 0 : Convert.ToInt32(rdr["TemplateRecordId"])
                            }
                            //IsActive = (bool)rdr["IsActive"],
                            //CreatedUser = rdr["CreatedUser"].ToString(),
                            //CreatedDate = (DateTime)rdr["CreatedDate"]
                        };
                        groups.Add(group);
                    }
                }

                return groups;
            };
            return Data.SqlSpExecute("sp_GetAllGroups", injector);
        }
    }
}