using Amazon.S3;
using BunnyCDN.Net.Storage.Models;
using BunnyCDN.Net.Storage;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace LMS.Controllers
{
    [Authorize]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        public IProperty _property;
        private readonly IWebHostEnvironment _hostingEnvironment;

        //private readonly IAmazonS3 _s3Client;
        public PropertyController(IProperty property, IWebHostEnvironment hostingEnvironment)
        {
            _property = property;
            _hostingEnvironment = hostingEnvironment;
            // _s3Client = s3Client;
        }

        [HttpGet]
        [Route("api/GetFiles")]
        public async Task<List<StorageObject>> GetFiles(string path)
        {
            return await _property.GetStorageObjectsAsync("rentstorage/1");
        }

        [HttpPost]
        [Route("api/GetProperties")]
        public async Task<IEnumerable<PropertyModel>> GetProperties(LocationModel location)
        {
            return await _property.GetProperties(location);
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
        [DisableRequestSizeLimit]
        public async Task<Result> SaveProperty([FromForm] Property property, List<IFormFile> formFiles)
        {
            try
            {
                string path = _hostingEnvironment.ContentRootPath;
                return await _property.SaveProperty(property, formFiles, path);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


    }
}
