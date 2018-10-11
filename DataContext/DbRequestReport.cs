using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbRequestReport
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.RequestReportDataContext CreateInstance()
        {
            return new DataContext.RequestReportDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.RequestReportDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbRequestReport>.Instance.CreateInstance();
            }
        }
    }
}
