using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using DataContext;
using Config.Pattern;

namespace WorkFlowBLL
{
    public class Dashboard
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static Dashboard Instance
        {
            get
            {
                return Singleton<Dashboard>.Instance;
            }
        }
        #endregion

        #region SALES PRODUCTIVITY
        
        public List<uspProductivityRetailMonthlySnapshotResult> ProductivityRetailMonthlySnapshot(string app)
        {
            return DbDashboard.ContentInstance.uspProductivityRetailMonthlySnapshot(app).ToList();
        }

        public List<uspProductivityRetailMonthlyBranchVsACResult> ProductivityRetailMonthlyBranchVsAC(string productName, string channel)
        {
            return DbDashboard.ContentInstance.uspProductivityRetailMonthlyBranchVsAC(productName, channel).ToList();
        }
        public List<uspProductivityRetailMonthlyActualTableCurrentResult> ProductivityRetailMonthlyActualTableCurrent()
        {
            return DbDashboard.ContentInstance.uspProductivityRetailMonthlyActualTableCurrent().ToList();
        }

        public List<uspProductivityRetailMonthlyActualTablePreviousResult> ProductivityRetailMonthlyActualTablePrevious()
        {
            return DbDashboard.ContentInstance.uspProductivityRetailMonthlyActualTablePrevious().ToList();
        }
        
        
        #endregion

        #region WEEKLY CEO DASHBOARD
        public List<uspCeoProductivityChartResult> CeoProductivityChart(string date, string segment, string product)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoProductivityChart(Convert.ToDateTime(date, culture), segment, product).ToList();
        }

        public uspCeoTimeResult GetCeoTime(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoTime(Convert.ToDateTime(date, culture)).FirstOrDefault();
        }

        public List<uspCeoSummaryResult> GetCeoSummary(string date, int title)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoSummary(Convert.ToDateTime(date, culture), title).ToList();
        }

        public List<uspCeoSpeedometerResult> GetCeoSpeedometer(string date, string product)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoSpeedometer(Convert.ToDateTime(date, culture), product).ToList();
        }

        public List<uspCeoSpeedometerGetOtherInfoResult> GetOtherInfoCeoSpeedometer(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoSpeedometerGetOtherInfo(Convert.ToDateTime(date, culture)).ToList();
        }

        public List<uspCeoProductivityTableResult> GetCeoProductivityTable(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoProductivityTable(Convert.ToDateTime(date, culture)).ToList();
        }

        public List<uspCeoPerformanceResult> GetCeoPerformance(string date, int table)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoPerformance(Convert.ToDateTime(date, culture), table).ToList();
        }

        public List<uspCeoProductivityRetailResult> GetCeoProductivityRetail(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoProductivityRetail(Convert.ToDateTime(date, culture)).ToList();
        }

        public List<uspCeoProductivitySmeResult> GetCeoProductivitySme(string date, int loaibigloan)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoProductivitySme(Convert.ToDateTime(date, culture), loaibigloan).ToList();
        }

        public List<uspCeoGetDateResult> GetCeoDate()
        {
            return DbDashboard.ContentInstance.uspCeoGetDate().ToList();
        }

        public List<uspCeoRetailResult> GetCeoRetail(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoRetail(Convert.ToDateTime(date, culture)).ToList();
        }

        public List<uspCeoSmeResult> GetCeoSme(string date)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspCeoSme(Convert.ToDateTime(date, culture)).ToList();
        }

        #endregion

        #region RETAIL PARAMETER TRACKING

        public List<uspTrackingDailyRetailParameterFTDResult> TrackingDailyRetailParameterFTD(string date, string channel, string region)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspTrackingDailyRetailParameterFTD(Convert.ToDateTime(date, culture), channel, region).ToList();
        }

        public List<uspTrackingDailyRetailParameterMTDResult> TrackingDailyRetailParameterMTD(string date, string channel, string region)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspTrackingDailyRetailParameterMTD(Convert.ToDateTime(date, culture), channel, region).ToList();
        }

        public List<uspTrackingMonthlyRetailCustomersResult> TrackingMonthlyRetailCustomers(string month, string channel)
        {
            return DbDashboard.ContentInstance.uspTrackingMonthlyRetailCustomers(month, channel).ToList();
        }

        public List<uspTrackingGetMonthResult> TrackingGetMonth()
        {
            return DbDashboard.ContentInstance.uspTrackingGetMonth().ToList();
        }

        public List<uspTrackingWeeklySMEParameterResult> TrackingWeeklySMEParameter(string date, string region, string branch)
        {
            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            return DbDashboard.ContentInstance.uspTrackingWeeklySMEParameter(Convert.ToDateTime(date, culture), region, branch).ToList();
        }

        public List<uspTrackingWeeklySMEParameterGetBranchResult> TrackingWeeklySMEParameterGetBranch(string region)
        {
            return DbDashboard.ContentInstance.uspTrackingWeeklySMEParameterGetBranch(region).ToList();
        }

        public List<uspTrackingWeeklySMEParameterGetDateResult> TrackingWeeklySMEParameterGetDate()
        {
            return DbDashboard.ContentInstance.uspTrackingWeeklySMEParameterGetDate().ToList();
        }

        public uspTrackingGetLastDateResult TrackingGetLastDate()
        {
            return DbDashboard.ContentInstance.uspTrackingGetLastDate().ToList().FirstOrDefault();
        }

        #endregion

        #region DAILY RETAIL TAT                

        /* NEW TAT ------------------------- */

        public List<uspTATApplicationResult> TATApplication(int type)
        {
            return DbDashboard.ContentInstance.uspTATApplication(type).ToList();
        }

        public List<uspTATApplicationByProductResult> TATApplicationByProduct(int type)
        {
            return DbDashboard.ContentInstance.uspTATApplicationByProduct(type).ToList();
        }

        public List<uspTATApplicationGetChartResult> TATApplicationGetChart()
        {
            return DbDashboard.ContentInstance.uspTATApplicationGetChart().ToList();
        }

        public List<uspTATApplicationByProductGetChartResult> TATApplicationByProductGetChart()
        {
            return DbDashboard.ContentInstance.uspTATApplicationByProductGetChart().ToList();
        }



        public List<uspTATApplicationErsResult> TATApplicationErs(int type)
        {
            return DbDashboard.ContentInstance.uspTATApplicationErs(type).ToList();
        }

        public List<uspTATApplicationByProductErsResult> TATApplicationByProductErs(int type)
        {
            return DbDashboard.ContentInstance.uspTATApplicationByProductErs(type).ToList();
        }

        public List<uspTATApplicationGetChartErsResult> TATApplicationGetChartErs()
        {
            return DbDashboard.ContentInstance.uspTATApplicationGetChartErs().ToList();
        }

        public List<uspTATApplicationByProductGetChartErsResult> TATApplicationByProductGetChartErs()
        {
            return DbDashboard.ContentInstance.uspTATApplicationByProductGetChartErs().ToList();
        }



        public List<uspTATDateResult> TATDate()
        {
            return DbDashboard.ContentInstance.uspTATDate().ToList();
        }

        public List<uspTATByVpbResult> TATByVpb(string product)
        {
            return DbDashboard.ContentInstance.uspTATByVpb(product).ToList();
        }

        public List<uspTATByStageResult> TATByStage(string product)
        {
            return DbDashboard.ContentInstance.uspTATByStage(product).ToList();
        }

        public List<uspTATCommentResult> TATComment()
        {
            return DbDashboard.ContentInstance.uspTATComment().ToList();
        }

        public List<uspTATSlaResult> TATSla()
        {
            return DbDashboard.ContentInstance.uspTATSla().ToList();
        }

        #endregion

        #region INCENTIVE ANALYSIS
        public List<uspIncentiveCurrentMonthResult> IncentiveCurrentMonth()
        {
            return DbDashboard.ContentInstance.uspIncentiveCurrentMonth().ToList();
        }

        public List<uspIncentiveByBusinessResult> IncentiveByBusiness()
        {
            return DbDashboard.ContentInstance.uspIncentiveByBusiness().ToList();
        }

        public List<uspIncentiveByPositionResult> IncentiveByPosition(string product)
        {
            return DbDashboard.ContentInstance.uspIncentiveByPosition(product).ToList();
        }

        public List<uspIncentiveRetailResult> IncentiveRetail(string month)
        {
            return DbDashboard.ContentInstance.uspIncentiveRetail(month).ToList();
        }

        public List<uspIncentiveSmeResult> IncentiveSme(string month)
        {
            return DbDashboard.ContentInstance.uspIncentiveSme(month).ToList();
        }

        #endregion

        #region TRANSFORMATION METRICS

        public List<uspTransformationMetricsSalesResult> TransformationMetricsSales()
        {
            return DbDashboard.ContentInstance.uspTransformationMetricsSales().ToList();
        }

        #endregion

        #region KEY INDICATOR

        public List<uspKeyIndicatorResult> KeyIndicator(string pic, int year)
        {
            return DbDashboard.ContentInstance.uspKeyIndicator(pic, year).ToList();
        }

        public uspKeyIndicatorGetInfoResult KeyIndicatorGetInfo(int id)
        {
            return DbDashboard.ContentInstance.uspKeyIndicatorGetInfo(id).ToList().FirstOrDefault();
        }

        public int UpdateKeyIndicator(int id, string indicator, string unit, float? t1, float? t2, float? t3, float? t4, float? t5,
            float? t6, float? t7, float? t8, float? t9, float? t10, float? t11, float? t12)
        {
            return DbDashboard.ContentInstance.uspKeyIndicatorUpdate(id, indicator, unit, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12);
        }

        public List<uspRetailBomActualResult> GetListRetailBomActual(int channel)
        {
            return DbDashboard.ContentInstance.uspRetailBomActual(channel).ToList();
        }

        public List<uspRetailBomTargetResult> GetListRetailBomTarget(int channel)
        {
            return DbDashboard.ContentInstance.uspRetailBomTarget(channel).ToList();
        }

        #endregion

        #region SME INCENTIVE PAYOUT
        public uspSmeIncentiveOverviewResult SmeIncentiveOverview(int year, int month)
        {
            return DbDashboard.ContentInstance.uspSmeIncentiveOverview(year, month).FirstOrDefault();
        }

        public List<uspSmeIncentiveByMonthResult> SmeIncentiveByMonth(int year)
        {
            return DbDashboard.ContentInstance.uspSmeIncentiveByMonth(year).ToList();
        }

        public List<uspSmeIncentivePayoutResult> SmeIncentivePayout(int year, int month)
        {
            return DbDashboard.ContentInstance.uspSmeIncentivePayout(year, month).ToList();
        }

        public List<uspSmeIncentiveTopSalemanResult> SmeIncentiveTopSaleman(int year, int month, string by)
        {
            return DbDashboard.ContentInstance.uspSmeIncentiveTopSaleman(year, month, by).ToList();
        }

        public List<uspSmeIncentiveContributionResult> SmeIncentiveContribution(int year, int month)
        {
            return DbDashboard.ContentInstance.uspSmeIncentiveContribution(year, month).ToList();
        }

        #endregion
    }
}
