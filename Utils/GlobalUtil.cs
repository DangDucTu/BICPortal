using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Utils
{
    /// <summary>
    /// Các hàm cơ bản bổ sung cho các kiểu dữ liệu
    /// </summary>
    public static class GlobalUtil
    {
        #region Apply new methods for string type
        /// <summary>
        /// Bổ sung hàm UrlDecode cho string
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string UrlDecode(this string input)
        {
            return HttpUtility.UrlDecode(input);
        }

        /// <summary>
        /// Bổ sung hàm UrlEncode cho string
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string UrlEncode(this string input)
        {
            return HttpUtility.UrlEncode(input);
        }

        private const string URL_CHARS_UNICODE
          = "AÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXYÝỲỴỶỸZaáàạảãâấầậẩẫăắằặẳẵbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôốồộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyýỳỵỷỹz0123456789_";
        private const string URL_CHARS_ANSI
            = "AAAAAAAAAAAAAAAAAABCDDEEEEEEEEEEEEFGHIIIIIIJKLMNOOOOOOOOOOOOOOOOOOPQRSTUUUUUUUUUUUUVWXYYYYYYZaaaaaaaaaaaaaaaaaabcddeeeeeeeeeeeefghiiiiiijklmnoooooooooooooooooopqrstuuuuuuuuuuuuvwxyyyyyyz0123456789_";
        private const string URL_CHARS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        public static string GetUrlText(this string plainText)
        {
            int iLength = plainText.Length;
            StringBuilder sBuilder = new StringBuilder(plainText);
            int iIndex = 0;
            // Loại bỏ các ký tự có dấu
            for (int i = 0; i < iLength; i++)
            {
                iIndex = URL_CHARS_UNICODE.IndexOf(plainText[i]);
                if (iIndex == -1)
                    sBuilder[i] = plainText[i];
                else
                    sBuilder[i] = URL_CHARS_ANSI[iIndex];
            }

            // Loại bỏ các ký tự lạ
            for (int i = 0; i < iLength; i++)
            {
                if (URL_CHARS_BASE.IndexOf(sBuilder[i]) == -1)
                {
                    sBuilder[i] = '-';
                }
            }

            // Trim các ký tự thừa "-"
            string strTemp = sBuilder.ToString();
            strTemp = strTemp.Trim('-');

            while (strTemp.IndexOf("--") != -1)
            {
                strTemp = strTemp.Replace("--", "-");
            }
            if (strTemp.Length > 60)
            {
                int _i = strTemp.IndexOf('-', 59);
                if (_i != -1)
                {
                    strTemp = strTemp.Substring(0, _i);
                }
            }

            return strTemp.ToLower();
        }
        #endregion
    }
}
