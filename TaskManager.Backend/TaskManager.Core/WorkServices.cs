using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public class WorkServices: IWorkService
    {
        private readonly IMongoCollection<Work> _works;
        public WorkServices(IDbClient dbClient)
        {
            _works = dbClient.GetWorksCollection();
        }

        public Work GetWork(string id) => _works.Find(works => works.Id == id).First();

        public List<Work> GetWorks() => _works.Find(works => true).ToList();

        public Work AddWork(Work work)
        {
            _works.InsertOne(work);
            return work;
        }

        public void DeleteWork(string id)
        {
            _works.DeleteOne(work => work.Id == id);
        }

        public Work UpdateWork(Work work)
        {
            GetWork(work.Id);
            _works.ReplaceOne(b => b.Id == work.Id, work);
            return work;
        }
    }
}
