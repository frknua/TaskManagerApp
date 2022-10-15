using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<User> _users;

        private readonly IMongoCollection<Work> _works;

        public DbClient(IOptions<TaskManagerDbConfig> taskManagerDbConfig)
        {
            var client = new MongoClient(taskManagerDbConfig.Value.Connection_String);
            var database = client.GetDatabase(taskManagerDbConfig.Value.Database_Name);
            _users = database.GetCollection<User>(taskManagerDbConfig.Value.Users_Collection_Name);
            _works = database.GetCollection<Work>(taskManagerDbConfig.Value.Works_Collection_Name);
        }

        public IMongoCollection<User> GetUsersCollection() => _users;

        public IMongoCollection<Work> GetWorksCollection() => _works;
    }
}
