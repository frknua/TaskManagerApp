using Microsoft.AspNetCore.SignalR;
using TaskManager.Core.Models;
using TaskManager.WebApi.Hub;

namespace TaskManager.WebApi.Hubs
{
    public interface IWorkHubClient
    {
        Task SendWorksToUsers(List<Work> works);
    }
}
