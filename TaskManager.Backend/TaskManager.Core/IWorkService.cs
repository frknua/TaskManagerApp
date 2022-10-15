using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public interface IWorkService
    {
        List<Work> GetWorks();
        Work GetWork(string id);
        Work AddWork(Work work);
        void DeleteWork(string id);
        Work UpdateWork(Work work);
    }
}
