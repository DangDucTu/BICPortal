//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2008.11.08
// Description: Lấy thông tin từ File Web.Config
//

namespace Config
{
    /// <summary>
    /// Giao tiếp tham số trong VTCO.Config
    /// </summary>
    public class Global
    {
        /// <summary>
        /// Lấy các tham số trong phần cấu hình
        /// </summary>
        public static SettingSingleton Settings
        {
            get
            {
                return Pattern.Singleton<SettingSingleton>.Instance;
            }
        }

        public Global()
        {
        }
    }
}
