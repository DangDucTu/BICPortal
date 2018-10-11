using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web.Mail;

namespace Config
{
    public class SendMail
    {
        public static void SendEmail(string to, string subject, string content)
        {
            string from = Config.Global.Settings.MailSendFrom;
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
            smtp.Host = Global.Settings.MailHost;
            smtp.Port = Convert.ToInt32(Config.Global.Settings.MailPost);
            smtp.UseDefaultCredentials = false;
            smtp.EnableSsl = false;
            smtp.Credentials = new NetworkCredential(Config.Global.Settings.SmtpUserName, Config.Global.Settings.SmtpPassword);            
            System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage(from, to, subject, content);

            msg.IsBodyHtml = true;
            smtp.Send(msg);
        }

        public static string ReadTemplate(string filePath)
        {
            StreamReader sr = new StreamReader(filePath);
            string content = sr.ReadToEnd();
            sr.Dispose();
            return content;
        }
    }
}
