using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Config.Pattern;
using DataContext;
using EntityBLL;

namespace WorkFlowBLL
{
    public class HR
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static HR Instance
        {
            get
            {
                return Singleton<HR>.Instance;
            }
        }
        #endregion

        public ClassExtend<int, uspHRGetListResult> GetListHR(string saleSupport, string saleCode, string saleName, string team, int page, int pageSize)
        {
            int? totalRecord = 0;
            ClassExtend<int, uspHRGetListResult> item = new ClassExtend<int, uspHRGetListResult>();
            item.Items = DbHR.ContentInstance.uspHRGetList(saleSupport, saleCode, saleName, team, page, pageSize, ref totalRecord).ToList();
            item.TotalRecord = totalRecord.Value;
            return item;
        }

        public List<uspHRGetTeamResult> GetListTeam()
        {
            return DbHR.ContentInstance.uspHRGetTeam(Utils.AdminUtil.AdminName).ToList();
        }

        public List<uspHrChannelGetListResult> GetListChannel()
        {
            return DbHR.ContentInstance.uspHrChannelGetList(Utils.AdminUtil.AdminName).ToList();
        }

        public List<uspHrPositionGetListResult> GetListPosition(string channel)
        {
            return DbHR.ContentInstance.uspHrPositionGetList(Utils.AdminUtil.AdminName, channel).ToList();
        }

        public List<uspHrSubPositionGetListResult> GetListSubPosition(string channel, string position)
        {
            return DbHR.ContentInstance.uspHrSubPositionGetList(Utils.AdminUtil.AdminName, channel, position).ToList();
        }

        public int InsertHr(string dao, string hrStaff, string saleName, string gender, string branchCode, string channel, string team, string position,
            string subPosition, string dateStart, string nationalId, string phone, string dob, string email, string payroll, string address, string note)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbHR.ContentInstance.uspHrInsert(Utils.AdminUtil.AdminName, dao, hrStaff, Utils.StringUtil.RemoveSign4VietnameseString(saleName).ToUpper(), saleName, gender, branchCode, channel,
                team, position, subPosition, Convert.ToDateTime(dateStart, culture), nationalId, phone,Convert.ToDateTime(dob, culture), email, payroll, address, note);
        }

        public int UpdateHr(string saleCode, string dao, string hrStaff, string saleName, string gender, string channel, string team, string dateStart, string nationalId, string phone, string dob, string email, string payroll, string address, string note)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbHR.ContentInstance.uspHrUpdate(Utils.AdminUtil.AdminName, saleCode, dao, hrStaff, Utils.StringUtil.RemoveSign4VietnameseString(saleName).ToUpper(), saleName, gender,
                channel, team, Convert.ToDateTime(dateStart, culture), nationalId, phone, Convert.ToDateTime(dob, culture), email, payroll, address, note);
        }

        public uspHrGetInfoResult GetInfoHr(string saleCode)
        {
            return DbHR.ContentInstance.uspHrGetInfo(saleCode).FirstOrDefault();
        }

        public int SaleOffHr(string saleCode, string dateOff)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbHR.ContentInstance.uspHrSaleOff(Utils.AdminUtil.AdminName, saleCode, Convert.ToDateTime(dateOff, culture));
        }

        public List<uspHRGetListNewSalesResult> GetListNewSalesHR(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbHR.ContentInstance.uspHRGetListNewSales(Utils.AdminUtil.AdminName, Convert.ToDateTime(date, culture)).ToList();
        }

        public List<uspHrGetListByMonthResult> GetListSalesByMonth(string month)
        {
            return DbHR.ContentInstance.uspHrGetListByMonth(Utils.AdminUtil.AdminName, month).ToList();
        }
    }
}