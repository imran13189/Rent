using Amazon.Runtime;
using Amazon.S3.Transfer;
using Amazon.S3;
using Dapper;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using LMS.Repo.Repository;
using BunnyCDN.Net.Storage;
using Microsoft.AspNetCore.Http;
using BunnyCDN.Net.Storage.Models;
using System.Text;
using System.Drawing.Imaging;
using System.Drawing;
using static System.Net.Mime.MediaTypeNames;
using System.Reflection.Emit;
using System.IO;
using Rent.BunnyNet;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic.FileIO;

namespace LMS.Repository.Repo
{
    public class PropertyRepo : BaseRepository, IProperty
    {
        private readonly IConfiguration _configuration;
       
      
        public PropertyRepo(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<Result> SaveLocation(Location location)
        {
            return await QueryFirstOrDefaultAsync<Result>("SP_SaveLocation", location);

        }

        public async Task<Result> SaveProperty(Property property, List<IFormFile> formFiles,string FilePath)
        {
            Result taskdb = await QueryFirstOrDefaultAsync<Result>("SP_SaveProperty", property);

            string dirpath = Convert.ToString(taskdb.Id);
            Task[] tasks = new Task[formFiles.Count];

            for (int i = 0; i < formFiles.Count; i++)
            {

               
                tasks[i] = SaveFiles(formFiles[i], taskdb.Id,i, FilePath);
            }

            await Task.WhenAll(tasks);

            return taskdb;
        }

     


        public async Task SaveFiles(IFormFile file,long? Id,int fileId,string filepath)
        {
            
            string pp = Convert.ToString(Id);
            filepath = Path.Combine(filepath, "Files",pp);
            using (Bitmap postedImage = new Bitmap(file.OpenReadStream()))
            {

                try
                {
                    if (!Directory.Exists(filepath))
                        Directory.CreateDirectory(filepath);

                  
                    filepath = Path.Combine(filepath, Convert.ToString(fileId)+".jpg");
                    ImageCodecInfo myImageCodecInfo;
                    System.Drawing.Imaging.Encoder myEncoder;
                    EncoderParameter myEncoderParameter;
                    EncoderParameters myEncoderParameters;
                    myImageCodecInfo = GetEncoderInfo("image/jpeg");
                    myEncoder = System.Drawing.Imaging.Encoder.Quality;
                    myEncoderParameters = new EncoderParameters(1);
                    myEncoderParameter = new EncoderParameter(myEncoder, 20L);
                    myEncoderParameters.Param[0] = myEncoderParameter;
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        postedImage.Save(memoryStream, myImageCodecInfo, myEncoderParameters);
                        byte[] data = memoryStream.ToArray();
                        await System.IO.File.WriteAllBytesAsync(filepath, data);
                       
                    }

                }
                catch (Exception ex)
                {
                    throw;
                }
            }

        }

       

        public async Task<IEnumerable<PropertyModel>> GetProperties(LocationModel location)
        {
            return await QueryAsync<PropertyModel>("SP_GetProperties", new { Lat = location.Lat, Long = location.Long, Location = location.LocationName, ptype = location.ptype, budget = location.budget, page = location.page });
        }

        public async Task<PropertyModel> GetProperty(long PropertyId)
        {
            var data= await QueryFirstOrDefaultAsync<PropertyModel>("SP_GetProperty", new {PropertyId= PropertyId });
            return data;
        }


        public async Task<Result> SaveWishList(long UserId, long PropertyId)
        {
            try
            {
                return await QueryFirstOrDefaultAsync<Result>("SP_SaveWishList", new { PropertyId = PropertyId, UserId = UserId });
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<PropertyModel>> GetWishList(long userId)
        {
            return await QueryAsync<PropertyModel>("SP_GetWishList", new { UserId = userId });
        }

        public async Task<IEnumerable<PropertyModel>> GetUserProperties(long userId)
        {
            return await QueryAsync<PropertyModel>("SP_GetUserProperties", new { UserId = userId });
        }

        public async Task<List<StorageObject>> GetStorageObjectsAsync(string path)
        {
            BunnyCDNStorage storage = new BunnyCDNStorage("rentstorage", "30e2a0a6-7874-49da-a71c9bbadd39-be9e-4c6a");
            return await storage.GetStorageObjectsAsync("rentstorage/1");
        }


        private static ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            int j;
            ImageCodecInfo[] encoders;
            encoders = ImageCodecInfo.GetImageEncoders();
            for (j = 0; j < encoders.Length; ++j)
            {
                if (encoders[j].MimeType == mimeType)
                    return encoders[j];
            }
            return null;
        }
        private static void Compress(Bitmap srcBitmap, Stream destStream, long level)
        {

        }
    }
}
