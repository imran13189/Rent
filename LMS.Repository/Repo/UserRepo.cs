using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

using LMS.Core.Entities;
using LMS.Core.Interfaces;
using System.Reflection;

namespace LMS.Repo.Repository
{
    public class UserRepo: BaseRepository,IUser
    {
        public readonly AppSettings _appSettings;
        public UserRepo(AppSettings appSettings) {
            _appSettings = appSettings;
        }
        public async Task<IEnumerable<UserViewModel>> GetUsers()
        {
            return await Query<UserViewModel>("SP_GetUsers");
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {
            try
            {
                return await Query<Role>("SP_GetRoles");
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public async Task<Result> SaveInventory(Inventory inventory)
        //{
        //    return await QueryFirstOrDefaultAsync<Result>("SP_SaveInventory", inventory);
        //}

        //public async Task<IEnumerable<InventoryModel>> GetInventories()
        //{
        //    return await Query<InventoryModel>("SP_GetInventory");
        //}

        public async Task<Result> SaveUser(User user)
        {
            UserResult result =await QueryFirstOrDefaultAsync<UserResult>("SP_SaveUser",new {UserId=0, Mobile=user.Mobile});
            return await SentEmail(result.OTP);
        }

      
        public async Task<Result> SentEmail(string OTP)
        {
            try
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress("aliusman9760@gmail.com");
                message.To.Add("imran13189@gmail.com");
                message.Subject = "OTP Verification #";
                message.IsBodyHtml = true;
                message.Body = "<div>"+OTP+"</div>";

                SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential(_appSettings.Email, _appSettings.Secret),
                    EnableSsl = true
                };


                client.SendAsync(message, null);


                return new Result() { IsSuccess = true, Message = "Email sent successfully" };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<UserViewModel> Login(User user)
        {
            try
            {
                return await QueryFirstOrDefaultAsync<UserViewModel>("SP_LoginUser", new { UserName = user.Email, Password = user.Password });
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task<Result> PasswordReset(User user)
        {
            try
            {
                return await QueryFirstOrDefaultAsync<Result>("SP_SavePassword", new { Password = user.Password, Token = user.OTP });
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> ValidateOTP(User user)
        {
            try
            {
                return await QueryFirstOrDefaultAsync<string>("SP_ValidateOTP", new { Mobile = user.Mobile, OTP = user.OTP  });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
