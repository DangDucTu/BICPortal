<%@ Application Language="C#" %>

<script runat="server">
    public static void RegisterRoutes(System.Web.Routing.RouteCollection routes)
    {
        routes.MapPageRoute("Login", "login/", "~/Pages/Login.aspx");
        routes.MapPageRoute("Home", "home/", "~/Pages/Default.aspx");
        routes.MapPageRoute("Function", "function/", "~/Pages/Function.aspx");
        routes.MapPageRoute("Role", "role/", "~/Pages/Role.aspx");
        routes.MapPageRoute("Account", "account/", "~/Pages/Admin.aspx");
        routes.MapPageRoute("Department", "department/", "~/Pages/Department.aspx");
        routes.MapPageRoute("Division", "division/", "~/Pages/Division.aspx");
        
        routes.MapPageRoute("ReportList", "report-list/", "~/Pages/report/ReportList.aspx");
        routes.MapPageRoute("ViewReport", "view-report/", "~/Pages/ViewReportNew.aspx");
        routes.MapPageRoute("MyReportList", "my-report-list/", "~/Pages/report/MyReportList.aspx");
        routes.MapPageRoute("ViewWorkTracker", "view-work-tracker/", "~/Pages/ViewReport.aspx");
        routes.MapPageRoute("AllReportList", "bicc-report-list", "~/Pages/report/ReportListForView.aspx");
        routes.MapPageRoute("ClientWorkTracker", "client-work-tracker/", "~/Pages/report/ClientReport.aspx");
        routes.MapPageRoute("ReportManager", "work-tracker/", "~/Pages/Report.aspx");
        routes.MapPageRoute("MemberReport", "my-work-tracker/", "~/Pages/MemberReport.aspx");
        routes.MapPageRoute("Download", "d/", "~/Pages/report/Download.aspx");
        routes.MapPageRoute("BiReport", "bi-report-list/", "~/Pages/report/BIReportList.aspx");
        routes.MapPageRoute("RequestManagement", "my-request-manager/", "~/Pages/report/RequestManagement.aspx");
        	

        routes.MapPageRoute("SalesProductivity", "retail-sales-productivity/", "~/Pages/charts/SalesProductivity.aspx");
        routes.MapPageRoute("SalesProductivityVi", "retail-sales-productivity-vi/", "~/Pages/charts/SalesProductivity_vi.aspx");
        
        routes.MapPageRoute("WeeklyCeoDashboard", "weekly-ceo-dashboard/", "~/Pages/charts/WeeklyCeoDashboardV2.aspx");
        routes.MapPageRoute("WeeklyCeoDashboardVi", "weekly-ceo-dashboard-vi/", "~/Pages/charts/WeeklyCeoDashboard_vi.aspx");
        
        routes.MapPageRoute("RetailParameterTracking", "retail-parameter-tracking/", "~/Pages/charts/RetailParameterTracking.aspx");
        routes.MapPageRoute("SmelParameterTracking", "sme-parameter-tracking/", "~/Pages/charts/SmeParameterTracking.aspx");

        routes.MapPageRoute("TATForCeo", "weekly-retail-application-pipeline-tat-report/", "~/Pages/charts/TATDashboardForCeo.aspx");
        routes.MapPageRoute("TATForCeoVi", "weekly-retail-application-pipeline-tat-report-vi/", "~/Pages/charts/TATDashboardForCeo_vi.aspx");

        routes.MapPageRoute("Transformation", "transformation-metrics/", "~/Pages/charts/TransformationMetrics.aspx");
        routes.MapPageRoute("Transformation Vi", "transformation-metrics-vi/", "~/Pages/charts/TransformationMetrics_vi.aspx");
        
        routes.MapPageRoute("BomReport", "bom-reports/", "~/Pages/charts/BOMReport.aspx");
        routes.MapPageRoute("ComingSoon", "coming-soon/", "~/Pages/ComingSoon.aspx");

        routes.MapPageRoute("ViewExcel", "view-excel/{t}", "~/Pages/charts/ViewExcel.aspx");

        routes.MapPageRoute("IncentiveAnalysis", "dashboard/incentive", "~/Pages/charts/IncentiveAnalysis.aspx");

        routes.MapPageRoute("Hr", "hr/sale-support", "~/Pages/hr/HR.aspx");

        routes.MapPageRoute("Indicator", "key-indicators", "~/Pages/charts/KeyIdicator.aspx");

        routes.MapPageRoute("Retail BOM", "retail-bom", "~/Pages/charts/RetailBOM.aspx");

        routes.MapPageRoute("DG Issue Tracking", "dg-issue-tracking", "~/Pages/DG/IssueTracking.aspx");
        routes.MapPageRoute("DG Code Overview", "dg-code-management", "~/Pages/DG/CodeManagement.aspx");
        routes.MapPageRoute("DG Code List", "dg-code-list", "~/Pages/DG/CodeList.aspx");

        routes.MapPageRoute("Sme Incentive Payout", "sme-incentive-payout", "~/Pages/charts/SmeIncentivePayout.aspx");
    }
    
    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup
        RegisterRoutes(System.Web.Routing.RouteTable.Routes);
    }
    
    void Application_End(object sender, EventArgs e)
    {
        //  Code that runs on application shutdown

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
