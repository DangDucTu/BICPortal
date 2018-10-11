using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbDashboard
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.DashboardDataContext CreateInstance()
        {
            return new DataContext.DashboardDataContext(EncryptionUtil.DashboardConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.DashboardDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbDashboard>.Instance.CreateInstance();
            }
        }
    }
}
