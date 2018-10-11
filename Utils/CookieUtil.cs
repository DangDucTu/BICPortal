using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Config;

namespace Utils
{
    public class CookieUtil
    {
        /// <summary>
        /// Lưu cookie
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        public static void SetCookie(string name, string value)
        {
            string strValueEn = EncryptionUtil.EncryptRijndael(value);
            
            if (HttpContext.Current.Request.Cookies[name] == null)
            {
                HttpContext.Current.Response.Cookies.Set(new HttpCookie(name, ""));
            }
            else
            {
                HttpContext.Current.Request.Cookies[name].Value = strValueEn;
            }

            HttpContext.Current.Response.Cookies[name].Value = strValueEn;
            if (!Global.Settings.CookieDomain.Equals(""))
            {
                HttpContext.Current.Response.Cookies[name].Path = "/";
                HttpContext.Current.Response.Cookies[name].Domain = Global.Settings.CookieDomain;
            }
            var iCookieExpires = 60 * 1; // mặc định
            try
            {
                iCookieExpires = Convert.ToInt32(Global.Settings.CookieExpires);
            }
            catch { }

            HttpContext.Current.Response.Cookies[name].Expires = DateTime.Now.AddMinutes(iCookieExpires);
            HttpContext.Current.Response.Cookies[name].HttpOnly = true;
        }

        /// <summary>
        /// Lấy giá trị của cookie
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string GetCookie(string name)
        {
            var cookieValue = string.Empty;
            if (System.Web.HttpContext.Current.Request.Cookies[name] != null)
            {
                try
                {
                    cookieValue = EncryptionUtil.DecryptRijndael(System.Web.HttpContext.Current.Request.Cookies[name].Value.ToString());
                }
                catch { }
            }
            return cookieValue;
        }
    }
}
