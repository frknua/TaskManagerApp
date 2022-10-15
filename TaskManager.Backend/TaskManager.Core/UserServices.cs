using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public User GetUser(string id) => _users.Find(user => user.Id == id).First();

        public List<User> GetUsers() => _users.Find(user => true).ToList();
    }
}
