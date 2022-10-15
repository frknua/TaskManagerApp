using Microsoft.AspNetCore.Mvc;
using TaskManager.Core;

namespace TaskManager.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userServices.GetUsers());
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetUser(string id)
        {
            return Ok(_userServices.GetUser(id));
        }
    }
}