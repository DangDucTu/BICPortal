using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Config.Pattern;

namespace EntityBLL
{
    public class ConfigExtend
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static ConfigExtend Instance
        {
            get
            {
                return Singleton<ConfigExtend>.Instance;
            }
        }
        #endregion

        public string mShopName { get; set; }
        public string mTitleShop { get; set; }
        public string mKeyword { get; set; }
        public string mFooter { get; set; }
        public string mYahoo { get; set; }
        public string mSkype { get; set; }
        public string mHotLine { get; set; }        
        public string mAddress { get; set; }
        public string mPhone { get; set; }
        public string mEmail { get; set; }
        public string mWebsite { get; set; }
    }
}
