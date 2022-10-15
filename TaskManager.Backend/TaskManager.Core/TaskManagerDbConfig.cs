using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Core
{
    public class TaskManagerDbConfig
    {
        public string Database_Name { get; set; }
        public string Users_Collection_Name { get; set; }
        public string Works_Collection_Name { get; set; }
        public string Connection_String { get; set; }
    }
}
