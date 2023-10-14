using LMS.Core.Entities;

namespace LMS.Core.Interfaces
{
    public interface IProperty
    {
        Task<Result> SaveLocation(Location location);
        Task<Result> SaveProperty(Property property);
    }
}
