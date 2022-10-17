using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public interface IWorkService
    {
        List<Work> GetWorks();
        List<Work> GetWorksByUserId(string userId);
        Work GetWork(string id);
        Work AddWork(Work work);
        void DeleteWork(string id);
        Work UpdateWork(Work work);
    }
}
