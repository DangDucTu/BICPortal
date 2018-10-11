using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DotNetGroup.OAuth;
using System.Configuration;
namespace Utils
{
    public class TokenManager : ITokenManager
    {
        public TokenManager(string consumerKey, string consumerSecret, string callbackUrl)
        {
            if (String.IsNullOrEmpty(consumerKey))
            {
                throw new ArgumentNullException("consumerKey");
            }

            ConsumerKey = consumerKey;
            ConsumerSecret = consumerSecret;
            CallbackUrl = callbackUrl;
        }

        public TokenManager(string appId, string consumerKey, string consumerSecret, string callbackUrl)
        {
            if (String.IsNullOrEmpty(consumerKey))
            {
                throw new ArgumentNullException("consumerKey");
            }

            AppID = appId;
            ConsumerKey = consumerKey;
            ConsumerSecret = consumerSecret;
            CallbackUrl = callbackUrl;
        }

        #region ITokenManager Members

        public string AppID
        {
            get;
            private set;
        }

        public string ConsumerKey
        {
            get;
            private set;
        }

        public string ConsumerSecret
        {
            get;
            private set;
        }

        public string CallbackUrl
        {
            get;
            private set;
        }

        #endregion
    }

    public class YahooOAuthManager
    {
        public static TokenManager TokenManager
        {
            get
            {
                TokenManager tokenManager;
                string appId = Config.Global.Settings.YahooAppID;
                string consumerKey = Config.Global.Settings.YahooConsumerKey;
                string consumerSecret = Config.Global.Settings.YahooConsumerSecret;
                string callbackUrl = Config.Global.Settings.YahooCallbackUrl;
                tokenManager = new TokenManager(appId, consumerKey, consumerSecret, callbackUrl);
                return tokenManager;
            }
        }
        /// <summary>
        /// Bắn feed qua Yahoo
        /// </summary>
        /// <param name="oAuthTokenInfo"></param>
        /// <param name="title"></param>
        /// <param name="image"></param>
        /// <param name="link"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        public static ResponeType FeedToYahoo(OAuthTokenInfo oAuthTokenInfo, string title, string image, string link, string description)
        {
            try
            {
                YahooService yahooService = new YahooService(YahooOAuthManager.TokenManager);
                yahooService.TokenInfo = oAuthTokenInfo;
                var update = new UpdateEntity
                {
                    Title = title,
                    Description = description,
                    Link = link,
                    Type = "appActivity",
                    ImgUrl = image,
                    ImgWidth = "125",
                    ImgHeight = "94"
                };
                var result = yahooService.AddUpdates(update);
                if (result == ResponeType.Unauthorized)
                {
                    yahooService.RefreshToken();
                    return yahooService.AddUpdates(update);
                }
                return result;
            }
            catch { return ResponeType.Error; }
        }
    }


    //public class GoogleOAuthManager
    //{
    //    public const string GOOGLE_TOKEN_MANAGER = "GoogleTokenManager";
    //    public const string GOOGLE_CONSUMER_KEY = "GoogleConsumerKey";
    //    public const string GOOGLE_CONSUMER_SECRET = "GoogleConsumerSecret";
    //    public const string GOOGLE_CALLBACK_URL = "GoogleCallbackUrl";
    //    public static TokenManager TokenManager
    //    {
    //        get
    //        {
    //            TokenManager tokenManager;
    //            string consumerKey = ConfigurationManager.AppSettings[GOOGLE_CONSUMER_KEY];
    //            string consumerSecret = ConfigurationManager.AppSettings[GOOGLE_CONSUMER_SECRET];
    //            string callbackUrl = ConfigurationManager.AppSettings[GOOGLE_CALLBACK_URL];
    //            tokenManager = new TokenManager(consumerKey, consumerSecret, callbackUrl);

    //            return tokenManager;
    //        }
    //    }
    //}


    public class FacebookOAuthManager
    {

        public static string AccessToken
        {
            get;
            set;
        }

        public static TokenManager TokenManager
        {
            get
            {
                TokenManager tokenManager;

                string consumerKey = Config.Global.Settings.FacebookConsumerKey;
                string consumerSecret = Config.Global.Settings.FacebookConsumerSecret;
                string callbackUrl = Config.Global.Settings.FacebookCallbackUrl;
                tokenManager = new TokenManager(consumerKey, consumerSecret, callbackUrl);
                return tokenManager;
            }
        }
        /// <summary>
        /// Bắn sang facebook
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="message"></param>
        /// <param name="name"></param>
        /// <param name="link"></param>
        /// <param name="picture"></param>
        /// <param name="caption"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        public static ResponeType FeedToFacebook(string accessToken, string message, string name, string link, string picture, string caption, string description)
        {
            FacebookService facebookOAuth = null;
            try
            {
                facebookOAuth = new FacebookService(accessToken);
            }
            catch { facebookOAuth = null; }
            if ((accessToken.Equals(string.Empty)) || (facebookOAuth == null))
            {
                return ResponeType.Unauthorized;
            }
            WallFeed wallFeed = new WallFeed
            {
                Message = message,
                Name = name,
                Link = link,
                Picture = picture,
                Caption = caption,
                Description = description
            };

            string output;
            return facebookOAuth.PostToWall(accessToken, wallFeed, out output);
        }
    }
}

