using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbReport
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.ReportDataContext CreateInstance()
        {
            return new DataContext.ReportDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.ReportDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbReport>.Instance.CreateInstance();
            }
        }
    }
}
