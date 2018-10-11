using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbDepartment
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.DepartmentDataContext CreateInstance()
        {
            return new DataContext.DepartmentDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.DepartmentDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbDepartment>.Instance.CreateInstance();
            }
        }
    }
}
