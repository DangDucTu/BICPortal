using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EntityBLL
{
    public partial class Category
    {
        /// <summary>
        /// Mức của Category
        /// </summary>
        public int CateId { get; set; }
        public int Level { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int Status { get; set; }
        public int ParrentId { get; set; }
        public string Link { get; set; }
        public int Type { get; set; }
    }
}
