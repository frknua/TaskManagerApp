using TaskManager.Core.Models;

namespace TaskManager.WebApi.Hubs
{
    public interface IWorkHubClient
    {
        Task SendWorksToUsers(List<Work> works);
    }
}
