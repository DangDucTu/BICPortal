using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Utils;

namespace DataContext
{
    public class DbIssueTracking
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.IssueTrackingDataContext CreateInstance()
        {
            return new DataContext.IssueTrackingDataContext(EncryptionUtil.ConnectionString);
        }

        /// <summary>
        /// Thể hiện của lớp ShopDataContext
        /// </summary>
        public static DataContext.IssueTrackingDataContext ContentInstance
        {
            get
            {
                return Config.Pattern.Singleton<DbIssueTracking>.Instance.CreateInstance();
            }
        }
    }
}
