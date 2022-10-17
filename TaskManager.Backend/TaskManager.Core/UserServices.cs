using MongoDB.Driver;
using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public class UserServices : IUserServices
    {
        private readonly IMongoCollection<User> _users;
        public UserServices(IDbClient dbClient)
        {
            _users = dbClient.GetUsersCollection();
        }
        public User GetUser(User user) => _users.Find(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();

        public List<User> GetUsers() => _users.Find(user => true).ToList();
    }
}
