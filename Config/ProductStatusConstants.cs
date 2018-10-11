using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Config
{
    public class ProductStatusConstants
    {

        public const int CategoryShow = 32;
        public const int ProductShow = 16;
        public const int ExistsProduct = 8;
        public const int isHot = 4;
        public const int isPromotion = 2;
        public const int isNotDelete = 1;
        /// <summary>
        /// Product được phép hiển thị trên portal
        /// </summary>
        public const int VISIBLE_PRODUCT_STATUS = 63;// 111111
        /// <summary>
        /// Set Status cho input
        /// </summary>
        /// <param name="input"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public static int SetStatus(int input, int status)
        {
            return input | status;
        }

        /// <summary>
        /// Clear status cho dữ liệu iput
        /// </summary>
        /// <param name="input"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public static int ClearStatus(int input, int status)
        {
            return input & (~status);
        }
    }
}
