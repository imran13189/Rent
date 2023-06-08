using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

using LMS.Core.Entities;
using LMS.Core.Interfaces;

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
            catch (Exception ex)
            {
                throw ex;
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
            await QueryFirstOrDefaultAsync<Result>("SP_SaveUser", user);
            return await SentEmail(user);
        }

      
        public async Task<Result> SentEmail(User user)
        {
            try
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress("aliusman9760@gmail.com");
                message.To.Add(user.Email);
                message.Subject = "Password Reset #" + user.Name;
                message.IsBodyHtml = true;
                message.Body = user.Html;

                SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential(_appSettings.Email, _appSettings.Secret),
                    EnableSsl = true
                };


                client.SendAsync(message, null);


                return new Result() { IsSuccess = true, Message = "Email sent successfully" };
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<UserViewModel> Login(User user)
        {
            try
            {
                return await QueryFirstOrDefaultAsync<UserViewModel>("SP_LoginUser", new { UserName = user.Email, Password = user.Password });
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public async Task<Result> PasswordReset(User user)
        {
            try
            {
                return await QueryFirstOrDefaultAsync<Result>("SP_SavePassword", new { Password = user.Password, Token = user.Token });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
