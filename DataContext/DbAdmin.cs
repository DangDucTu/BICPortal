using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbAdmin
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.AdminDataContext CreateInstance()
        {
            return new DataContext.AdminDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.AdminDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbAdmin>.Instance.CreateInstance();
            }
        }
    }
}
