using BunnyCDN.Net.Storage.Models;
using LMS.Core.Entities;
using Microsoft.AspNetCore.Http;

namespace LMS.Core.Interfaces
{
    public interface IProperty
    {
        Task<Result> SaveLocation(Location location);
        Task<Result> SaveProperty(Property property, List<IFormFile> formFiles);
        Task<IEnumerable<PropertyModel>> GetProperties(LocationModel Location);
        Task<List<StorageObject>> GetStorageObjectsAsync(string path);
    }
}
