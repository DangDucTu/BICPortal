using System;
using Config;
using System.Web;

namespace Utils
{
    public class UserUtil
    {
        /// <summary>
        /// UserName
        /// </summary>
        public static string UserName
        {
            get { return (string)CookieUtil.GetCookie(Constants.SESSION_USER_NAME); }

            set { CookieUtil.SetCookie(Constants.SESSION_USER_NAME, value); }
        }

        public static int UserId
        {
            get
            {
                try
                {
                    return Convert.ToInt32(CookieUtil.GetCookie(Constants.SESSION_USER_ID));
                }
                catch
                {

                    return -1;
                }

            }

            set { CookieUtil.SetCookie(Constants.SESSION_USER_ID, value.ToString()); }
        }

        public static int ShopId
        {
            get
            {
                try
                {
                    return Convert.ToInt32(CookieUtil.GetCookie("SESSION_USER_SHOP_ID"));
                }
                catch
                {

                    return -1;
                }

            }

            set { CookieUtil.SetCookie("SESSION_USER_SHOP_ID", value.ToString()); }
        }

        /// <summary>
        /// Có login hay không
        /// </summary>
        /// <returns></returns>
        public static bool IsLogin
        {
            get
            {
                return !((UserId == -1)
                    || (UserName == string.Empty));
            }
        }

        /// <summary>
        /// Địa chỉ IP
        /// </summary>
        public static string Ip
        {
            get
            {
                return CookieUtil.GetCookie(Constants.COOKIE_USER_IP);
            }
            set
            {
                CookieUtil.SetCookie(Constants.COOKIE_USER_IP, value);
            }
        }

        /// <summary>
        /// Địa chỉ Mac
        /// </summary>
        public static string MacAddress
        {
            get
            {
                return CookieUtil.GetCookie(Constants.COOKIE_USER_PHYSIC_ADDRESS);
            }
            set
            {
                CookieUtil.SetCookie(Constants.COOKIE_USER_PHYSIC_ADDRESS, value);
            }
        }

        public static int IsAdmin
        {
            get
            {
                try
                {
                    return Convert.ToInt32(CookieUtil.GetCookie(Constants.COOKIE_USER_IS_ADMIN));
                }
                catch (Exception)
                {

                    return 0;
                }

            }
            set
            {
                CookieUtil.SetCookie(Constants.COOKIE_USER_IS_ADMIN, value.ToString());
            }
        }

        /// <summary>
        /// Set thông tin đăng nhập của User
        /// </summary>
        public static void SetUserLogin(int userId, string userName)
        {
            UserId = userId;
            UserName = userName;            

            //HttpContext.Current.Session[Constants.SESSION_USER_ID] = userId;
            //HttpContext.Current.Session[Constants.SESSION_USER_NAME] = userName;
            //HttpContext.Current.Session[Constants.SESSION_SHOP_ID] = shopId;
            //HttpContext.Current.Session[Constants.SESSION_SHOP_NAME] = shopName;
        }

        public static void Logout()
        {
            UserId = -1;
            UserName = string.Empty;            
        }

        /// <summary>
        /// AccessToken
        /// </summary>
        public static string FaceBookAccessToken
        {
            get
            {
                return CookieUtil.GetCookie("COOKIE_USER_FaceBookAccessToken");
            }
            set
            {
                CookieUtil.SetCookie("COOKIE_USER_FaceBookAccessToken", value);
            }
        }

        /// <summary>
        /// AccessToken
        /// </summary>
        public static string YahooAccessToken
        {
            get
            {
                return CookieUtil.GetCookie("COOKIE_USER_YahooAccessToken");
            }
            set
            {
                CookieUtil.SetCookie("COOKIE_USER_YahooAccessToken", value);
            }
        }
    }
}
