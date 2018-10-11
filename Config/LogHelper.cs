using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Configuration;

namespace Config
{
    public class LogHelper
    {
        public static void Error(string message, string trace, string title)
        {
            try
            {

                string logFile = ConfigurationManager.AppSettings["LogFile"];
                if (!String.IsNullOrEmpty(logFile))
                {
                    string file = logFile + "Log_" + DateTime.Now.ToString("dd_MM_yyyy") + ".txt";
                    // Tao file neu chua ton tai
                    FileStream fs = new FileStream(file, FileMode.OpenOrCreate, FileAccess.ReadWrite);
                    StreamWriter sw = new StreamWriter(fs);
                    sw.Close();
                    fs.Close();

                    // Ghi file
                    fs = new FileStream(file, FileMode.Append, FileAccess.Write);
                    sw = new StreamWriter(fs);
                    sw.WriteLine(DateTime.Now.ToString() + " Title : " + title);
                    sw.WriteLine("      Message: " + message);
                    sw.WriteLine("      Trace: " + trace);
                    sw.WriteLine("--------------------------------------------");
                    sw.Close();
                    fs.Close();
                }
            }
            catch (Exception ex) { }
        }

    }
}
