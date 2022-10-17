using MongoDB.Driver;
using TaskManager.Core.Models;

namespace TaskManager.Core
{
    public class WorkServices : IWorkService
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
            var userWorks = GetWorksByUserId(work.Owner.UserId);
            if (userWorks.Count() < 2)
            {
                _works.ReplaceOne(b => b.Id == work.Id, work);
                return work;
            }
            return null;
        }

        public List<Work> GetWorksByUserId(string userId)
        {
            return _works.Find(works => true && works.Owner.UserId == userId).ToList();
        }
    }
}
