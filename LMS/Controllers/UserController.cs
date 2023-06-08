using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
namespace LMS.Controllers
{
    
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUser _user;
        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpGet]
        [Route("api/GetUsers")]
        public async Task<IEnumerable<UserViewModel>> GetUsers()
        {

            return await _user.GetUsers();
        }

        [HttpGet]
        [Route("api/GetRoles")]
        public async Task<IEnumerable<Role>> GetRoles()
        {

            return await _user.GetRoles();
        }




        [HttpPost]
        [Route("api/SaveUser")]
        public async Task<Result> SaveUser(User user)
        {
            try
            {
                return await _user.SaveUser(user);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
