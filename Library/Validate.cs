//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2008.11.08
// Description: Thẩm định dữ liệu
//
using System;
using System.Text.RegularExpressions;

namespace Library
{
    /// <summary>
    /// Thẩm định dữ liệu
    /// </summary>
    public class Validate
    {
        /// <summary>
        /// Kiểm tra 1 xâu có phải là xâu số không
        /// </summary>
        /// <param name="_strValue">Xâu cần kiểm tra</param>
        /// <returns></returns>
        public static bool IsNumber(string _strValue)
        {
            Regex regex = new Regex(@"^[-+]?[0-9]*\.?[0-9]+$");
            return regex.IsMatch(_strValue);
        }

        /// <summary>
        /// Kiểm tra 1 xâu có phải là số nguyên (32 bit)
        /// </summary>
        /// <param name="_strValue">Xâu cần kiểm tra</param>
        /// <returns></returns>
        public static Boolean IsInterger(string _strValue)
        {
            if (_strValue == null) return false;
            try
            {
                Convert.ToInt32(_strValue);
            }
            catch
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Kiểm tra xâu là 1 số nguyên (32 bit) không dấu
        /// </summary>
        /// <param name="_strValue">Xâu kiểm tra</param>
        /// <returns></returns>
        public static Boolean IsUInterger(string _strValue)
        {
            if (_strValue == null) return false;
            try
            {
                Convert.ToUInt32(_strValue);
            }
            catch
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Kiểm tra 1 xâu có phải là xâu số nguyên (64 bit)
        /// </summary>
        /// <param name="_strValue">Xâu kiểm tra</param>
        /// <returns></returns>
        public static Boolean IsLong(string _strValue)
        {
            if (_strValue == null) return false;
            try
            {
                Convert.ToInt64(_strValue);
            }
            catch
            {
                return false;
            }
            return true;

        }

        /// <summary>
        /// Kiểm tra 1 xâu có phải là xâu số nguyên (64 bit) không dấu
        /// </summary>
        /// <param name="_strValue">Xâu kiểm tra</param>
        /// <returns></returns>
        public static Boolean IsULong(string strValue)
        {
            if (strValue == null) return false;
            try
            {
                Convert.ToUInt64(strValue);
            }
            catch
            {
                return false;
            }
            return true;

        }

        /// <summary>
        /// Kiểm tra 1 xâu có  phải là Email hay không
        /// </summary>
        /// <param name="strEmail">Xâu kiểm tra</param>
        /// <returns></returns>
        public static Boolean IsEmail(string _strEmail)
        {
            Regex reg = new Regex(@"^[a-z0-9_]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$", RegexOptions.IgnoreCase);
            try
            {
                return reg.IsMatch(_strEmail);
            }
            catch
            {
                return false;
            }
        }
        /// <summary>
        /// Kiểm tra 1 xâu xem có phải là Url hay không
        /// </summary>
        /// <param name="_url">Url cần kiểm tra</param>
        /// <returns>True is url</returns>
        static public bool IsURL(string _url)
        {
            Regex reg = new Regex(@"^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&%\$#\=~])*[^\.\,\)\(\s]$", RegexOptions.IgnoreCase);
            try
            {
                return reg.IsMatch(_url);
            }
            catch
            {
                return false;
            }
        }
    }
}