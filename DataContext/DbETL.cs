using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbETL
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.ETLDataContext CreateInstance()
        {
            return new DataContext.ETLDataContext(EncryptionUtil.HRConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.ETLDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbETL>.Instance.CreateInstance();
            }
        }
    }
}
