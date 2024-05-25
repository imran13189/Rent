using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class PropertyModel
    {
        public long PropertyId { get; set; }
        public int LocationId { get; set; }
        public short PropertyTypeId { get; set; }
        public string PropertyType { get; set; }
        public decimal RentAmount { get; set; }
        public byte IsFurnished { get; set; }
        public byte Bathrooms { get; set; }
        public byte Parking { get; set; }
        public string Description { get; set; }
        public string AvailableFrom { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string LocationName { get; set; }
        public string? FilePath { get; set; }
        public long RowNum { get; set; }

    }
   
    public class LocationModel
    {
        public int? LocationId { get; set; }
        public string? LocationName { get; set; }
        public decimal? Lat { get; set; }
        public decimal? Long { get; set; }
        public int? ptype { get; set; }
        public int? budget { get; set; }
        public int? page { get; set; }
        
    }
}
