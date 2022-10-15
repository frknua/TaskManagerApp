using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Core;
using TaskManager.Core.Models;

namespace TaskManager.WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WorkController : ControllerBase
    {
        private readonly IWorkService _workService;
        public WorkController(IWorkService workService)
        {
            _workService = workService;
        }

        [HttpGet]
        public IActionResult GetWorks()
        {
            return Ok(_workService.GetWorks());
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
            return Ok(_workService.UpdateWork(work));
        }
    }
}
