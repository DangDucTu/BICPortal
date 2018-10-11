using System;
using Config;
using System.Web;

namespace Utils
{
    public class AdminUtil
    {
        /// <summary>
        /// AdminId
        /// </summary>
        public static int AdminId
        {
            get
            {
                try
                {
                    return Convert.ToInt32(CookieUtil.GetCookie(Constants.SESSION_ADMIN_ID));
                }
                catch
                {

                    return -1;
                }

            }

            set { CookieUtil.SetCookie(Constants.SESSION_ADMIN_ID, value.ToString()); }

            //get { return Convert.ToInt32(HttpContext.Current.Session[Constants.SESSION_ADMIN_ID]); }
        }

        /// <summary>
        /// UserName
        /// </summary>
        public static string AdminName
        {
            get { return (string)CookieUtil.GetCookie(Constants.SESSION_ADMIN_NAME); }
            set { CookieUtil.SetCookie(Constants.SESSION_ADMIN_NAME, value); }
        }

        public static int DepartmentId
        {
            get { return Convert.ToInt32(CookieUtil.GetCookie(Constants.SESSION_DEPARTMENT_ID));}
            set { CookieUtil.SetCookie(Constants.SESSION_DEPARTMENT_ID, value.ToString()); }
        }

        public static int DivisionId
        {
            get { return Convert.ToInt32(CookieUtil.GetCookie(Constants.SESSION_DIVISION_ID)); }
            set { CookieUtil.SetCookie(Constants.SESSION_DIVISION_ID, value.ToString()); }
        }        

        public static int IsAdmin
        {
            get { return Convert.ToInt32(CookieUtil.GetCookie("SESSION_IS_ADMIN")); }
            set { CookieUtil.SetCookie("SESSION_IS_ADMIN", value.ToString()); }
        }

        public static int RoleId
        {
            get
            {
                try
                {
                    return Convert.ToInt32(CookieUtil.GetCookie("SESSION_SHOP_ROLE_ID"));
                }
                catch
                {
                    return -1;
                }

            }

            set { CookieUtil.SetCookie("SESSION_SHOP_ROLE_ID", value.ToString()); }

        }

        /// <summary>
        /// Lấy xâu quyền của Admin
        /// </summary>
        public static string Permission
        {

            get { return (string)CookieUtil.GetCookie("SESSION_ADMIN_PERMISSION"); }
            set { CookieUtil.SetCookie("SESSION_ADMIN_PERMISSION", value); }
        }

        /// <summary>
        /// Có login hay không
        /// </summary>
        /// <returns></returns>
        public static bool IsLogin
        {
            get
            {
                return !((AdminId == -1)
                    || (AdminName == string.Empty));
            }
        }

        /// <summary>
        /// Set thông tin đăng nhập của admin
        /// </summary>
        public static void SetAdminInfo(int adminId, string adminName,int roleId, int departmentId)
        {
            AdminId = adminId;
            AdminName = adminName;            
            RoleId = roleId;
            DepartmentId = departmentId;
        }

        public static void Logout()
        {
            AdminId = -1;
            AdminName = string.Empty;
        }
    }
}
