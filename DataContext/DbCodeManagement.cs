using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbCodeManagement
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.CodeManagementDataContext CreateInstance()
        {
            return new DataContext.CodeManagementDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.CodeManagementDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbCodeManagement>.Instance.CreateInstance();
            }
        }
    }
}
