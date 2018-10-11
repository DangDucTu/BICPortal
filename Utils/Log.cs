using System.IO;
using System.Threading;
using System.Web;

namespace Utils
{
    /// <summary>
    /// Write Log
    /// </summary>
    public class Log
    {
        public static void WriteLog(string message)
        {
            var fileLog =  System.Web.HttpContext.Current.Server.MapPath("~/log/" + "log_" + System.DateTime.Now.ToString("MM_dd_yyyy") + ".txt");            
            message = "\r\nTime: " + System.DateTime.Now.ToString("yyyy.MM.dd HH:mm:ss:ffff") + "\r\n" + message + "\r\n----------------------------------------------------";
            WriteLog(fileLog, message);
        }
        public static void WriteLog(string path, string message)
        {
            var fileLock = new Mutex(false, "LogFileMutex");
            try
            {
                fileLock.WaitOne();
                using (var sw = File.AppendText(path))
                {
                    sw.WriteLine(message);
                    sw.Close();
                }
            }
            finally
            {
                fileLock.ReleaseMutex();
            }
        }
    }
}
