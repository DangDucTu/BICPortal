//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2009.01.08
// Description: Mã hóa dữ liệu
//
using System.Text;
using System.Security.Cryptography;
using System;
using System.IO;

namespace Utils
{
    /// <summary>
    /// Thực hiện việc mã hóa dữ liệu
    /// </summary>
    public class EncryptionUtil
    {
        /// <summary>
        /// passPhrase là chuỗi 16 byte
        /// </summary>
        private static RijndaelEnhanced _RijndaelKey = new RijndaelEnhanced("@1C2c3D5E5F6g7H7");

        /// <summary>
        /// Mã hóa MD5 (mã hóa dữ liệu 1 chiều)
        /// </summary>
        public static string GetMd5(string input)
        {
            var x = new MD5CryptoServiceProvider();
            byte[] bs = Encoding.UTF8.GetBytes(input);
            bs = x.ComputeHash(bs);
            var s = new StringBuilder();
            foreach (byte b in bs)
            {
                s.Append(b.ToString("x2").ToLower());
            }
            return s.ToString();
        }

        /// <summary>
        /// Mã hóa theo thuật toán đối xứng Rijndael
        /// </summary>
        /// <param name="pliantext"></param>
        /// <returns></returns>
        public static string EncryptRijndael(string plaintext)
        {
            return _RijndaelKey.Encrypt(plaintext);
        }

        /// <summary>
        /// Giải mã theo thuật toán đối xứng Rijndael
        /// </summary>
        /// <param name="cipherText"></param>
        /// <returns></returns>
        public static string DecryptRijndael(string cipherText)
        {
            return _RijndaelKey.Decrypt(cipherText);
        }

        /// <summary>
        /// Mã hóa theo Base64 của một xâu
        /// Thay thế 2 ký tự '+' và '/' bằng '-' và '+'
        /// </summary>
        /// <param name="plainText"></param>
        /// <returns></returns>
        public static string ToBase64(string plainText)
        {
            byte[] arrPlainText = Encoding.UTF8.GetBytes(plainText.ToCharArray());
            string strOutput = Convert.ToBase64String(arrPlainText);
            strOutput = strOutput.Replace('+', '-');
            strOutput = strOutput.Replace('/', '_');
            return strOutput;
        }

        /// <summary>
        /// Giải mã dữ liệu Base64 của hàm trên
        /// </summary>
        /// <param name="base64Text"></param>
        /// <returns></returns>
        public static string FromBase64(string base64Text)
        {
            string strOutput = base64Text.Replace('_', '/');
            strOutput = strOutput.Replace('-', '+');

            byte[] arrOutput = Convert.FromBase64String(strOutput);

            return Encoding.UTF8.GetString(arrOutput);
        }

        /// <summary>
        /// Chuỗi kết nối CSDL
        /// </summary>
        public static string ConnectionString
        {
            get
            {                                
                //RijndaelEnhanced obj = new RijndaelEnhanced("benxenghean", "@1B2c3D4e5F6g7H8");
                //return obj.Decrypt(Config.Global.Settings.ConnectionString);
                return Config.Global.Settings.ConnectionString;
            }
        }

        public static string DashboardConnectionString
        {
            get
            {
                return Config.Global.Settings.DashboardConnectionString;
            }
        }

        public static string HRConnectionString
        {
            get
            {
                return Config.Global.Settings.HRConnectionString;
            }
        }


        private static byte[] SymmetricKey
        {
            get
            {
                return Encoding.UTF8.GetBytes("1B2c3D4e5F6g7H81");
            }
        }
        public static byte[] EncryptString(string data)
        {
            byte[] ClearData = Encoding.UTF8.GetBytes(data);
            SymmetricAlgorithm Algorithm = SymmetricAlgorithm.Create();
            Algorithm.Key = SymmetricKey;

            MemoryStream Target = new MemoryStream();
            Algorithm.GenerateIV();
            Target.Write(Algorithm.IV, 0, Algorithm.IV.Length);
            CryptoStream cs = new CryptoStream(Target, Algorithm.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(ClearData, 0, ClearData.Length);
            cs.FlushFinalBlock();
            return Target.ToArray();
        }
        public static string DecryptString(byte[] data)
        {
            SymmetricAlgorithm Algorithm = SymmetricAlgorithm.Create();
            Algorithm.Key = SymmetricKey;
            MemoryStream Target = new MemoryStream();
            int ReadPos = 0;
            byte[] IV = new byte[Algorithm.IV.Length];
            Array.Copy(data, IV, IV.Length);
            Algorithm.IV = IV;
            ReadPos += Algorithm.IV.Length;
            CryptoStream cs = new CryptoStream(Target,
            Algorithm.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(data, ReadPos, data.Length - ReadPos);
            cs.FlushFinalBlock();
            return Encoding.UTF8.GetString(Target.ToArray());
        }
    }
}
