using Config;
namespace EntityBLL
{
    public class SiteInfo : Config.Pattern.Prototype<SiteInfo>
    {
        /// <summary>
        /// Đối tượng thể hiện SiteInfo
        /// </summary>
        public static SiteInfo Instance
        {
            get
            {
                return Config.Pattern.Singleton<SiteInfo>.Instance;
            }
        }

        /// <summary>
        /// Đường dẫn gốc của WEB.
        /// </summary>
        public string WebRoot
        {
            get
            {
                return Global.Settings.WebRoot;
            }
        }

        public string ServicesPhoto
        {
            get
            {
                return Global.Settings.ServicesPhoto;
            }
        }

        /// <summary>
        /// Kiểm tra user đã login hay chưa
        /// </summary>
        public bool IsLogin
        {
            get { return  Utils.UserUtil.IsLogin; }
        }
    }
}
