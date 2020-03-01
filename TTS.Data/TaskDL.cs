using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TTS.Data.Common;
using TTS.Models;

namespace TTS.Data
{
    public class TaskDL : DataAccessBase
    {
        public bool AddTask(Task task)
        {
            bool isSuccess;

            try
            {
                Func<SqlCommand, bool> injector = cmd =>
                {
                    cmd.Parameters.Add("@Title", SqlDbType.VarChar).Value = task.Title;
                    cmd.Parameters.Add("@GroupId", SqlDbType.Int).Value = task.Group.Id;
                    cmd.Parameters.Add("@ParentId", SqlDbType.Int).Value = task.ParentId;
                    cmd.Parameters.Add("@DueDate", SqlDbType.DateTime).Value = task.DueDate;
                    cmd.Parameters.Add("@AssignTo", SqlDbType.VarChar).Value = task.AssignTo;
                    cmd.Parameters.Add("@CreatedUser", SqlDbType.VarChar).Value = task.CreatedUser;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = task.IsActive;

                    cmd.ExecuteReader();

                    return true;
                };
                return Data.SqlSpExecute("sp_Insert_Task", injector);
            }
            catch (Exception ex)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public bool UpdateTask(Task task)
        {
            bool isSuccess;

            try
            {
                Func<SqlCommand, bool> injector = cmd =>
                {
                    cmd.Parameters.Add("@TaskId", SqlDbType.VarChar).Value = task.Id;
                    //cmd.Parameters.Add("@GroupId", SqlDbType.Int).Value = task.Group.Id;
                    //cmd.Parameters.Add("@ParentId", SqlDbType.Int).Value = task.ParentId;
                    cmd.Parameters.Add("@DueDate", SqlDbType.DateTime).Value = task.DueDate;
                    cmd.Parameters.Add("@AssignTo", SqlDbType.VarChar).Value = task.AssignTo;
                    cmd.Parameters.Add("@StatusId", SqlDbType.Int).Value = task.Status.Id;
                    //cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = task.IsActive;

                    cmd.ExecuteReader();

                    return true;
                };
                return Data.SqlSpExecute("sp_Update_Task", injector);
            }
            catch (Exception ex)
            {
                isSuccess = false;
            }

            return isSuccess;
        }

        public List<Task> GetTasks(string assignedUser)
        {
            Func<SqlCommand, List<Task>> injector = cmd =>
            {
                cmd.Parameters.Add("@AssignedTo", SqlDbType.VarChar).Value = assignedUser;

                List<Task> tasks = new List<Task>();
                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        var task = new Task
                        {
                            Id = Convert.ToInt32(rdr["Id"]),
                            Title = rdr["Title"].ToString(),
                            ParentId = (rdr["ParentId"]) == DBNull.Value ? 0 : Convert.ToInt32(rdr["ParentId"]),
                            Group = new Group()
                            {
                                Id = (rdr["GroupId"]) == DBNull.Value ? 0 : Convert.ToInt32(rdr["GroupId"])
                            },
                            Status = new TaskStatus()
                            {
                                Name = rdr["Name"].ToString(),
                            },
                            AssignTo = rdr["AssignedTo"].ToString(),
                            //IsActive = (bool)rdr["IsActive"],
                            //CreatedUser = rdr["CreatedUser"].ToString(),
                            DueDate = rdr["Due_Date"] == DBNull.Value ? Convert.ToDateTime(null) : Convert.ToDateTime(rdr["Due_Date"]),
                            ExtendedDateCount = (rdr["DateExtendedCount"]) == DBNull.Value ? 0 : Convert.ToInt32(rdr["DateExtendedCount"])
                        };
                        tasks.Add(task);
                    }
                }

                return tasks;
            };
            return Data.SqlSpExecute("sp_GetAllTasks", injector);
        }
    }
}
