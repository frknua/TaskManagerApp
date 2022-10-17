using MongoDB.Driver;
using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public interface IDbClient
    {
        IMongoCollection<User> GetUsersCollection();
        IMongoCollection<Work> GetWorksCollection();
    }
}
