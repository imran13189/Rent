using Amazon.Runtime;
using Amazon.S3.Transfer;
using Amazon.S3;
using Dapper;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using LMS.Repo.Repository;
using LMS.Repository.Utilities;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;
using System.Runtime.InteropServices;

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

        public async Task<Result> SaveProperty(Property property)
        {
            Task<Result> taskdb= QueryFirstOrDefaultAsync<Result>("SP_SaveProperty", property);

            //Task[] tasks=new Task[property.formFiles.Count];
            //for (int i = 0; i < property.formFiles.Count; i++)
            //{
            //    tasks[i]= SaveFiles(property.formFiles[i]);
            //}
           
            //await Task.WhenAll(tasks);

            return await taskdb;
        }
       

        //public async Task SaveFiles(IFormFile file)
        //{
        //    //AmazonS3Client _s3Client=new AmazonS3Client();
        //    string accessKey = "AKIA4M4QDXIPX7QZMRE4";
        //    string secretKey = "Y1yREodYw9OtiQQu0UKhT1E8pbVXLF7ZB1Xpf1f";

        //    // Replace with your S3 bucket name
        //    string S3BucketName = "imeshmabucket";

        //    if (file != null && file.Length > 0)
        //    {
        //        try
        //        {
        //            var key = Guid.NewGuid() + Path.GetExtension(file.FileName);
        //            using (var stream = file.OpenReadStream())
        //            {
        //                var request = new Amazon.S3.Model.PutObjectRequest
        //                {
        //                    BucketName = S3BucketName,
        //                    Key = key,
        //                    InputStream = stream,
        //                    ContentType = file.ContentType
                    
        //                };

        //                await _s3Client.PutObjectAsync(request);
        //            }

        //            // Optionally, you can return the S3 URL of the uploaded file
        //            var s3FileUrl = $"https://{S3BucketName}.s3.amazonaws.com/{key}";
                    
        //        }
        //        catch (Exception ex)
        //        {
                  
        //        }
        //    }


        //}


}
}
