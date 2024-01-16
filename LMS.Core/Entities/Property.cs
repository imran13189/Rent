using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public  class Property
    {
        public long PropertyId { get; set; }    
        public int LocationId { get; set; }
        public int PropertyTypeId { get; set; }
        public string RentAmount { get; set; }
        public int IsFurnished { get; set; }
        public int Bathrooms { get; set; }
        public int Description { get; set; }
        public int Parking { get; set; }
        public DateTime? AvailableFrom { get; set; }

    }
}
