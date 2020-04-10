using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TTS.Data.Common;
using TTS.Models;

namespace TTS.Data
{
    public class TemplateDL : DataAccessBase
    {
        public Template AddTemplateDetails(Inititiative inititiative, Item item)
        {
            Func<SqlCommand, Template> injector = cmd =>
            {
                if(inititiative != null)
                {
                    cmd.Parameters.Add("@TMPLName", SqlDbType.VarChar).Value = "Initiaive";
                    cmd.Parameters.Add("@WorkGroupResponsibility", SqlDbType.VarChar).Value = inititiative.WorkGroupResponsibility;
                    cmd.Parameters.Add("@CoreGroupResponsibility", SqlDbType.VarChar).Value = inititiative.CoreGroupResponsibility;
                    cmd.Parameters.Add("@InitiativeWhyNotCarried", SqlDbType.VarChar).Value = inititiative.InitiativeWhyNotCarried;
                    cmd.Parameters.Add("@EstimatedCost", SqlDbType.VarChar).Value = inititiative.EstimatedCost;
                    cmd.Parameters.Add("@EstimatedRevenue", SqlDbType.VarChar).Value = inititiative.EstimatedRevenue;
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = inititiative.StartDate;
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = inititiative.EndDate;
                    cmd.Parameters.Add("@EffectiveFromDate", SqlDbType.DateTime).Value = inititiative.EffectiveFromDate;
                    cmd.Parameters.Add("@EffectiveToDate", SqlDbType.DateTime).Value = inititiative.EffectiveToDate;
                    cmd.Parameters.Add("@ProjectedDOC", SqlDbType.VarChar).Value = inititiative.ProjectedDOC;
                    cmd.Parameters.Add("@ProjectedNetRevenue", SqlDbType.VarChar).Value = inititiative.ProjectedNetRevenue;
                    cmd.Parameters.Add("@ProjectedContribution", SqlDbType.VarChar).Value = inititiative.ProjectedContribution;
                    cmd.Parameters.Add("@AchievedContribution", SqlDbType.VarChar).Value = inititiative.AchievedContribution;
                    cmd.Parameters.Add("@ExpectedAchievedContribution", SqlDbType.VarChar).Value = inititiative.ExpectedAchievedContribution;
                    cmd.Parameters.Add("@GAP", SqlDbType.VarChar).Value = inititiative.GAP;
                }
                else
                {
                    cmd.Parameters.Add("@TMPLName", SqlDbType.VarChar).Value = "Item";
                    cmd.Parameters.Add("@Details", SqlDbType.VarChar).Value = item.Details;
                }

                Template template = new Template();
                SqlDataReader rdr = cmd.ExecuteReader();
                if ((rdr.Read()))
                {
                    template.Id = Convert.ToInt32(rdr["id"]);
                }
                

                return template;
            };
            return Data.SqlSpExecute("sp_InsertTemplateRecord", injector);
        }

        public bool UpdateTemplateDetails(Template template, Inititiative inititiative)
        {
            bool isSuccess;

            try
            {
                Func<SqlCommand, bool> injector = cmd =>
                {
                    cmd.Parameters.Add("@InitiativeRecordId", SqlDbType.Int).Value = template.Id;
                    cmd.Parameters.Add("@WorkGroupResponsibility", SqlDbType.VarChar).Value = inititiative.WorkGroupResponsibility;
                    cmd.Parameters.Add("@CoreGroupResponsibility", SqlDbType.VarChar).Value = inititiative.CoreGroupResponsibility;
                    cmd.Parameters.Add("@InitiativeWhyNotCarried", SqlDbType.VarChar).Value = inititiative.InitiativeWhyNotCarried;
                    cmd.Parameters.Add("@ProjectedDOC", SqlDbType.VarChar).Value = inititiative.ProjectedDOC;
                    cmd.Parameters.Add("@EstimatedCost", SqlDbType.VarChar).Value = inititiative.EstimatedCost;
                    cmd.Parameters.Add("@EstimatedRevenue", SqlDbType.VarChar).Value = inititiative.EstimatedRevenue;
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = inititiative.StartDate;
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = inititiative.EndDate;
                    cmd.Parameters.Add("@EffectiveFromDate", SqlDbType.DateTime).Value = inititiative.EffectiveFromDate;
                    cmd.Parameters.Add("@EffectiveToDate", SqlDbType.DateTime).Value = inititiative.EffectiveToDate;
                    cmd.Parameters.Add("@ProjectedNetRevenue", SqlDbType.VarChar).Value = inititiative.ProjectedNetRevenue;
                    cmd.Parameters.Add("@ProjectedContribution", SqlDbType.VarChar).Value = inititiative.ProjectedContribution;
                    cmd.Parameters.Add("@AchievedContribution", SqlDbType.VarChar).Value = inititiative.AchievedContribution;
                    cmd.Parameters.Add("@ExpectedAchievedContribution", SqlDbType.VarChar).Value = inititiative.ExpectedAchievedContribution;
                    cmd.Parameters.Add("@GAP", SqlDbType.VarChar).Value = inititiative.GAP;

                    cmd.ExecuteReader();

                    return true;
                };
                return Data.SqlSpExecute("sp_Update_Initiative", injector);
            }
            catch (Exception ex)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public List<Template> GetTemplateDetailsByName(Group group)
        {
            Func<SqlCommand, List<Template>> injector = cmd =>
            {
                cmd.Parameters.Add("@TemplateName", SqlDbType.VarChar).Value = group.Template.Name;
                cmd.Parameters.Add("@TemplateRecordId", SqlDbType.VarChar).Value = group.Template.Id.ToString();

                DateTime date;
                List<Template> templates = new List<Template>();
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        var template = new Template
                        {
                            Item = rdr["Item"].ToString(),
                            Value = rdr["Value"].ToString(),

                            //IsActive = (bool)rdr["IsActive"],
                            //CreatedUser = rdr["CreatedUser"].ToString(),
                            //CreatedDate = (DateTime)rdr["CreatedDate"]
                        };
                        switch (template.Item)
                        {
                            case "start_date":
                                date = Convert.ToDateTime(template.Value); template.Value = date.ToString("MM/dd/yyyy");
                                break;
                            case "end_date":
                                date = Convert.ToDateTime(template.Value); template.Value = date.ToString("MM/dd/yyyy");
                                break;
                            case "effective_from_date":
                                date = Convert.ToDateTime(template.Value); template.Value = date.ToString("MM/dd/yyyy");
                                break;
                            case "effective_to_date":
                                date = Convert.ToDateTime(template.Value); template.Value = date.ToString("MM/dd/yyyy");
                                break;
                        }
                        templates.Add(template);
                    }
                }

                return templates;
            };
            return Data.SqlSpExecute("sp_GetTemplateDetailsByName", injector);
        }
    }
}
