using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TTS.Data.Common
{
    public class DataAccessBase
    {
        public const string connectionString = "taskTrackerConnection";
        private SqlServerHelper _Data = new SqlServerHelper(connectionString);

        public SqlServerHelper Data { get { return _Data; } }
    }
}
