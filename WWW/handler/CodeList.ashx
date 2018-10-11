<%@ WebHandler Language="C#" Class="CodeList" %>

using System;
using System.Web;
using System.Data;
using System.Data.OleDb;
using WorkFlowBLL;
using System.Web.SessionState;
using System.Collections.Generic;
using System.IO;
using Excel = Microsoft.Office.Interop.Excel;

public class CodeList : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "GetListCode":
                GetListCode(context);
                break;
            case "GetListType":
                GetListType(context);
                break;
            case "GetListField":
                GetListField(context);
                break;
            case "GetInfoCode":
                GetInfoCode(context);
                break;
            case "upload":
                UpLoadFile(context);
                break;
        }
    }

    public void GetInfoCode(HttpContext context)
    {
        int codeId = Convert.ToInt32(context.Request.QueryString["codeId"] ?? "-1");
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(CodeManagementBll.Instance.GetInfoCode(codeId));
        context.Response.Write(json);
    }

    public void GetListCode(HttpContext context)
    {
        int type = Convert.ToInt32(context.Request.QueryString["type"] ?? "-1");
        int status = Convert.ToInt32(context.Request.QueryString["status"] ?? "-1");
        int field = Convert.ToInt32(context.Request.QueryString["field"] ?? "-1");
        string requester = context.Request.QueryString["requester"] ?? "";
        string segment = context.Request.QueryString["segment"] ?? "";
        int page = Convert.ToInt32(context.Request.QueryString["page"]);
        int pagesize = Convert.ToInt32(context.Request.QueryString["pagesize"]);
        string account = context.Request.QueryString["account"] ?? "";
        IFormatProvider culture = new System.Globalization.CultureInfo("en-US", true);
        DateTime fromDate = string.IsNullOrEmpty(context.Request.QueryString["fromDate"].Trim()) ? Convert.ToDateTime("1/1/2010", culture) : Convert.ToDateTime(context.Request.QueryString["fromDate"].Trim(), culture);
        DateTime toDate = string.IsNullOrEmpty(context.Request.QueryString["toDate"].Trim()) ? Convert.ToDateTime("1/1/2030", culture) : Convert.ToDateTime(context.Request.QueryString["toDate"].Trim(), culture);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(CodeManagementBll.Instance.GetListCode(account, type, status, field, requester, segment, fromDate, toDate, page, pagesize));
        context.Response.Write(json);
    }
    public void GetListType(HttpContext context)
    {
        int fieldId = Convert.ToInt32(context.Request.QueryString["fieldId"]);
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(CodeManagementBll.Instance.GetListType(fieldId));
        context.Response.Write(json);
    }
    public void GetListField(HttpContext context)
    {
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(CodeManagementBll.Instance.GetListField());
        context.Response.Write(json);
    }

    /// <summary>
    /// Upload Ảnh
    /// </summary>
    /// <param name="context"></param>
    private void UpLoadFile(HttpContext context)
    {
        HttpPostedFile postFile = context.Request.Files["txtFileUpload"];
        string account = context.Request.QueryString["account"] ?? "";

        string fileExtension = System.IO.Path.GetExtension(postFile.FileName);
        if (postFile.FileName.Length == 0)
            context.Response.Write(1 + "|a|");
        else
        {
            var oldFileName = context.Request.Params["hfOldFileUpload"] ?? string.Empty;

            string newFileName = string.Empty;
            int result = Upload(postFile, oldFileName, out newFileName);
            context.Response.ContentType = "text/plain";


            if (result == 1)
            {
                bool isSuccess = ImportListCodeFromExcel(newFileName, fileExtension, account);
                result = isSuccess ? 1 : 0;
                context.Response.Write(result + "|" + newFileName);
            }
            else
            {
                context.Response.Write(result);
            }
        }
    }


    private bool ImportListCodeFromExcel(string filePath, string fileExtension, string account)
    {
        //DataRow item = new DataRow();
        string listItem = string.Empty;
        try
        {
            DataTable dt = ConvertXSLXtoDataTable(filePath, fileExtension);
            if (dt.Rows.Count == 0)
            {
                return false;
            }
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var item = dt.Rows[i];
                listItem = item.ToString();
                CodeInfo record = new CodeInfo
                {
                    code = item[0].ToString(),
                    name = item[1].ToString(),
                    field = item[2] == null ? 0 : Convert.ToInt32(item[2]),
                    type = item[3] == null ? 0 : Convert.ToInt32(item[3]),
                    segment = item[4].ToString(),
                    effectiveDate = string.IsNullOrEmpty(item[5].ToString()) ? DateTime.Now.ToString("MM/dd/yyyy") : ((DateTime)item[5]).ToString("MM/dd/yyyy"),
                    requester = item[6].ToString(),
                    status = string.IsNullOrEmpty(item[7].ToString()) ? 0 : Convert.ToInt32(item[7])
                };
                CodeManagementBll.Instance.InsertCodeList(record.code, record.name, record.segment, account, record.effectiveDate, record.requester, record.status, record.field, record.type);
            }
        }
        catch (Exception ex)
        {
            //item = item;
            return false;
        }
        return true;
    }
    /// <summary>
    /// Upload file
    /// </summary>
    /// <param name="postFile"></param>
    /// <param name="strName"></param>
    /// <returns>1: Thành công, -1: Sai định dạnh cho phép, -2: Sai loại file cho phép, -3: Exception</returns>
    private static int Upload(HttpPostedFile postFile, string oldFileName, out string pathToFile)
    {
        var strExt = postFile.FileName.Substring(postFile.FileName.LastIndexOf(".", System.StringComparison.Ordinal)).ToLower();
        const string strExts = ".xls|.xlsx|.pdf|.ppt|.pptx|.jpg|.png|.xlsb";
        pathToFile = string.Empty;
        if (strExts.IndexOf(strExt, System.StringComparison.Ordinal) == -1)
        {
            return -1;
        }

        string newFileName = string.Empty;

        newFileName = System.Text.RegularExpressions.Regex.Replace(oldFileName.Trim(), "[^a-zA-Z0-9_]+", "_") + DateTime.Now.ToString("ddMMyyyyHHmmss") + strExt;

        //newImageUrl = "/"
        //    + DateTime.Now.Year + "/" + DateTime.Now.Month
        //    + "/" + newFileName;

        pathToFile = "/" + newFileName;

        var path = Config.Global.Settings.ResourcesUploadEmailFile;

        //var subPath = DateTime.Now.Year + "\\" + DateTime.Now.Month + "\\";

        //newFileName = subPath + newFileName;


        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        if (!string.IsNullOrEmpty(oldFileName))
        {
            var oldFileFullPath = Config.Global.Settings.ResourcesUploadFile + oldFileName.TrimStart('/').Replace('/', '\\'); ;
            if (File.Exists(oldFileFullPath))
            {
                var fiOldFile = new FileInfo(oldFileFullPath) { Attributes = FileAttributes.Archive };
                fiOldFile.Delete();
            }
        }

        var fileName = path + newFileName;

        postFile.SaveAs(fileName);
        pathToFile = fileName;
        return 1;
    }

    public static DataTable ConvertXSLXtoDataTable(string strFilePath, string fileExtension)
    {

        string excelConnectionString = string.Empty;
        excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
        strFilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
        //connection String for xls file format.
        if (fileExtension == ".xls")
        {
            excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +
            strFilePath + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
        }
        //connection String for xlsx file format.
        else if (fileExtension == ".xlsx")
        {
            excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
            strFilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
        }

        DataSet ds = new DataSet();
        OleDbConnection oledbConn = new OleDbConnection(excelConnectionString);
        DataTable dt = new DataTable();
        try
        {
            //Create Connection to Excel work book and add oledb namespace
            oledbConn.Open();

            dt = oledbConn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            if (dt == null)
            {
                return null;
            }

            String[] excelSheets = new String[dt.Rows.Count];
            int t = 0;
            //excel data saves in temp file here.
            foreach (DataRow row in dt.Rows)
            {
                string tableName = row["TABLE_NAME"].ToString();
                if (tableName.Contains("Template code management"))
                {
                    excelSheets[t] = row["TABLE_NAME"].ToString();
                }
            }
            OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);


            string query = string.Format("Select * from [{0}]", excelSheets[0]);
            using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
            {
                dataAdapter.Fill(ds);
            }
            dt = ds.Tables[0];
        }
        catch
        {
        }
        finally
        {

            oledbConn.Close();
        }
        return dt;
    }
    public class CodeInfo
    {
        public string code { get; set; }
        public string name { get; set; }
        public string segment { get; set; }
        public string account { get; set; }
        public string effectiveDate { get; set; }
        public string requester { get; set; }
        public int status { get; set; }
        public int field { get; set; }
        public int type { get; set; }
    }
    public bool IsReusable
    {
        get
        {
            return true;
        }
    }

}