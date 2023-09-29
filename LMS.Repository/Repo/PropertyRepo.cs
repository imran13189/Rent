using Dapper;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using LMS.Repo.Repository;
using LMS.Repository.Utilities;
using System.Linq.Expressions;

namespace LMS.Repository.Repo
{
    public class PropertyRepo : BaseRepository, IProperty
    {
       

        public async Task<Result> SaveLocation(Location location)

        {
            return await QueryFirstOrDefaultAsync<Result>("SP_SaveLocation", location);

        }

    }
}
