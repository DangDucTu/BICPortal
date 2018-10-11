<%@ WebHandler Language="C#" Class="Export" %>

using System;
using System.Web;
using WorkFlowBLL;
using System.Web.SessionState;
using System.IO;
using Excel = Microsoft.Office.Interop.Excel;

public class Export : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "ExportExcelWorkTracker":
                ExportExcelWorkTracker(context);
                break;

            case "ExportExcelReportList":
                ExportExcelReportList(context);
                break;

            case "ExportExcelHr":
                ExportExcelHr(context);
                break;
            case "ExportExcelHr2":
                ExportExcelHr2(context);
                break;
            case "ExportExcelHr3":
                ExportExcelHr3(context);
                break;
        }
    }

    public void ExportExcelWorkTracker(HttpContext context)
    {
        string strFileName = "BICC_Master_Work_Tracker_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
        try
        {
            int managerId = Utils.AdminUtil.DepartmentId;
            if (context.Request.QueryString["departmentId"] != null)
                managerId = Convert.ToInt32(context.Request.QueryString["departmentId"] ?? "0");
            int reportId = Convert.ToInt32(context.Request.QueryString["reportId"] ?? "-1");
            string reportName = ""; //context.Request.QueryString["reportName"] ?? "";

            string accountName = context.Request.QueryString["accountName"] ?? "";

            string pic = context.Request.QueryString["pic"];
            int frequency = Convert.ToInt32(context.Request.QueryString["frequency"]);
            int isComplete = Convert.ToInt32(context.Request.QueryString["isComplete"]);
            int status = Convert.ToInt32(context.Request.QueryString["status"]);
            int isBackup = 0;
            int reportType = Convert.ToInt32(context.Request.QueryString["reportType"]);
            int reportUpdateType = Convert.ToInt32(context.Request.QueryString["reportUpdateType"]);

            IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
            DateTime fromDate = Convert.ToDateTime((context.Request.QueryString["fromDate"]).Trim() ?? "1/1/2010", culture);
            DateTime toDate = Convert.ToDateTime((context.Request.QueryString["toDate"] + " 23:59:59").Trim() ?? "1/1/2020", culture);
            //Lấy dữ liệu

            var lstOrder = ReportBll.Instance.GetListReport(reportName, pic, reportType, reportUpdateType, managerId, frequency, accountName, fromDate, toDate, isComplete, status, isBackup, 1, 1000);

            #region Ghi tên công ty
            //khởi tạo ứng dụng
            Excel.Application xlApp;
            //Workbook
            Excel.Workbook xlWorkBook;
            //workSheet
            Excel.Worksheet xlWorkSheet;

            object misValue = System.Reflection.Missing.Value;
            xlApp = new Excel.ApplicationClass();
            xlWorkBook = xlApp.Workbooks.Add();// (misValue);
            xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            #endregion

            #region Các cột dữ liệu

            xlWorkSheet.get_Range("A1", misValue).Value2 = "Report Code";
            xlWorkSheet.get_Range("A1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("B1", misValue).Value2 = "Report Name";
            xlWorkSheet.get_Range("B1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("C1", misValue).Value2 = "Department";
            xlWorkSheet.get_Range("C1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("D1", misValue).Value2 = "Client";
            xlWorkSheet.get_Range("D1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("E1", misValue).Value2 = "Frequency";
            xlWorkSheet.get_Range("E1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("F1", misValue).Value2 = "PIC";
            xlWorkSheet.get_Range("F1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("G1", misValue).Value2 = "Deadline";
            xlWorkSheet.get_Range("G1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("H1", misValue).Value2 = "DateUpload";
            xlWorkSheet.get_Range("H1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("I1", misValue).Value2 = "Status";
            xlWorkSheet.get_Range("I1", misValue).Font.Bold = true;
            #endregion

            #region Ghi dữ liệu
            int currentRow = 1;
            foreach (var items in lstOrder.Items)
            {
                currentRow++;

                xlWorkSheet.get_Range("A" + currentRow, misValue).Value2 = "BICC_REP_" + items.Department + "_" + items.ReportCode;
                xlWorkSheet.get_Range("B" + currentRow, misValue).Value2 = items.ReportName;
                xlWorkSheet.get_Range("C" + currentRow, misValue).Value2 = items.Department;
                xlWorkSheet.get_Range("D" + currentRow, misValue).Value2 = items.Client;
                xlWorkSheet.get_Range("E" + currentRow, misValue).Value2 = items.Frequency;
                xlWorkSheet.get_Range("F" + currentRow, misValue).Value2 = items.Account;
                xlWorkSheet.get_Range("G" + currentRow, misValue).Value2 = items.DateExpire.ToString("dd/MM/yyyy");
                xlWorkSheet.get_Range("H" + currentRow, misValue).Value2 = items.DateUpload != null ? items.DateUpload.Value.ToString("dd/MM/yyyy") : "";
                xlWorkSheet.get_Range("I" + currentRow, misValue).Value2 = items.StatusComplete == "Not Complete" ? "Pending" : items.StatusComplete;
            }
            #endregion

            //Kẻ border
            Excel.XlLineStyle lineStyle = Excel.XlLineStyle.xlContinuous;
            Excel.XlBorderWeight borderWeight = Excel.XlBorderWeight.xlThin;
            Excel.XlColorIndex colorIndex = Excel.XlColorIndex.xlColorIndexAutomatic;
            xlWorkSheet.get_Range("A1", "I" + (currentRow)).Borders.LineStyle = lineStyle;
            xlWorkSheet.get_Range("A1", "I" + (currentRow)).Borders.Weight = borderWeight;
            xlWorkSheet.get_Range("A1", "I" + (currentRow)).Borders.ColorIndex = colorIndex;
            xlWorkSheet.Name = "Tracker";

            // Giãn cột
            xlWorkSheet.Columns.AutoFit();
            xlWorkSheet.get_Range("A1", "I" + currentRow).Font.Name = "Arial";
            xlWorkSheet.get_Range("A1", "I" + currentRow).Font.Size = 10;
            //DateTime _datetime = DateTime.Now;


            // Fix first row
            xlWorkSheet.Activate();
            xlWorkSheet.Application.ActiveWindow.SplitRow = 1;
            xlWorkSheet.Application.ActiveWindow.FreezePanes = true;
            // Now apply autofilter
            Excel.Range firstRow = (Excel.Range)xlWorkSheet.Rows[1];
            firstRow.Activate();
            firstRow.Select();
            firstRow.AutoFilter(1,
                                Type.Missing,
                                Excel.XlAutoFilterOperator.xlAnd,
                                Type.Missing,
                                true);

            for (int i = 1; i <= 9; i++)
            {
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Interior.Color = System.Drawing.Color.FromArgb(0, 176, 80);
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Font.Color = System.Drawing.Color.White;
            }

            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;

            xlWorkBook.SaveCopyAs(strPath);
            xlWorkBook.Close(false, false, misValue);

            xlWorkBook = null;
            xlApp.Quit();
            xlApp = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();

            try
            {
                System.Diagnostics.Process[] excelProcesses = System.Diagnostics.Process.GetProcessesByName("Excel");
                foreach (System.Diagnostics.Process p in excelProcesses)
                {
                    p.Kill();
                }
            }
            catch
            {
                throw;
            }

            Download(context, strPath, strFileName);
        }
        catch (Exception ex)
        {
            context.Response.Write("Can not access application -" + ex.ToString());
        }
        finally
        {
            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;
            if (System.IO.File.Exists(strPath))
                System.IO.File.Delete(strPath);
        }
    }

    public void ExportExcelReportList(HttpContext context)
    {
        string strFileName = "BICC_Master_Report_List" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
        try
        {
            int frequency = Convert.ToInt32(context.Request.QueryString["frequency"]);
            string account = context.Request.QueryString["account"] ?? "";
            int status = Convert.ToInt32(context.Request.QueryString["status"]);

            var lstOrder = ReportBll.Instance.GetListReportList("", frequency, account, status);

            #region Ghi tên công ty
            //khởi tạo ứng dụng
            Excel.Application xlApp;
            //Workbook
            Excel.Workbook xlWorkBook;
            //workSheet
            Excel.Worksheet xlWorkSheet;

            object misValue = System.Reflection.Missing.Value;
            xlApp = new Excel.ApplicationClass();
            xlWorkBook = xlApp.Workbooks.Add();// (misValue);
            xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            #endregion

            #region Các cột dữ liệu

            xlWorkSheet.get_Range("A1", misValue).Value2 = "Report Code";
            xlWorkSheet.get_Range("A1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("B1", misValue).Value2 = "Report Name";
            xlWorkSheet.get_Range("B1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("C1", misValue).Value2 = "Department";
            xlWorkSheet.get_Range("C1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("D1", misValue).Value2 = "Client";
            xlWorkSheet.get_Range("D1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("E1", misValue).Value2 = "Frequency";
            xlWorkSheet.get_Range("E1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("F1", misValue).Value2 = "Deadline";
            xlWorkSheet.get_Range("F1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("G1", misValue).Value2 = "Status";
            xlWorkSheet.get_Range("G1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("H1", misValue).Value2 = "PIC";
            xlWorkSheet.get_Range("H1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("I1", misValue).Value2 = "Backup";
            xlWorkSheet.get_Range("I1", misValue).Font.Bold = true;
            #endregion

            #region Ghi dữ liệu
            int currentRow = 1;
            foreach (var items in lstOrder)
            {
                currentRow++;

                xlWorkSheet.get_Range("A" + currentRow, misValue).Value2 = "BICC_REP_" + items.Department + "_" + items.ReportCode;
                xlWorkSheet.get_Range("B" + currentRow, misValue).Value2 = items.ReportName;
                xlWorkSheet.get_Range("C" + currentRow, misValue).Value2 = items.Department;
                xlWorkSheet.get_Range("D" + currentRow, misValue).Value2 = items.Client;
                xlWorkSheet.get_Range("E" + currentRow, misValue).Value2 = items.Frequency;
                xlWorkSheet.get_Range("F" + currentRow, misValue).Value2 = items.Deadline;
                xlWorkSheet.get_Range("G" + currentRow, misValue).Value2 = items.Status == 1 ? "Ongoing" : "Closed";
                xlWorkSheet.get_Range("H" + currentRow, misValue).Value2 = items.Account;
                xlWorkSheet.get_Range("I" + currentRow, misValue).Value2 = items.AccountBackup;
            }
            #endregion

            //Kẻ border
            Excel.XlLineStyle lineStyle = Excel.XlLineStyle.xlContinuous;
            Excel.XlBorderWeight borderWeight = Excel.XlBorderWeight.xlThin;
            Excel.XlColorIndex colorIndex = Excel.XlColorIndex.xlColorIndexAutomatic;
            xlWorkSheet.get_Range("A1", "I" + (currentRow)).Borders.LineStyle = lineStyle;
            xlWorkSheet.get_Range("A1", "I" + (currentRow)).Borders.Weight = borderWeight;
            xlWorkSheet.get_Range("A1", "I" + (currentRow)).Borders.ColorIndex = colorIndex;
            xlWorkSheet.Name = "ReportList";

            // Giãn cột
            xlWorkSheet.Columns.AutoFit();
            xlWorkSheet.get_Range("A1", "I" + currentRow).Font.Name = "Arial";
            xlWorkSheet.get_Range("A1", "I" + currentRow).Font.Size = 10;
            //DateTime _datetime = DateTime.Now;


            // Fix first row
            xlWorkSheet.Activate();
            xlWorkSheet.Application.ActiveWindow.SplitRow = 1;
            xlWorkSheet.Application.ActiveWindow.FreezePanes = true;
            // Now apply autofilter
            Excel.Range firstRow = (Excel.Range)xlWorkSheet.Rows[1];
            firstRow.Activate();
            firstRow.Select();
            firstRow.AutoFilter(1,
                                Type.Missing,
                                Excel.XlAutoFilterOperator.xlAnd,
                                Type.Missing,
                                true);

            for (int i = 1; i <= 9; i++)
            {
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Interior.Color = System.Drawing.Color.FromArgb(0, 176, 80);
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Font.Color = System.Drawing.Color.White;
            }

            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;

            xlWorkBook.SaveCopyAs(strPath);
            xlWorkBook.Close(false, false, misValue);

            xlWorkBook = null;
            xlApp.Quit();
            xlApp = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();

            try
            {
                System.Diagnostics.Process[] excelProcesses = System.Diagnostics.Process.GetProcessesByName("Excel");
                foreach (System.Diagnostics.Process p in excelProcesses)
                {
                    p.Kill();
                }
            }
            catch
            {
                throw;
            }

            Download(context, strPath, strFileName);
        }
        catch (Exception ex)
        {
            context.Response.Write("Can not access application -" + ex.ToString());
        }
        finally
        {
            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;
            if (System.IO.File.Exists(strPath))
                System.IO.File.Delete(strPath);

        }
    }

    public void ExportExcelHr(HttpContext context)
    {
        string strFileName = "HR_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
        try
        {
            string saleSupport = Utils.AdminUtil.AdminName;

            var lstOrder = WorkFlowBLL.HR.Instance.GetListHR(saleSupport, "", "", "", 1, 0).Items;

            #region Ghi tên công ty
            //khởi tạo ứng dụng
            Excel.Application xlApp;
            //Workbook
            Excel.Workbook xlWorkBook;
            //workSheet
            Excel.Worksheet xlWorkSheet;

            object misValue = System.Reflection.Missing.Value;
            xlApp = new Excel.ApplicationClass();
            xlWorkBook = xlApp.Workbooks.Add();// (misValue);
            xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            #endregion

            #region Các cột dữ liệu

            xlWorkSheet.get_Range("A1", misValue).Value2 = "SALE CODE";
            xlWorkSheet.get_Range("A1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("B1", misValue).Value2 = "HR STAFF";
            xlWorkSheet.get_Range("B1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("C1", misValue).Value2 = "SALE NAME";
            xlWorkSheet.get_Range("C1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("D1", misValue).Value2 = "DAO";
            xlWorkSheet.get_Range("D1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("E1", misValue).Value2 = "BRANCH CODE";
            xlWorkSheet.get_Range("E1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("F1", misValue).Value2 = "TEAM";
            xlWorkSheet.get_Range("F1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("G1", misValue).Value2 = "CHANNEL";
            xlWorkSheet.get_Range("G1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("H1", misValue).Value2 = "POSITION";
            xlWorkSheet.get_Range("H1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("I1", misValue).Value2 = "SUB POSITION";
            xlWorkSheet.get_Range("I1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("J1", misValue).Value2 = "GENDER";
            xlWorkSheet.get_Range("J1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("K1", misValue).Value2 = "MOBILE";
            xlWorkSheet.get_Range("K1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("L1", misValue).Value2 = "DOB";
            xlWorkSheet.get_Range("L1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("M1", misValue).Value2 = "NATIONAL ID";
            xlWorkSheet.get_Range("M1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("N1", misValue).Value2 = "DATE START";
            xlWorkSheet.get_Range("N1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("O1", misValue).Value2 = "PAYROLL";
            xlWorkSheet.get_Range("O1", misValue).Font.Bold = true;
            #endregion

            #region Ghi dữ liệu
            int currentRow = 1;
            foreach (var items in lstOrder)
            {
                currentRow++;

                xlWorkSheet.get_Range("A" + currentRow, misValue).Value2 = items.SALE_CODE;
                xlWorkSheet.get_Range("B" + currentRow, misValue).Value2 = items.HR_STAFF;
                xlWorkSheet.get_Range("C" + currentRow, misValue).Value2 = items.SALE_NAME_TV;
                xlWorkSheet.get_Range("D" + currentRow, misValue).Value2 = items.DAO;
                xlWorkSheet.get_Range("E" + currentRow, misValue).Value2 = items.BRANCH_CODE;
                xlWorkSheet.get_Range("F" + currentRow, misValue).Value2 = items.TEAM;
                xlWorkSheet.get_Range("G" + currentRow, misValue).Value2 = items.CHANNEL;
                xlWorkSheet.get_Range("H" + currentRow, misValue).Value2 = items.POSITION;
                xlWorkSheet.get_Range("I" + currentRow, misValue).Value2 = items.SUB_POSITION;
                xlWorkSheet.get_Range("J" + currentRow, misValue).Value2 = items.GENDER;
                xlWorkSheet.get_Range("K" + currentRow, misValue).Value2 = items.PHONE;
                xlWorkSheet.get_Range("L" + currentRow, misValue).Value2 = items.DOB_SALES.Value.ToString("dd/MM/yyyy");
                xlWorkSheet.get_Range("M" + currentRow, misValue).Value2 = items.NATIONAL_ID;
                xlWorkSheet.get_Range("N" + currentRow, misValue).Value2 = items.DATE_SALES_START.Value.ToString("dd/MM/yyyy"); ;
                xlWorkSheet.get_Range("O" + currentRow, misValue).Value2 = items.PAYROLL_ACCT;
            }
            #endregion

            //Kẻ border
            Excel.XlLineStyle lineStyle = Excel.XlLineStyle.xlContinuous;
            Excel.XlBorderWeight borderWeight = Excel.XlBorderWeight.xlThin;
            Excel.XlColorIndex colorIndex = Excel.XlColorIndex.xlColorIndexAutomatic;
            xlWorkSheet.get_Range("A1", "O" + (currentRow)).Borders.LineStyle = lineStyle;
            xlWorkSheet.get_Range("A1", "O" + (currentRow)).Borders.Weight = borderWeight;
            xlWorkSheet.get_Range("A1", "O" + (currentRow)).Borders.ColorIndex = colorIndex;
            xlWorkSheet.Name = "HR";

            // Giãn cột
            xlWorkSheet.Columns.AutoFit();
            xlWorkSheet.get_Range("A1", "O" + currentRow).Font.Name = "Arial";
            xlWorkSheet.get_Range("A1", "O" + currentRow).Font.Size = 10;
            //DateTime _datetime = DateTime.Now;


            // Fix first row
            xlWorkSheet.Activate();
            xlWorkSheet.Application.ActiveWindow.SplitRow = 1;
            xlWorkSheet.Application.ActiveWindow.FreezePanes = true;
            // Now apply autofilter
            Excel.Range firstRow = (Excel.Range)xlWorkSheet.Rows[1];
            firstRow.Activate();
            firstRow.Select();
            firstRow.AutoFilter(1,
                                Type.Missing,
                                Excel.XlAutoFilterOperator.xlAnd,
                                Type.Missing,
                                true);

            for (int i = 1; i <= 15; i++)
            {
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Interior.Color = System.Drawing.Color.FromArgb(0, 176, 80);
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Font.Color = System.Drawing.Color.White;
            }

            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;

            xlWorkBook.SaveCopyAs(strPath);
            xlWorkBook.Close(false, false, misValue);

            xlWorkBook = null;
            xlApp.Quit();
            xlApp = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();

            try
            {
                System.Diagnostics.Process[] excelProcesses = System.Diagnostics.Process.GetProcessesByName("Excel");
                foreach (System.Diagnostics.Process p in excelProcesses)
                {
                    p.Kill();
                }
            }
            catch
            {
                throw;
            }

            Download(context, strPath, strFileName);
        }
        catch (Exception ex)
        {
            context.Response.Write("Can not access application -" + ex.ToString());
        }
        finally
        {
            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;
            if (System.IO.File.Exists(strPath))
                System.IO.File.Delete(strPath);
        }
    }

    public void ExportExcelHr2(HttpContext context)
    {
        string strFileName = "HR_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
        try
        {
            string saleSupport = Utils.AdminUtil.AdminName;

            string date = context.Request.QueryString["date"];

            var lstOrder = WorkFlowBLL.HR.Instance.GetListNewSalesHR(date);

            #region Ghi tên công ty
            //khởi tạo ứng dụng
            Excel.Application xlApp;
            //Workbook
            Excel.Workbook xlWorkBook;
            //workSheet
            Excel.Worksheet xlWorkSheet;

            object misValue = System.Reflection.Missing.Value;
            xlApp = new Excel.ApplicationClass();
            xlWorkBook = xlApp.Workbooks.Add();// (misValue);
            xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            #endregion

            #region Các cột dữ liệu

            xlWorkSheet.get_Range("A1", misValue).Value2 = "SALE CODE";
            xlWorkSheet.get_Range("A1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("B1", misValue).Value2 = "HR STAFF";
            xlWorkSheet.get_Range("B1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("C1", misValue).Value2 = "SALE NAME";
            xlWorkSheet.get_Range("C1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("D1", misValue).Value2 = "DAO";
            xlWorkSheet.get_Range("D1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("E1", misValue).Value2 = "BRANCH CODE";
            xlWorkSheet.get_Range("E1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("F1", misValue).Value2 = "TEAM";
            xlWorkSheet.get_Range("F1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("G1", misValue).Value2 = "CHANNEL";
            xlWorkSheet.get_Range("G1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("H1", misValue).Value2 = "POSITION";
            xlWorkSheet.get_Range("H1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("I1", misValue).Value2 = "SUB POSITION";
            xlWorkSheet.get_Range("I1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("J1", misValue).Value2 = "GENDER";
            xlWorkSheet.get_Range("J1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("K1", misValue).Value2 = "MOBILE";
            xlWorkSheet.get_Range("K1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("L1", misValue).Value2 = "DOB";
            xlWorkSheet.get_Range("L1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("M1", misValue).Value2 = "NATIONAL ID";
            xlWorkSheet.get_Range("M1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("N1", misValue).Value2 = "DATE START";
            xlWorkSheet.get_Range("N1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("O1", misValue).Value2 = "PAYROLL";
            xlWorkSheet.get_Range("O1", misValue).Font.Bold = true;
            #endregion

            #region Ghi dữ liệu
            int currentRow = 1;
            foreach (var items in lstOrder)
            {
                currentRow++;

                xlWorkSheet.get_Range("A" + currentRow, misValue).Value2 = items.SALE_CODE;
                xlWorkSheet.get_Range("B" + currentRow, misValue).Value2 = items.HR_STAFF;
                xlWorkSheet.get_Range("C" + currentRow, misValue).Value2 = items.SALE_NAME_TV;
                xlWorkSheet.get_Range("D" + currentRow, misValue).Value2 = items.DAO;
                xlWorkSheet.get_Range("E" + currentRow, misValue).Value2 = items.BRANCH_CODE;
                xlWorkSheet.get_Range("F" + currentRow, misValue).Value2 = items.TEAM;
                xlWorkSheet.get_Range("G" + currentRow, misValue).Value2 = items.CHANNEL;
                xlWorkSheet.get_Range("H" + currentRow, misValue).Value2 = items.POSITION;
                xlWorkSheet.get_Range("I" + currentRow, misValue).Value2 = items.SUB_POSITION;
                xlWorkSheet.get_Range("J" + currentRow, misValue).Value2 = items.GENDER;
                xlWorkSheet.get_Range("K" + currentRow, misValue).Value2 = items.PHONE;
                xlWorkSheet.get_Range("L" + currentRow, misValue).Value2 = items.DOB_SALES.ToString("dd/MM/yyyy");
                xlWorkSheet.get_Range("M" + currentRow, misValue).Value2 = items.NATIONAL_ID;
                xlWorkSheet.get_Range("N" + currentRow, misValue).Value2 = items.DATE_SALES_START.Value.ToString("dd/MM/yyyy"); ;
                xlWorkSheet.get_Range("O" + currentRow, misValue).Value2 = items.PAYROLL_ACCT;
            }
            #endregion

            //Kẻ border
            Excel.XlLineStyle lineStyle = Excel.XlLineStyle.xlContinuous;
            Excel.XlBorderWeight borderWeight = Excel.XlBorderWeight.xlThin;
            Excel.XlColorIndex colorIndex = Excel.XlColorIndex.xlColorIndexAutomatic;
            xlWorkSheet.get_Range("A1", "O" + (currentRow)).Borders.LineStyle = lineStyle;
            xlWorkSheet.get_Range("A1", "O" + (currentRow)).Borders.Weight = borderWeight;
            xlWorkSheet.get_Range("A1", "O" + (currentRow)).Borders.ColorIndex = colorIndex;
            xlWorkSheet.Name = "HR";

            // Giãn cột
            xlWorkSheet.Columns.AutoFit();
            xlWorkSheet.get_Range("A1", "O" + currentRow).Font.Name = "Arial";
            xlWorkSheet.get_Range("A1", "O" + currentRow).Font.Size = 10;
            //DateTime _datetime = DateTime.Now;


            // Fix first row
            xlWorkSheet.Activate();
            xlWorkSheet.Application.ActiveWindow.SplitRow = 1;
            xlWorkSheet.Application.ActiveWindow.FreezePanes = true;
            // Now apply autofilter
            Excel.Range firstRow = (Excel.Range)xlWorkSheet.Rows[1];
            firstRow.Activate();
            firstRow.Select();
            firstRow.AutoFilter(1,
                                Type.Missing,
                                Excel.XlAutoFilterOperator.xlAnd,
                                Type.Missing,
                                true);

            for (int i = 1; i <= 15; i++)
            {
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Interior.Color = System.Drawing.Color.FromArgb(0, 176, 80);
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Font.Color = System.Drawing.Color.White;
            }

            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;

            xlWorkBook.SaveCopyAs(strPath);
            xlWorkBook.Close(false, false, misValue);

            xlWorkBook = null;
            xlApp.Quit();
            xlApp = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();

            try
            {
                System.Diagnostics.Process[] excelProcesses = System.Diagnostics.Process.GetProcessesByName("Excel");
                foreach (System.Diagnostics.Process p in excelProcesses)
                {
                    p.Kill();
                }
            }
            catch
            {
                throw;
            }

            Download(context, strPath, strFileName);
        }
        catch (Exception ex)
        {
            context.Response.Write("Can not access application -" + ex.ToString());
        }
        finally
        {
            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;
            if (System.IO.File.Exists(strPath))
                System.IO.File.Delete(strPath);

        }
    }

    public void ExportExcelHr3(HttpContext context)
    {
        string strFileName = "HR_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
        try
        {
            string saleSupport = Utils.AdminUtil.AdminName;

            string month = context.Request.QueryString["month"];

            var lstOrder = WorkFlowBLL.HR.Instance.GetListSalesByMonth(month);

            #region Ghi tên công ty
            //khởi tạo ứng dụng
            Excel.Application xlApp;
            //Workbook
            Excel.Workbook xlWorkBook;
            //workSheet
            Excel.Worksheet xlWorkSheet;

            object misValue = System.Reflection.Missing.Value;
            xlApp = new Excel.ApplicationClass();
            xlWorkBook = xlApp.Workbooks.Add(misValue);// (misValue);
            xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            #endregion

            #region Các cột dữ liệu

            xlWorkSheet.get_Range("A1", misValue).Value2 = "SALE CODE";
            xlWorkSheet.get_Range("A1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("B1", misValue).Value2 = "HR STAFF";
            xlWorkSheet.get_Range("B1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("C1", misValue).Value2 = "SALE NAME";
            xlWorkSheet.get_Range("C1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("D1", misValue).Value2 = "DAO";
            xlWorkSheet.get_Range("D1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("E1", misValue).Value2 = "BRANCH CODE";
            xlWorkSheet.get_Range("E1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("F1", misValue).Value2 = "TEAM";
            xlWorkSheet.get_Range("F1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("G1", misValue).Value2 = "CHANNEL";
            xlWorkSheet.get_Range("G1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("H1", misValue).Value2 = "POSITION";
            xlWorkSheet.get_Range("H1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("I1", misValue).Value2 = "SUB POSITION";
            xlWorkSheet.get_Range("I1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("J1", misValue).Value2 = "GENDER";
            xlWorkSheet.get_Range("J1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("K1", misValue).Value2 = "MOBILE";
            xlWorkSheet.get_Range("K1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("L1", misValue).Value2 = "DOB";
            xlWorkSheet.get_Range("L1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("M1", misValue).Value2 = "NATIONAL ID";
            xlWorkSheet.get_Range("M1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("N1", misValue).Value2 = "DATE START";
            xlWorkSheet.get_Range("N1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("O1", misValue).Value2 = "DATE SALE OFF";
            xlWorkSheet.get_Range("O1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("P1", misValue).Value2 = "PAYROLL";
            xlWorkSheet.get_Range("P1", misValue).Font.Bold = true;

            xlWorkSheet.get_Range("Q1", misValue).Value2 = "NOTE";
            xlWorkSheet.get_Range("Q1", misValue).Font.Bold = true;
            #endregion

            #region Ghi dữ liệu
            int currentRow = 1;
            foreach (var items in lstOrder)
            {
                currentRow++;

                xlWorkSheet.get_Range("A" + currentRow, misValue).Value2 = items.SALE_CODE;
                xlWorkSheet.get_Range("B" + currentRow, misValue).Value2 = items.HR_STAFF;
                xlWorkSheet.get_Range("C" + currentRow, misValue).Value2 = items.SALE_NAME_TV;
                xlWorkSheet.get_Range("D" + currentRow, misValue).Value2 = items.DAO;
                xlWorkSheet.get_Range("E" + currentRow, misValue).Value2 = items.BRANCH_CODE;
                xlWorkSheet.get_Range("F" + currentRow, misValue).Value2 = items.TEAM;
                xlWorkSheet.get_Range("G" + currentRow, misValue).Value2 = items.CHANNEL;
                xlWorkSheet.get_Range("H" + currentRow, misValue).Value2 = items.POSITION;
                xlWorkSheet.get_Range("I" + currentRow, misValue).Value2 = items.SUB_POSITION;
                xlWorkSheet.get_Range("J" + currentRow, misValue).Value2 = items.GENDER;
                xlWorkSheet.get_Range("K" + currentRow, misValue).Value2 = items.PHONE;
                xlWorkSheet.get_Range("L" + currentRow, misValue).Value2 = items.DOB_SALES.ToString("dd/MM/yyyy");
                xlWorkSheet.get_Range("M" + currentRow, misValue).Value2 = items.NATIONAL_ID;
                xlWorkSheet.get_Range("N" + currentRow, misValue).Value2 = items.DATE_SALES_START.Value.ToString("dd/MM/yyyy"); ;
                xlWorkSheet.get_Range("O" + currentRow, misValue).Value2 = items.DATE_SALES_OFF == null ? "" : items.DATE_SALES_OFF.Value.ToString("dd/MM/yyyy");
                xlWorkSheet.get_Range("P" + currentRow, misValue).Value2 = items.PAYROLL_ACCT;
                xlWorkSheet.get_Range("Q" + currentRow, misValue).Value2 = items.NOTE;
            }
            #endregion

            //Kẻ border
            Excel.XlLineStyle lineStyle = Excel.XlLineStyle.xlContinuous;
            Excel.XlBorderWeight borderWeight = Excel.XlBorderWeight.xlThin;
            Excel.XlColorIndex colorIndex = Excel.XlColorIndex.xlColorIndexAutomatic;
            xlWorkSheet.get_Range("A1", "Q" + (currentRow)).Borders.LineStyle = lineStyle;
            xlWorkSheet.get_Range("A1", "Q" + (currentRow)).Borders.Weight = borderWeight;
            xlWorkSheet.get_Range("A1", "Q" + (currentRow)).Borders.ColorIndex = colorIndex;
            xlWorkSheet.Name = "HR";

            // Giãn cột
            xlWorkSheet.Columns.AutoFit();
            xlWorkSheet.get_Range("A1", "Q" + currentRow).Font.Name = "Arial";
            xlWorkSheet.get_Range("A1", "Q" + currentRow).Font.Size = 10;
            //DateTime _datetime = DateTime.Now;


            // Fix first row
            xlWorkSheet.Activate();
            xlWorkSheet.Application.ActiveWindow.SplitRow = 1;
            xlWorkSheet.Application.ActiveWindow.FreezePanes = true;
            // Now apply autofilter
            Excel.Range firstRow = (Excel.Range)xlWorkSheet.Rows[1];
            firstRow.Activate();
            firstRow.Select();
            firstRow.AutoFilter(1,
                                Type.Missing,
                                Excel.XlAutoFilterOperator.xlAnd,
                                Type.Missing,
                                true);

            for (int i = 1; i <= 17; i++)
            {
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Interior.Color = System.Drawing.Color.FromArgb(0, 176, 80);
                ((Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[1, i]).Font.Color = System.Drawing.Color.White;
            }

            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;

            xlWorkBook.SaveCopyAs(strPath);
            xlWorkBook.Close(false, false, misValue);

            xlWorkBook = null;
            xlApp.Quit();
            xlApp = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();

            try
            {
                System.Diagnostics.Process[] excelProcesses = System.Diagnostics.Process.GetProcessesByName("Excel");
                foreach (System.Diagnostics.Process p in excelProcesses)
                {
                    p.Kill();
                }
            }
            catch
            {
                throw;
            }

            Download(context, strPath, strFileName);
        }
        catch (Exception ex)
        {
            context.Response.Write("Can not access application -" + ex.ToString());
        }
        finally
        {
            string strPath = System.Configuration.ConfigurationManager.AppSettings["RESOURCES_EXPORT_EXCEL"] + strFileName;
            if (System.IO.File.Exists(strPath))
                System.IO.File.Delete(strPath);

        }
    }

    public void Download(HttpContext context, string path, string fileName)
    {
        //Download file
        if (System.IO.File.Exists(path))
        {
            context.Response.Clear();
            context.Response.ClearContent();
            context.Response.ClearHeaders();
            context.Response.ContentType = "application/ms-excel";
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + fileName);
            System.IO.StreamReader filestream = new System.IO.StreamReader(path);
            using (System.IO.BinaryReader reader = new System.IO.BinaryReader(filestream.BaseStream))
            {
                int counterByte = 0;
                int BUFFER_SIZE = 1024 * 50;
                byte[] buf = new byte[BUFFER_SIZE];
                int n = reader.Read(buf, 0, BUFFER_SIZE);
                while (n > 0)
                {
                    context.Response.OutputStream.Write(buf, 0, n);
                    n = reader.Read(buf, 0, BUFFER_SIZE);
                    context.Response.Flush();
                    counterByte += n;
                }
                reader.Close();
            }
            System.IO.File.Delete(path);
        }
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }

}