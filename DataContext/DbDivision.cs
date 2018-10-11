using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbDivision
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.DivisionDataContext CreateInstance()
        {
            return new DataContext.DivisionDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.DivisionDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbDivision>.Instance.CreateInstance();
            }
        }
    }
}
