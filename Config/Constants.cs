//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2010-05-29
// Description: Khai báo các hằng số dùng trong hệ thống
//
using System;

namespace Config
{
    /// <summary>
    /// Khai báo các hằng số dùng trong hệ thống
    /// </summary>
    public class Constants
    {
        // Khai báo các Connection String key liên quan đến Solution
        #region ConnectionString Constant

        /// <summary>
        /// Xâu kết nối cơ sở dữ liệu
        /// </summary>
        public const string CONNECTION_STRING = "CONNECTION_STRING_DATABASE";
        public const string DASHBOAR_CONNECTION_STRING = "DASHBOARDConnectionString";
        public const string HR_CONNECTION_STRING = "HRConnectionString";

        #endregion

        #region Other
         /// <summary>
        /// Key chứa đường dẫn gốc của Web Front-End
        /// </summary>
        public const string WEB_ROOT = "WebRoot";

        public const string WEB_ROOT1 = "WebRoot1";

        /// <summary>
        /// Key chứa đường dẫn gốc của phần backend social shop
        /// </summary>
        public const string WEB_ROOT_BACKEND = "WebRoot.Backend";



        /// <summary>
        /// Key chứa web title của website
        /// </summary>
        public const string WEB_TITLE = "WEB_TITLE";

        /// <summary>
        /// Key chứa web keyword của website
        /// </summary>
        public const string WEB_KEYWORD = "WEB_KEYWORD";

        /// <summary>
        /// Key chứa web keyword của website
        /// </summary>
        public const string WEB_DESCRIPTION = "WEB_DESCRIPTION";
        #endregion

        #region Session Admin

        public const string SESSION_ADMIN_ID = "ses_adminId";
        public const string SESSION_ADMIN_NAME = "ses_adminName";        

        public const string SESSION_USER_NAME = "ses_userName";
        public const string SESSION_USER_FULLNAME = "ses_fullName";
        public const string SESSION_USER_ID = "ses_userId";

        public const string COOKIE_USER_IP = "ses_userIp";

        public const string COOKIE_USER_PHYSIC_ADDRESS = "ses_userPhysicAddress";
        public const string COOKIE_USER_IS_ADMIN = "ses_userIsAdmin";

        #region Shop

        public const string SESSION_DEPARTMENT_ID = "ses_departmentId";
        public const string SESSION_DIVISION_ID = "ses_divisionId";

        #endregion

        #endregion

        #region Cookie

        public const string COOKIE_DOMAIN = "COOKIE_DOMAIN";

        public const string COOKIE_EXPIRE = "COOKIE_EXPIRES";

        #endregion

        /// <summary>
        /// Key chứa URL photo services
        /// </summary>       
        public const string SERVICE_PHOTO = "photoServices";

        public const string RESOURCE_PHOTO_NEWS = "Resources.Photo.News";        
        public const string RESOURCE_PHOTO_SINGER = "Resources.Photo.Singer";
        public const string RESOURCE_PHOTO_IMAGECOLLECTION = "Resources.Photo.ImageCollection";
        public const string RESOURCE_PHOTO_EDITOR = "Resources.Photo.Editor";        
        public const string RESOURCES_NOIMAGE = "Resources.NoImage";
        public const string RESOURCE_IMAGE_SIZE = "Resources.Image.Size";
        public const string RESOURCE = "Resource";

        public const string SESSION_CAPTCHA_CODE = "sesCaptchaCode";

        public const string IS_HACK_LOGIN = "IS_HACK_LOGIN";        

        public const string RESOURCES_UPLOAD_IMAGES_NEWS = "Resources.Upload.Images.News";
        public const string RESOURCES_UPLOAD_ADVERTISEMENT = "Resources.Upload.Images.Advertisement";

        public const string RESOURCES_UPLOAD_IMAGES_NEWS_SYSTEM = "Resources.Upload.Images.News.System";
        public const string RESOURCES_UPLOAD_ADVERTISEMENT_SYSTEM = "Resources.Upload.Images.Advertisement.System";

        public const string RESOURCES_EDITOR_IMAGES = "Resources.Editor.Images";
        public const string RESOURCES_UPLOAD_IMAGES_IMAGESCOLLECTION = "Resources.Upload.Images.ImageCollection";
        public const string LOG_PATH = "LOG_PATH";

        #region Key cho phép đăng nhập và hệ thống qua gmail
        public const string GOOGLE_CONSUMER_KEY = "GoogleConsumerKey";
        public const string GOOGLE_CONSUMER_SECRET = "GoogleConsumerSecret";
        #endregion

        public const string MAIL_HOST = "Mail.Host";
        public const string MAIL_POST = "Mail.Post";
        public const string MAIL_SEND_FROM = "Mail.SendFrom";
        public const string SMTP_USER_NAME = "SMTP.UserName";
        public const string SMTP_PASSWORD = "SMTP.Password";
    }
}
