using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utils
{
    public class BlogUtil
    {
        /// <summary>
        /// Chuyển xâu tag thành list danh sách các Tag
        /// </summary>
        /// <param name="tagString">Xâu các tag cách nhau dấu ','</param>
        /// <returns></returns>
        public static IEnumerable<string > ParseStringToTags(string tagString)
        {
            if (string.IsNullOrEmpty(tagString))
            {
                return null;
            }
            return tagString.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)
                    .Select(name => name.Trim().ToLowerInvariant()).Distinct();
        }

        /// <summary>
        /// Chuyển List danh sách các Tag thành chuỗi các Tag
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        public static string ParseTagsToString(IEnumerable<string> tags)
        {
            if (tags == null)
                return string.Empty;
            var tagString = tags.Aggregate("", (current, tag) => current + (tag + ", "));

            if (!string.IsNullOrEmpty(tagString))
            {
                tagString.TrimEnd(", ".ToCharArray());
            }
            return tagString;
        }

        /// <summary>
        /// Lấy class apply cho tag
        /// </summary>
        /// <param name="amountEntry"></param>
        /// <returns></returns>
        public static string GetTagClass(int amountEntry)
        {
            if (amountEntry < 10) return "tag0";
            if (amountEntry < 20) return "tag1";
            if (amountEntry < 30) return "tag2";
            if (amountEntry < 50) return "tag3";
            return "tag4";
        }

        private const string URL_CHARS_UNICODE
            = "AÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXYÝỲỴỶỸZaáàạảãâấầậẩẫăắằặẳẵbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôốồộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyýỳỵỷỹz0123456789_";
        private const string URL_CHARS_ANSI
            = "AAAAAAAAAAAAAAAAAABCDDEEEEEEEEEEEEFGHIIIIIIJKLMNOOOOOOOOOOOOOOOOOOPQRSTUUUUUUUUUUUUVWXYYYYYYZaaaaaaaaaaaaaaaaaabcddeeeeeeeeeeeefghiiiiiijklmnoooooooooooooooooopqrstuuuuuuuuuuuuvwxyyyyyyz0123456789_";
        private const string URL_CHARS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        /// <summary>
        /// Hàm Get URL Text của 1 xâu
        /// Mục đích: phục vụ cho SEO
        /// </summary>
        /// <param name="plainText">Xâu dữ liệu đầu vào</param>
        /// <returns>xâu dữ liệu đầu ra dưới dạng URL text</returns>
        public static string GetUrlText(string plainText)
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

            return strTemp.ToLower();
        }


        public static string SubString(string value, int length, string extend)
        {
            if (value.Length <= length) return value;
            while ((length > 0) && !IsSpaceCharactor(value[length]))
            {
                length--;
            }
            while ((length > 0) && IsSpaceCharactor(value[length]))
            {
                length--;
            }
            return value.Substring(0, length + 1) + extend;
        }

        public static bool IsSpaceCharactor(char c)
        {
            return char.IsWhiteSpace(c) || char.IsPunctuation(c);
        }
    }
}
