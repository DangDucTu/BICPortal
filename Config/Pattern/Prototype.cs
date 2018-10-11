//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2008.11.08
// Description: Tạo Protope partern
//
using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace Config.Pattern
{
    [Serializable()]
    public abstract class Prototype<T>
    {
        /// <summary>
        /// Hàm Copy tới chính nó
        /// </summary>
        /// <returns>Đối tượng có kiểu dữ liệu tương ứng</returns>
        public T Clone()
        {
            return (T)this.MemberwiseClone();
        }

        /// <summary>
        /// Copy mức thấp
        /// </summary>
        /// <returns>Đối tượng có kiểu dữ liệu tương ứng</returns>
        public T DeepCopy()
        {
            MemoryStream stream = new MemoryStream();
            BinaryFormatter formatter = new BinaryFormatter();
            formatter.Serialize(stream, this);
            stream.Seek(0, SeekOrigin.Begin);
            T copy = (T)formatter.Deserialize(stream);
            stream.Close();
            return copy;
        }
    }
}
