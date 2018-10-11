using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EntityBLL
{
    public class Image : Config.Pattern.Prototype<Image>
    {
        private int m_Type;
        /// <summary>
        /// Kiểu: 0 - Thư mục, 1 - Ảnh
        /// </summary>
        public int Type
        {
            get { return m_Type; }
            set { m_Type = value; }
        }

        private string m_Name;
        /// <summary>
        /// Tên ảnh
        /// </summary>
        public string Name
        {
            get { return m_Name; }
            set { m_Name = value; }
        }

        private string m_Size;
        /// <summary>
        /// Dung lượng
        /// </summary>
        public string Size
        {
            get { return m_Size; }
            set { m_Size = value; }
        }

        private string m_URL;
        /// <summary>
        /// Đường dẫn ảnh
        /// </summary>
        public string URL
        {
            get { return m_URL; }
            set { m_URL = value; }
        }

        private string m_Id;
        /// <summary>
        /// Id của ảnh
        /// </summary>
        public string Id
        {
            get { return m_Id; }
            set { m_Id = value; }
        }

    }
}
