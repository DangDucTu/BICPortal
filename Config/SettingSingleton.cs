//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2008.11.08
// Description: Lấy thông tin từ File Web.Config
//
using System;
using System.Linq;
using System.Configuration;
using System.Collections.Specialized;
using System.Web;

namespace Config
{
    /// <summary>
    /// Lấy thông tin cấu hình từ File Web.Config
    /// </summary>
    public sealed class SettingSingleton
    {

        #region Process Method
        /// <summary>
        /// Lấy giá trị của Key trong AppSetting
        /// </summary>
        /// <param name="_Key">Key</param>
        /// <returns>Return Null nếu không có key</returns>
        public string GetAppKeyValue(string _Key)
        {
            NameValueCollection appsettings = ConfigurationManager.AppSettings;
            if (appsettings == null) return null;
            if (appsettings.AllKeys.Contains(_Key))
            {
                return appsettings[_Key];
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Lấy xâu kết nối trong file Web.Config
        /// </summary>
        /// <param name="_Key">key</param>
        /// <returns>Return null nếu không có key</returns>
        public string GetConnectionStringKeyValue(string _Key)
        {
            try
            {
                return ConfigurationManager.ConnectionStrings[_Key].ConnectionString;
            }
            catch { }
            return null;
        }
        #endregion Process Method

        #region Attribute Connection String
        /// <summary>
        /// Xâu kết nối cơ sở dữ liệu Club
        /// </summary>
        public string ConnectionString
        {
            get
            {
                return GetConnectionStringKeyValue(Constants.CONNECTION_STRING);
            }
        }

        public string DashboardConnectionString
        {
            get
            {
                return GetConnectionStringKeyValue(Constants.DASHBOAR_CONNECTION_STRING);
            }
        }

        public string HRConnectionString
        {
            get
            {
                return GetConnectionStringKeyValue(Constants.HR_CONNECTION_STRING);
            }
        }

        public string ConnectionStringDatabase
        {
            get
            {
                //RijndaelEnhanced obj = new RijndaelEnhanced("BidDeal", "@1B2c3D4e5F6g7H8");
                //return obj.Decrypt(GetConnectionStringKeyValue(Constants.CONNECTION_STRING_BIDDEAL));
                return GetConnectionStringKeyValue(Constants.CONNECTION_STRING);
            }
        }
        #endregion

        #region Attribute AppSeting
        /// <summary>
        /// Đường dẫn gốc của Web Front-End
        /// </summary>
        public string WebRoot
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_ROOT);
            }
        }

        public string WebRootOther
        {
            get
            {
                return GetAppKeyValue("WebRootOther");
            }
        }
        
        /// <summary>
        /// Đường dẫn gốc của Web Front-End
        /// </summary>
        public string WebRoot1
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_ROOT1);
            }
        }

        /// <summary>
        /// Đường dẫn gốc của backend
        /// </summary>
        public string WebRootBackEnd
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_ROOT_BACKEND);
            }
        }

        /// <summary>
        /// Tiêu đề chung của trang
        /// </summary>
        public string WebTitle
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_TITLE);
            }
        }

        /// <summary>
        /// Từ khóa chung của trang
        /// </summary>
        public string WebKeyWord
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_KEYWORD);
            }
        }

        /// <summary>
        /// Mô tả chung chung của trang
        /// </summary>
        public string WebDescription
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_DESCRIPTION);
            }
        }
        #endregion

        #region Attribute Cookie
        /// <summary>
        /// Domain cho Cookie
        /// </summary>
        public string CookieDomain
        {
            get
            {
                return GetAppKeyValue(Constants.COOKIE_DOMAIN);
            }
        }

        /// <summary>
        /// Thời hạn Cookie
        /// </summary>
        public string CookieExpires
        {
            get
            {
                return GetAppKeyValue(Constants.COOKIE_EXPIRE);
            }
        }

        #endregion

        #region Config Send Mail
        public string MailHost
        {
            get
            {
                return GetAppKeyValue(Constants.MAIL_HOST);
            }
        }

        public string MailPost
        {
            get
            {
                return GetAppKeyValue(Constants.MAIL_POST);
            }
        }

        public string MailSendFrom
        {
            get
            {
                return GetAppKeyValue(Constants.MAIL_SEND_FROM);
            }
        }

        public string SmtpUserName
        {
            get
            {
                return GetAppKeyValue(Constants.SMTP_USER_NAME);
            }
        }
        public string SmtpPassword
        {
            get
            {
                return GetAppKeyValue(Constants.SMTP_PASSWORD);
            }
        }

        public string EMAIL_SHOP
        {
            get
            {
                return GetAppKeyValue("EMAIL_SHOP");
            }
        }

        #endregion

        public string TimeCacheWeb
        {
            get
            {
                return GetAppKeyValue("TimeCacheWeb");
            }
        }

        public string ImageUploadExtension
        {
            get
            {
                return GetAppKeyValue("ImageUploadExtension");
            }
        }

        public string FileUploadExtension
        {
            get
            {
                return GetAppKeyValue("FileUploadExtension");
            }
        }

        public string ImageMaxLengthUpload
        {
            get
            {
                return GetAppKeyValue("ImageMaxLengthUpload");
            }
        }

        public string FileMaxLengthUpload
        {
            get
            {
                return GetAppKeyValue("FileMaxLengthUpload");
            }
        }

        #region ResourceType
        /// <summary>
        /// Thư mục ảnh chưa định nghĩa
        /// </summary>
        public string ResourceNotDefine
        {
            get
            {
                return GetAppKeyValue("Resource.NotDefine");
            }
        }

        public string ResourcesUploadImagesAdv
        {
            get
            {
                var str = GetAppKeyValue("Resources.Upload.Images.Adv");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string ResourcesUploadImagesAdvSystem
        {
            get
            {
                var str = GetAppKeyValue("Resources.Upload.Images.Adv.System");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string ResourcesUploadImagesProduct
        {
            get
            {
                var str = GetAppKeyValue("Resources.Upload.Images.Product");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string ResourcesUploadImagesNews
        {
            get
            {
                var str = GetAppKeyValue("Resources.Upload.Images.News");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string ResourcesUploadImagesNewsSystem
        {
            get
            {
                var str = GetAppKeyValue("Resources.Upload.Images.News.System");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string ResourcesCKFinder
        {
            get
            {
                var str = GetAppKeyValue("Path.Resource.CKFinder");
                return HttpContext.Current.Server.MapPath(str);
            }
        }
        public string PathResourcesCKFinder
        {
            get
            {
                return GetAppKeyValue("Resource.CKFinder");
            }
        }

        public string ResourcesUploadFile
        {
            get
            {
                return GetAppKeyValue("Resources.Upload.File");
            }
        }
        public string ResourcesUploadEmailFile
        {
            get
            {
                return GetAppKeyValue("Resources.Upload.FileEmail");
            }
        }

        public string ResourcesUploadFileRequestForm
        {
            get
            {
                return GetAppKeyValue("Resources.Request.Form");
            }
        }

        public string ResourcesUploadImagesCollections
        {
            get
            {
                return GetAppKeyValue("Resources.Upload.Images.Collections");
            }
        }

        #endregion

        #region PhotoServices - Path to Resources

        public string ServicesPhoto
        {
            get
            {
                return GetAppKeyValue(Constants.SERVICE_PHOTO);
            }
        }

        /// <summary>
        /// Đường dẫn tới ảnh
        /// </summary>
        public string PathNoImage
        {
            get
            {
                var str = GetAppKeyValue("Path.NoImage");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        /// <summary>
        /// Đường dẫn tới ảnh upload
        /// </summary>
        public string PathResource
        {
            get
            {
                return GetAppKeyValue("Path.Resource");
            }
        }

        /// <summary>
        /// Đường dẫn thư mục ảnh của Editor
        /// </summary>
        public string PathEditorImages
        {
            get
            {
                var str = GetAppKeyValue("Path.Editor.Images");
                return HttpContext.Current.Server.MapPath(str);
            }
        }
        #endregion

        #region PhotoServices - Url to Resources

        /// <summary>
        /// Url tới ảnh mặc định Avatar
        /// </summary>
        public string UrlNoImage
        {
            get
            {
                return GetAppKeyValue("Url.NoImage");
            }
        }

        /// <summary>
        /// Url ảnh của Editor
        /// </summary>
        public string UrlEditorImages
        {
            get
            {
                var str = GetAppKeyValue("Url.Editor.Images");
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string UrlUploadImagesProduct
        {
            get
            {
                return GetAppKeyValue("Url.Upload.Images.Product");
            }
        }

        public string UrlUploadImagesAdv
        {
            get
            {
                return GetAppKeyValue("Url.Upload.Images.Adv");
            }
        }

        public string UrlUploadImagesNews
        {
            get
            {
                return GetAppKeyValue("Url.Upload.Images.News");
            }
        }

        public string UrlUploadImagesAdvSystem
        {
            get
            {
                return GetAppKeyValue("Url.Upload.Images.Adv.System");
            }
        }

        public string UrlUploadImagesNewsSystem
        {
            get
            {
                return GetAppKeyValue("Url.Upload.Images.News.System");
            }
        }

        public string UrlUploadImagesCollections
        {
            get
            {
                return GetAppKeyValue("Url.Upload.Images.Collections");
            }
        }

        public string UrlUploadFile
        {
            get
            {
                return GetAppKeyValue("Url.Upload.File");
            }
        }

        #endregion

        /// <summary>
        /// Đường dẫn tới thư mục ảnh của Editor
        /// </summary>
        public string ResourcesEditorImages
        {
            get
            {
                var str = GetAppKeyValue(Constants.RESOURCES_EDITOR_IMAGES);
                return HttpContext.Current.Server.MapPath(str);
            }
        }

        public string ResourcesNoImage
        {
            get
            {
                var str = GetAppKeyValue(Constants.RESOURCES_NOIMAGE);
                return HttpContext.Current.Server.MapPath(str);
            }
        }
        #region Feed
        public string FacebookConsumerKey
        {
            get
            {
                return GetAppKeyValue("FacebookConsumerKey");
            }
        }
        public string FacebookConsumerSecret
        {
            get
            {
                return GetAppKeyValue("FacebookConsumerSecret");
            }
        }
        public string FacebookCallbackUrl
        {
            get
            {
                return GetAppKeyValue("FacebookCallbackUrl");
            }
        }
        public string YahooAppID
        {
            get
            {
                return GetAppKeyValue("YahooAppID");
            }
        }
        public string YahooConsumerKey
        {
            get
            {
                return GetAppKeyValue("YahooConsumerKey");
            }
        }
        public string YahooConsumerSecret
        {
            get
            {
                return GetAppKeyValue("YahooConsumerSecret");
            }
        }
        public string YahooCallbackUrl
        {
            get
            {
                return GetAppKeyValue("YahooCallbackUrl");
            }
        }
        #endregion
        
        public string KeyAccessWebsite
        {
            get
            {
                return GetAppKeyValue("KEY_ACCESS_WEBSITE");
            }
        }

        public string ShopNameConfig
        {
            get
            {
                return GetAppKeyValue("SHOP_NAME_CONFIG");
            }
        }

        public string ShopIdConfig
        {
            get
            {
                return GetAppKeyValue("SHOP_ID_CONFIG");
            }
        }
    }
}
