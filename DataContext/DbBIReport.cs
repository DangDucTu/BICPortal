using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbBIReport
    {
        public DataContext.BIReportDataContext CreateInstance()
        {
            return new DataContext.BIReportDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.BIReportDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbBIReport>.Instance.CreateInstance();
            }
        }
    }
}
