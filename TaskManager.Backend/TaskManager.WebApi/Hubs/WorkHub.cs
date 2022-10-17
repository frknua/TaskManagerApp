using Microsoft.AspNetCore.SignalR;
using TaskManager.Core.Models;

namespace TaskManager.WebApi.Hubs
{
    public class WorkHub : Hub<IWorkHubClient>
    {
        public async Task SendWorksToUsers(List<Work> works)
        {
            await Clients.All.SendWorksToUsers(works);
        }
    }
}
