using Config.Pattern;
using DataContext;
using EntityBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WorkFlowBLL
{
    public class IssueTrackingBLL
    {
        #region Properties
        public static IssueTrackingBLL Instance
        {
            get
            {
                return Singleton<IssueTrackingBLL>.Instance;
            }
        }

        #endregion

        public ClassExtend<int, uspDataIssueListGetListResult> GetListIssueTracking(string account, int division, int status, int updating_status, string fromDate, string toDate, string issueCode, int page, int pagesize, string picbu, string picbic)
        {
            int? totalRecord = 0;
            ClassExtend<int, uspDataIssueListGetListResult> item = new ClassExtend<int, uspDataIssueListGetListResult>();
            item.Items = DbIssueTracking.ContentInstance.uspDataIssueListGetList(account, division, status, fromDate, toDate, issueCode, pagesize, page, picbu, picbic, updating_status, ref totalRecord).ToList();
            //item.Items = DbIssueTracking.ContentInstance.uspDataIssueListGetList(requestName, receiveFrom, receiveTo, department, account, status, pic, page, pagesize, ref totalRecord).ToList();
            item.TotalRecord = totalRecord.Value;
            return item;
        }
        public List<uspDataIssueGetListDivisionIDResult> GetListDivisionByAccount(string account)
        {
            return DbIssueTracking.ContentInstance.uspDataIssueGetListDivisionID(account).ToList();
        }
        public List<uspDataIssueGetListAllDivisionIDResult> GetListAllDivision()
        {
            return DbIssueTracking.ContentInstance.uspDataIssueGetListAllDivisionID().ToList();
        }
        public List<uspDataIssueGetListPicBiccResult> GetListPICBiccByAccount(string account)
        {
            return DbIssueTracking.ContentInstance.uspDataIssueGetListPicBicc().ToList();
        }

        public List<uspDataIssueGetInfoResult> GetIssueTrackingInfo(string account, int issueId)
        {
            return DbIssueTracking.ContentInstance.uspDataIssueGetInfo(account, issueId).ToList();
        }
        public int InsertIssueTracking(int divisionId, string picBICC, int status, DateTime issueCreateDate, string firstFeedbackDate, string summary, string description, string picBU, string currAssignee, string deadline, string finishDate, string agreeSolution, string note, string account)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            DateTime? FeedbackDate = null;
            if (!string.IsNullOrEmpty(firstFeedbackDate))
            {
                FeedbackDate = Convert.ToDateTime(firstFeedbackDate + " 18:00:00", culture);
            }
            DateTime? Deadline = null;
            if (!string.IsNullOrEmpty(deadline))
            {
                Deadline = Convert.ToDateTime(deadline + " 18:00:00", culture);
            }
            DateTime? FinishDate = null;
            if (!string.IsNullOrEmpty(finishDate))
            {
                FinishDate = Convert.ToDateTime(finishDate + " 18:00:00", culture);
            }
            return DbIssueTracking.ContentInstance.uspDataIssueListInsert(account, divisionId, status, DateTime.Now, summary, agreeSolution, description, note, FeedbackDate, currAssignee, issueCreateDate, Deadline, picBU, picBICC, FinishDate);
        }

        public int UpdateIssueTracking(int issueCode, int divisionId, string picBICC, int status, string issueCreateDate, string firstFeedbackDate, string summary, string description, string picBU, string currAssignee, string deadline, string finishDate, string agreeSolution, string note, string account)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            DateTime? FeedbackDate = null;
            if (!string.IsNullOrEmpty(firstFeedbackDate))
            {
                FeedbackDate = Convert.ToDateTime(firstFeedbackDate + " 18:00:00", culture);
            }
            DateTime? Deadline = null;
            if (!string.IsNullOrEmpty(deadline))
            {
                Deadline = Convert.ToDateTime(deadline + " 18:00:00", culture);
            }
            DateTime? FinishDate = null;
            if (!string.IsNullOrEmpty(finishDate))
            {
                FinishDate = Convert.ToDateTime(finishDate + " 18:00:00", culture);
            }
            return DbIssueTracking.ContentInstance.uspDataIssueUpdate(account, divisionId, issueCode, status, summary, agreeSolution, description, note, FeedbackDate, currAssignee, Convert.ToDateTime(issueCreateDate + " 18:00:00", culture), Deadline, FinishDate, picBU, picBICC);
        }

        public int ConfirmIssueTracking(int issueCode, string account)
        {
            return DbIssueTracking.ContentInstance.uspDataIssueConfirm(account, issueCode);
        }

        public uspDataIssueCheckAccountResult CheckAccountPermission(string account)
        {
            return DbIssueTracking.ContentInstance.uspDataIssueCheckAccount(account).FirstOrDefault();
        }

        public int DeleteIssueTrackingByInfo(int issueId, string account)
        {
            try
            {
                return DbIssueTracking.ContentInstance.uspDataIssueDelete(account, issueId.ToString());
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
