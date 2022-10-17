using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TaskManager.Core;
using TaskManager.Core.Models;
using TaskManager.WebApi.Hubs;

namespace TaskManager.WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WorkController : ControllerBase
    {
        private readonly IWorkService _workService;
        private IHubContext<WorkHub, IWorkHubClient> _workHub;
        public WorkController(IWorkService workService, IHubContext<WorkHub, IWorkHubClient> workHub)
        {
            _workService = workService;
            _workHub = workHub;
        }

        [HttpGet]
        public IActionResult GetWorks()
        {
            var result = _workService.GetWorks();
            _workHub.Clients.All.SendWorksToUsers(result);
            return Ok(result);
        }

        [HttpGet("{id}", Name = "GetWork")]
        public IActionResult GetWork(string id)
        {
            return Ok(_workService.GetWork(id));
        }

        [HttpPost]
        public IActionResult AddWork(Work work)
        {
            _workService.AddWork(work);
            return CreatedAtRoute("GetWork", new { id = work.Id }, work);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWork(string id)
        {
            _workService.DeleteWork(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateWork(Work work)
        {
            var result = _workService.UpdateWork(work);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("Workers should have to claim maximum 2 tasks");
        }
    }
}
