//
// Author:      hoan.trinh
// Create Date: 2010-01-08
// Description: Các hàm xử lý chung
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Globalization;
using System.Web;
using System.Net;
using System.IO;
using System.Net.NetworkInformation;

namespace Library
{
    public class Lib
    {
        /// <summary>
        /// Lấy giá trị của Property của object
        /// </summary>
        /// <param name="obj">object chứa property</param>
        /// <param name="property">tên property</param>
        /// <returns></returns>
        public static object GetProperty(object obj, string property)
        {
            var objPro = obj.GetType().GetProperty(property);
            if (objPro == null) return null;
            return objPro.GetValue(obj, null);
        }
        /// <summary>
        /// Format FulltextSearch
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string FormatFullTextSearch(string value)
        {
            if (string.IsNullOrEmpty(value.Trim()))
            {
                return "\"\"";
            }
            value = value.Trim();
            bool isNhayKeps = false;
            List<string> lstWord = new List<string>();
            List<string> lstAND = new List<string>();
            string str = "";
            for (int i = 0; i < value.Length; i++)
            {
                if (value[i] == '"')
                {
                    if (!isNhayKeps)
                    {
                        if (!string.IsNullOrEmpty(str.Trim()))
                        {
                            lstAND.Add(str.Trim());
                        }
                        str = value[i].ToString();
                        isNhayKeps = true;
                    }
                    else
                    {
                        str = str.Trim() + value[i];
                        if (str.Length > 2)
                        {
                            lstWord.Add(str);
                        }
                        isNhayKeps = false;
                        str = "";
                    }
                }
                else
                {
                    str += value[i];
                }
            }
            str = str.Trim();
            if (!string.IsNullOrEmpty(str))
            {
                if (str.StartsWith("\""))
                {
                    if (!str.EndsWith("\""))
                    {
                        str += '"';
                        lstWord.Add(str);
                    }
                }
                else
                {
                    lstAND.Add(str);
                }
            }
            string strRet = "";

            foreach (string s in lstAND)
            {
                foreach (string s1 in s.Split(' '))
                {
                    lstWord.Add('"' + s1 + '"');
                }
            }

            foreach (string s in lstWord.Distinct())
            {
                strRet += s + " AND ";
            }
            if (!string.IsNullOrEmpty(strRet))
            {
                strRet = strRet.Remove(strRet.Length - 5);
            }
            return strRet;
        }

        /// <summary>
        /// Lấy ngày tháng từ xâu ngày tháng theo chuẩn Việt Nam
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static DateTime? GetDateTime(string value)
        {
            try
            {
                value = value.Trim();
                if (string.IsNullOrEmpty(value)) return null;
                IFormatProvider provide = new CultureInfo("vi-VN");
                return Convert.ToDateTime(value, provide);
            }
            catch (Exception)
            {
                return null;
            }

        }

        /// <summary>
        /// Thay thế các kí tự đặc biệt thành các ảnh Emotion
        /// </summary>
        /// <param name="Input"></param>
        /// <returns></returns>
        public static string ReplaceEmotion(string Input)
        {
            string strTemp = string.Empty;
            string strReturn = string.Empty;
            foreach (char c in Input)
            {
                strReturn += c;
                strTemp += c;
                if (strTemp.IndexOf(":(") > -1)
                {
                    strReturn = strReturn.Replace(":(", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/2.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(";;)") > -1)
                {
                    strReturn = strReturn.Replace(";;)", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/5.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(";)") > -1)
                {
                    strReturn = strReturn.Replace(";)", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/3.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":D") > -1)
                {
                    strReturn = strReturn.Replace(":D", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/4.gif' />");
                    strTemp = string.Empty;
                }

                if (strTemp.IndexOf(":-/") > -1)
                {
                    strReturn = strReturn.Replace(":-/", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/6.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":x") > -1)
                {
                    strReturn = strReturn.Replace(":x", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/7.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":P") > -1)
                {
                    strReturn = strReturn.Replace(":P", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/8.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":*") > -1)
                {
                    strReturn = strReturn.Replace(":*", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/9.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf("=((") > -1)
                {
                    strReturn = strReturn.Replace("=((", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/10.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":o") > -1)
                {
                    strReturn = strReturn.Replace(":o", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/11.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf("B-)") > -1)
                {
                    strReturn = strReturn.Replace("B-)", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/13.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":-S") > -1)
                {
                    strReturn = strReturn.Replace(":-S", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/14.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":|") > -1)
                {
                    strReturn = strReturn.Replace(":|", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/16.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf("@-)") > -1)
                {
                    strReturn = strReturn.Replace("@-)", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/15.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":^)") > -1)
                {
                    strReturn = strReturn.Replace(":^)", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/12.gif' />");
                    strTemp = string.Empty;
                }
                if (strTemp.IndexOf(":)") > -1)
                {
                    strReturn = strReturn.Replace(":)", "<img src='/plugin/editor/tiny_mce/plugins/emotions/img/1.gif' />");
                    strTemp = string.Empty;
                }
            }
            return strReturn;
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
        /// <summary>
        /// Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1,234,123
        /// </summary>
        /// <param name="argValue"></param>
        /// <returns></returns>
        public static string FormatMoney(long argValue)
        {
            var _comma = (1 / 2.0).ToString().Substring(1, 1);
            var _digit = ".";
            if (_comma == ".")
            {
                _digit = ",";
            }
            var _sSign = "";
            if (argValue < 0)
            {
                _sSign = "-";
                argValue = -argValue;
            }
            var _sTemp = "" + argValue;
            var _index = _sTemp.IndexOf(_comma);

            var _digitExt = "";
            if (_index != -1)
            {
                _digitExt = _sTemp.Substring(_index + 1);
                _sTemp = _sTemp.Substring(0, _index);
            }

            var _sReturn = "";
            while (_sTemp.Length > 3)
            {
                _sReturn = _digit + _sTemp.Substring(_sTemp.Length - 3) + _sReturn;
                _sTemp = _sTemp.Substring(0, _sTemp.Length - 3);
            }
            _sReturn = _sSign + _sTemp + _sReturn;
            if (_digitExt.Length > 0)
            {
                _sReturn += _comma + _digitExt;
            }
            return _sReturn;
        }

        public static string FormatMoneyNew(object money)
        {
            if (money.ToString().Equals("0")) return "0";
            return Convert.ToDecimal(money).ToString("0,0").TrimStart('0').Replace(',', '.');
        }

        /// <summary>
        /// Hàm đọc nội dung File
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static string ReadFile(string filePath)
        {
            System.IO.StreamReader streamReader = null;
            try
            {
                streamReader = new System.IO.StreamReader(filePath);
                return streamReader.ReadToEnd();
            }
            finally
            {
                streamReader.Close();
            }
        }

        public static string SubString(string value, int length, string extend)
        {
            if (value.Length < length) return value;
            return value.Substring(0, length) + extend;
        }

        /// <summary>
        /// convert usernick au -> unicode
        /// </summary>
        /// <param name="sContent"></param>
        /// <returns></returns>
        public static string UnicodeCompoundConvert(string sContent)
        {
            string sUCS2Lower = "aÌ|aì|aÒ|aÞ|aò|AÌ|Aì|AÒ|AÞ|Aò|â|âÌ|âì|âÒ|âÞ|âò|Â|ÂÌ|Âì|ÂÒ|ÂÞ|Âò|ã|ãÌ|ãì|ãÒ|ãÞ|ãò|Ã|ÃÌ|Ãì|ÃÒ|ÃÞ|Ãò|oÌ|oì|oÒ|oÞ|oò|OÌ|Oì|OÒ|OÞ|Oò|ô|ôÌ|ôì|ôÒ|ôÞ|ôò|Ô|ÔÌ|Ôì|ÔÒ|ÔÞ|Ôò|õ|õÌ|õì|õÒ|õÞ|õò|Õ|ÕÌ|Õì|ÕÒ|ÕÞ|Õò|eÌ|eì|eÒ|eÞ|eò|EÌ|Eì|EÒ|EÞ|Eò|ê|êÌ|êì|êÒ|êÞ|êò|Ê|ÊÌ|Êì|ÊÒ|ÊÞ|Êò|uÌ|uì|uÒ|uÞ|uò|UÌ|Uì|UÒ|UÞ|Uò|ý|ýÌ|ýì|ýÒ|ýÞ|ýò|Ý|ÝÌ|Ýì|ÝÒ|ÝÞ|Ýò|iÌ|iì|iÒ|iÞ|iò|IÌ|Iì|IÒ|IÞ|Iò|yÌ|yì|yÒ|yÞ|yò|YÌ|Yì|YÒ|YÞ|Yò|ð|Ð";
            string sUTF8Lower = "à|á|ả|ã|ạ|À|Á|Ả|Ã|Ạ|â|ầ|ấ|ẩ|ẫ|ậ|Â|Ầ|Ấ|Ẩ|Ẫ|Ậ|ă|ằ|ắ|ẳ|ẵ|ặ|Ă|Ằ|Ắ|Ẳ|Ẵ|Ặ|ò|ó|ỏ|õ|ọ|Ò|Ó|Ỏ|Õ|Ọ|ô|ồ|ố|ổ|ỗ|ộ|Ô|Ồ|Ố|Ổ|Ỗ|Ộ|ơ|ờ|ớ|ở|ỡ|ợ|Ơ|Ờ|Ớ|Ở|Ỡ|Ợ|è|é|ẻ|ẽ|ẹ|È|É|Ẻ|Ẽ|Ẹ|ê|ề|ế|ể|ễ|ệ|Ê|Ề|Ế|Ể|Ễ|Ệ|ù|ú|ủ|ũ|ụ|Ù|Ú|Ủ|Ũ|Ụ|ư|ừ|ứ|ử|ữ|ự|Ư|Ừ|Ứ|Ử|Ữ|Ự|ì|í|ỉ|ĩ|ị|Ì|Í|Ỉ|Ĩ|Ị|ỳ|ý|ỷ|ỹ|ỵ|Ỳ|Ý|Ỷ|Ỹ|Ỵ|đ|Đ";
            string[] aUTF8Lower = sUTF8Lower.Split(new char[] { '|' });
            string[] aUCS2Lower = sUCS2Lower.Split(new char[] { '|' });
            int nLimitChar;
            nLimitChar = aUTF8Lower.GetUpperBound(0);
            for (int i = 0; i <= nLimitChar; i++)
            {
                sContent = sContent.Replace(aUCS2Lower[i], aUTF8Lower[i]);
            }
            return sContent;
        }

        public static string GetAddressIp()
        {
            string ip = string.Empty;
            if (string.IsNullOrEmpty(HttpContext.Current.Request.Headers["CITRIX"]))
            {
                ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            else
            {
                ip = HttpContext.Current.Request.Headers["CITRIX"];
            }
            return ip;
        }

        public static string GetAddressIp1()
        {
            string ipList = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            String hostName = System.Net.Dns.GetHostName();
            IPHostEntry localIpAddresses = Dns.GetHostEntry(hostName);

            return localIpAddresses.ToString();  //HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
        }

        public static string GetIpReal(int type)
        {
            string ip = string.Empty;
            if (type == 1)
            {
                try
                {
                    string strHostName = string.Empty;
                    strHostName = Dns.GetHostName();
                    IPHostEntry ipEntry = Dns.GetHostByName(strHostName);
                    IPAddress[] addr = ipEntry.AddressList;
                    if (addr[0].ToString() != null && addr[0].ToString() != "")
                    {
                        ip = addr[0].ToString();
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(HttpContext.Current.Request.Headers["CITRIX"]))
                        {
                            ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                        }
                        else
                        {
                            ip = HttpContext.Current.Request.Headers["CITRIX"];
                        }
                    }
                }
                catch (Exception)
                {
                    if (string.IsNullOrEmpty(HttpContext.Current.Request.Headers["CITRIX"]))
                    {
                        ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                    }
                    else
                    {
                        ip = HttpContext.Current.Request.Headers["CITRIX"];
                    }
                }
            }
            else if (type == 2)
            {
                if (string.IsNullOrEmpty(HttpContext.Current.Request.Headers["CITRIX"]))
                {
                    ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                }
                else
                {
                    ip = HttpContext.Current.Request.Headers["CITRIX"];
                }
            }
            return ip;
        }

        public static string GetMacAddress()
        {
            try
            {
                NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
                return nics[0].GetPhysicalAddress().ToString();
            }
            catch
            {
                return null;
            }
        }

        public static int ReadFile()
        {
            try
            {

                string fileName = HttpContext.Current.Server.MapPath("~/Counter.txt");
                StreamReader objStreamReader;
                objStreamReader = File.OpenText(fileName);
                string sCounter = objStreamReader.ReadToEnd();
                int iCounter = int.Parse(sCounter.ToString());
                objStreamReader.Close();
                return iCounter;
            }
            catch
            {
                return -999;
            }
        }

        public static void WriteFile(int iCounter)
        {
            string fileName = HttpContext.Current.Server.MapPath("~/Counter.txt");
            StreamWriter objStreamWrite;
            objStreamWrite = File.CreateText(fileName);
            objStreamWrite.Write(iCounter.ToString());
            objStreamWrite.Close();
        }

        public static string GetDateString(DateTime strDatetime)
        {
            var now = strDatetime;
            if (strDatetime == null) now = DateTime.Now;
            var s = string.Empty;

            if (now.DayOfWeek == DayOfWeek.Sunday) s = "Chủ nhật,";
            else s = "Thứ " + ((int)(now.DayOfWeek) + 1) + ", ngày ";
            s += (now.Day < 10 ? "0" + now.Day : now.Day.ToString())
                + "/" + (now.Month < 10 ? "0" + now.Month : now.Month.ToString())
                + "/" + now.Year;
            return s;
        }
    }
}

