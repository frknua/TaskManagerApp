using Microsoft.AspNetCore.Mvc;
using TaskManager.Core;
using TaskManager.Core.Models;

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

        /// <summary>
        /// Returns all users.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userServices.GetUsers());
        }

        [HttpPost]
        public IActionResult GetUser(User user)
        {
            return Ok(_userServices.GetUser(user));
        }
    }
}