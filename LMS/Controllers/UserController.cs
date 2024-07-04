using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json.Linq;

namespace LMS.Controllers
{
    
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUser _user;
        public IProperty _property;
        public readonly AppSettings _appSettings;
        public UserController(IUser user, IProperty property, AppSettings appSettings)
        {
            _user = user;
            _appSettings = appSettings;
            _property = property;
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
        [Route("api/ValidateOTP")]
        public async Task<IActionResult> ValidateOTP(User user)
        {
            try
            {
                var userData = await _user.ValidateOTP(user);
                if (userData != null)
                {
                    var authClaims = new List<Claim>
                    {
                    new Claim(ClaimTypes.Name, Convert.ToString(user.UserId)),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                    authClaims.Add(new Claim(ClaimTypes.Role, userData.RoleName));
                    var token = GetToken(authClaims);

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        userData = userData
                    });
                }
                return Ok("Invalid OTP");
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("api/SaveUser")]
        public async Task<Result> SaveUser(User user)
        {
            try
            {
                return await _user.SaveUser(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("api/GetProperties")]
        public async Task<IEnumerable<PropertyModel>> GetProperties(LocationModel location)
        {
            return await _property.GetProperties(location);
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.TSecret));

            var token = new JwtSecurityToken(
                issuer: _appSettings.ValidIssuer,
                audience: _appSettings.ValidAudience,
                expires: DateTime.Now.AddYears(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
