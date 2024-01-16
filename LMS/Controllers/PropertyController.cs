using Amazon.S3;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
   
    [ApiController]
    public class PropertyController : ControllerBase
    {
        public IProperty _property;
        //private readonly IAmazonS3 _s3Client;
        public PropertyController(IProperty property)
        {
            _property = property;
           // _s3Client = s3Client;
        }


        [HttpPost]
        [Route("api/SaveLocation")]
        public async Task<Result> SaveLocation(Location location)
        {
            try
            {
                return await _property.SaveLocation(location);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("api/SaveProperty")]
        public async Task<Result> SaveProperty([FromForm] Property property, List<IFormFile> formFiles)
        {
            try
            {
                return await _property.SaveProperty(property);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
