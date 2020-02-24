using System;
using System.Collections.Generic;
using System.Linq;
using TTS.Data;
using TTS.Models;

namespace TTS.Business
{
    public class TaskBL
    {
        private TaskDL taskDL = new TaskDL();

        public bool AddTask(Task task)
        {
            return taskDL.AddTask(task);
        }
        public bool UpdateTask(Task task)
        {
            return taskDL.UpdateTask(task);
        }

        public List<Task> GetTasks()
        {
            return taskDL.GetTasks();
        }
    }
}
