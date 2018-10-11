using Config.Pattern;
using DataContext;
using EntityBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WorkFlowBLL
{
    public class RequestReportBll
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static RequestReportBll Instance
        {
            get
            {
                return Singleton<RequestReportBll>.Instance;
            }
        }
        #endregion
        public int InsertReportList(string requestName, string client, string emailClient, int requestType, string receive, int requestStatus, string deadline, string account, int requestSendType, string reportCode, string requestDescription, string frequency, int noTracerReceived, int noTracerSolved, string requestReasonCan, string requestDiscussMan, string requestInformClient)
        {
            return DbRequestReport.ContentInstance.uspRequestReportListInsert(requestName, client, emailClient, requestType, receive, requestStatus, deadline, account, requestSendType, reportCode, requestDescription, frequency, noTracerReceived, noTracerSolved, requestReasonCan, requestDiscussMan, requestInformClient);
        }
        public int UpdateReportList(int reportListId, string requestName, string client, string emailClient, int requestType, string receive, int requestStatus, string deadline, string account, int requestSendType, string reportCode, string requestDescription, string frequency, int noTracerReceived, int noTracerSolved, string requestReasonCan, string requestDiscussMan, string requestInformClient)
        {
            return DbRequestReport.ContentInstance.uspRequestReportListUpdate(requestName, reportListId, client, emailClient, requestType, receive, requestStatus, deadline, requestSendType, reportCode, requestDescription, frequency, noTracerReceived, noTracerSolved, requestReasonCan, requestDiscussMan, requestInformClient);
        }
        public ClassExtend<int, uspRequestReportListGetListResult> GetListRequestReportList(string requestName, string receiveFrom, string receiveTo, int department, string account, int status, string pic, int page, int pagesize)
        {

            int? totalRecord = 0;
            ClassExtend<int, uspRequestReportListGetListResult> item = new ClassExtend<int, uspRequestReportListGetListResult>();
            item.Items = DbRequestReport.ContentInstance.uspRequestReportListGetList(requestName, receiveFrom, receiveTo, department, account, status, pic, page, pagesize, ref totalRecord).ToList();
            item.TotalRecord = totalRecord.Value;
            return item;
        }
        public List<uspRequestReportGetInfoResult> GetInfoReportList(int request_id)
        {
            return DbRequestReport.ContentInstance.uspRequestReportGetInfo(request_id).ToList();
        }
        public List<uspRequestReportGetInfoCreateReportResult> GetInfoRequestForReportList(int request_id, string accountName)
        {
            return DbRequestReport.ContentInstance.uspRequestReportGetInfoCreateReport(request_id,accountName).ToList();
        }
    }
}
