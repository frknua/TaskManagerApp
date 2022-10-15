﻿using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Core
{
    public interface IDbClient
    {
        IMongoCollection<User> GetUsersCollection();
    }
}
