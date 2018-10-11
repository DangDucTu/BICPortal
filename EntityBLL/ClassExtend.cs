
using System.Collections.Generic;
namespace EntityBLL
{
    public class ClassExtend<TInfo, TList> : Config.Pattern.Prototype<ClassExtend<TInfo, TList>>
    {
        private int _totalRecord;
        /// <summary>
        /// Tổng số bản ghi
        /// </summary>
        public int TotalRecord
        {
            get { return _totalRecord; }
            set { _totalRecord = value; }
        }

        private TInfo _info;
        /// <summary>
        /// Thông tin
        /// </summary>
        public TInfo Info
        {
            get { return _info; }
            set { _info = value; }
        }

        private List<TList> _items;
        /// <summary>
        /// Danh sách các Item
        /// </summary>
        public List<TList> Items
        {
            get { return _items; }
            set { _items = value; }
        }

        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public ClassExtend()
        {
            _totalRecord = 0;
            _items = new List<TList>();
        }

        /// <summary>
        /// Hàm khởi tạo với các tham số của ClassExtend
        /// </summary>
        /// <param name="info">thông tin của đối tượng</param>
        /// <param name="items">danh sách các item của đối tượng</param>
        /// <param name="totalRecord">tổng số bản ghi của danh sách</param>
        public ClassExtend(TInfo info, List<TList> items, int totalRecord)
        {
            _info = info;
            _totalRecord = totalRecord;
            _items = items;
        }
    }
}
