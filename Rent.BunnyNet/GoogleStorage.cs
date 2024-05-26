using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Storage.v1;
using Google.Apis.Storage.v1.Data;
using Google.Cloud.Storage.V1;
using Microsoft.Extensions.Configuration;

namespace Rent.BunnyNet
{
    public class GoogleStorage
    {
        private readonly IConfiguration _configuration;

        public GoogleStorage(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task UploadFile(Stream stream, string filename)
        {
            try
            {

                string path1 = Convert.ToString(_configuration["IIS_PHYSICAL_PATH"]) + "service_key.json";
                GoogleCredential credential = GoogleCredential.FromFile(path1);
                var storage = StorageClient.Create(credential);
                await storage.UploadObjectAsync("rent-buck", filename, null, stream);
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
