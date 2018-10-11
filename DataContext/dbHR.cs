using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbHR
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.HRDataContext CreateInstance()
        {
            return new DataContext.HRDataContext(EncryptionUtil.HRConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.HRDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbHR>.Instance.CreateInstance();
            }
        }
    }
}
