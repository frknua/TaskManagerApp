using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public interface IUserServices
    {
        List<User> GetUsers();
        User GetUser(User user);
    }
}
