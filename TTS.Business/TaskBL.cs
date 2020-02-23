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

        public List<Task> GetTasks()
        {
            return taskDL.GetTasks();
        }
    }
}
