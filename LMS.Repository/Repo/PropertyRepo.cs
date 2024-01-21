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

namespace LMS.Repository.Repo
{
    public class PropertyRepo : BaseRepository, IProperty
    {
      
        //private readonly IAmazonS3 _s3Client;
        public PropertyRepo()
        {
           
        }
        public async Task<Result> SaveLocation(Location location)
        {
            return await QueryFirstOrDefaultAsync<Result>("SP_SaveLocation", location);

        }

        public async Task<Result> SaveProperty(Property property, List<IFormFile> formFiles,string phyPath)
        {
            Result taskdb= await QueryFirstOrDefaultAsync<Result>("SP_SaveProperty", property);

            string path = Convert.ToString(taskdb.Id) + "/" + property.Description?.Replace(" ","_");
            Task[] tasks = new Task[formFiles.Count];
            compressed(formFiles[0], phyPath);
            for (int i = 0; i < formFiles.Count; i++)
            {
                string path1 = path + Convert.ToString(i);
                
                tasks[i] = SaveFiles(formFiles[i], path1);
            }

            await Task.WhenAll(tasks);

            return taskdb;
        }

        public async Task SaveFiles(IFormFile file,string path)
        {
            //AmazonS3Client _s3Client=new AmazonS3Client();
            BunnyCDNStorage storage = new BunnyCDNStorage("rentstorage", "30e2a0a6-7874-49da-a71c9bbadd39-be9e-4c6a");

            if (file != null && file.Length > 0)
            {
                try
                {
                    var key = path +".jpg";
                    using (var stream = file.OpenReadStream())
                    {
                        await storage.UploadAsync(stream, "rentstorage/" + key);

                    }
                }
                catch (Exception ex)
                {

                }
            }
        }

        public async Task<IEnumerable<PropertyModel>> GetProperties(LocationModel location)
        {
           return await QueryAsync<PropertyModel>("SP_GetProperties", new {Lat=location.Lat,Long=location.Long, Location = location.LocationName, ptype = location.ptype, budget = location.budget });
        }

        public async Task<List<StorageObject>> GetStorageObjectsAsync(string path)
        {
            BunnyCDNStorage storage = new BunnyCDNStorage("rentstorage", "30e2a0a6-7874-49da-a71c9bbadd39-be9e-4c6a");
            return await storage.GetStorageObjectsAsync("rentstorage/1");
        }

        void compressed(IFormFile file,string path)
        {
            using (Bitmap postedImage = new Bitmap(file.OpenReadStream()))
            {
                try
                {
                    Stream s = new FileStream(path, FileMode.Create); //create FileStream,this will finally be used to create the new image 
                    Compress(postedImage, s, 0);  //main progress to compress image
                    s.Close();
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
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
            ImageCodecInfo myImageCodecInfo;
            System.Drawing.Imaging.Encoder myEncoder;
            EncoderParameter myEncoderParameter;
            EncoderParameters myEncoderParameters;
            myImageCodecInfo = GetEncoderInfo("image/jpeg");
            myEncoder = System.Drawing.Imaging.Encoder.Quality;
            myEncoderParameters = new EncoderParameters(1);
            myEncoderParameter = new EncoderParameter(myEncoder, level);
            myEncoderParameters.Param[0] = myEncoderParameter;
            srcBitmap.Save(destStream, myImageCodecInfo, myEncoderParameters);
        }
    }
}
