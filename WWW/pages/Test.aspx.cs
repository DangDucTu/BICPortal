using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.DirectoryServices;
using System.Configuration;
using System.Collections;
using ldapif;

public partial class pages_Test : System.Web.UI.Page
{
    string content = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        //var lst = WorkFlowBLL.ReportBll.Instance.SendEmailToPIC();
        //if (lst != null && lst.Count > 0)
        //{
        //    foreach (var item in lst)
        //    {
        //        content = "Today, you have " + item.TotalReport + " reports. Wish you finish on time :)";
        //        SendMail("kienlt2@vpb.com.vn", "Kien.leit85", item.Account + "@vpb.com.vn", "BI Portal", content);
        //    }
        //}        

        //LDAPlogin("kienlt2", "Kien.leit85");
        
    }

    // LDAPlogin
    /// </summary>
    /// <param name="user"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    private void LDAPlogin(string uName, string uPass)
    {
        try
        {
            //Hashtable htbl = clsi2bConf.i2bConf_GetConfigGroupValue("VPBankLDAP");
            //if (htbl != null)
            //{
                LdapError error = new LdapError();
                string name = "uid=" + uName + ",ou=people,ou=user,dc=vpb,dc=com,dc=vn";
                LDAPUSER._ldapServerName = "10.36.10.101";
                LDAPUSER._port = 389;
                string isAuthen = LDAPUSER.IsAuthenticate(name, uPass);
                Response.Write(isAuthen);
            //}
            //else
            //{
            //    clsPCIDSSEventLog.WriteEventLog("login#failed#" + _userName + "#Invalid LDAP Connection Config", _logger);
            //    return "Invalid LDAP Connection Config";
            //}
        }
        catch (Exception ex)
        {
            
        }
    }

    /// <summary>
    /// Hàm gửi Email
    /// </summary>
    /// <param name="strMailFrom">Địa chỉ Email gửi đi</param>
    /// <param name="strMailFromPass">Password truy cập Email</param>
    /// <param name="strMailTo">Địa chỉ Email người nhận</param>
    /// <param name="strSubject">Tiêu đề Email</param>
    /// <param name="strBody">Nội dung Email</param>
    public void SendMail(string strMailFrom, string strMailFromPass, string strMailTo, string strSubject, string strBody)
    {
        //try
        //{
        //    //mail message
            MailMessage mM = new MailMessage();
            //Mail Address
            mM.From = new MailAddress(strMailFrom);
            //emailid to send
            mM.To.Add(strMailTo);
            //your subject line of the message
            mM.Subject = strSubject;
            //now attached the file
            //mM.Attachments.Add(new Attachment(@"C:\\attachedfile.jpg"));
            //add the body of the email
            mM.Body = strBody;
            mM.IsBodyHtml = true;
            //SMTP 
            SmtpClient SmtpServer = new SmtpClient();
            //your credential will go here
            SmtpServer.Credentials = new System.Net.NetworkCredential(strMailFrom.Split('@')[0], strMailFromPass);
            //port number to login yahoo server
            SmtpServer.Port = 25;
            SmtpServer.Timeout = 100000;
            //yahoo host name
            SmtpServer.Host = "mail.vpb.com.vn";
            //Send the email
            SmtpServer.Send(mM);
        //}
        //catch (Exception ex)
        //{
        //    throw ex;
        //}
    }
}