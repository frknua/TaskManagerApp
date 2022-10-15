using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Core
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<User> _users;
        public DbClient(IOptions<TaskManagerDbConfig> taskManagerDbConfig)
        {
            var client = new MongoClient(taskManagerDbConfig.Value.Connection_String);
            var database = client.GetDatabase(taskManagerDbConfig.Value.Database_Name);
            _users = database.GetCollection<User>(taskManagerDbConfig.Value.Users_Collection_Name);
        }
        public IMongoCollection<User> GetUsersCollection() => _users;
    }
}
