using System;
using System.Web;
using WorkFlowBLL;
using EntityBLL;
using DataContext;
using Utils;
using ldapif;

public partial class admin_pages_Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnLogin_Click(object sender, EventArgs e)
    {
        string userName = txtUserName.Text.Trim();
        string password = txtPassword.Text;

        if (System.Configuration.ConfigurationManager.AppSettings["UserNotLdap"].Contains(userName))
        {
            if (AdminBll.Instance.CheckLogin(userName, password))
            {
                var url = Request.QueryString["url"];
                if (string.IsNullOrEmpty(url))
                {
                    Response.Redirect(Config.Global.Settings.WebRoot + "home");
                }
                else
                {
                    url = HttpContext.Current.Server.UrlDecode(url);
                    Response.Redirect(url);
                }
            }
            else
            {
                pnlMessages.Visible = true;
            }
        }
        else
        {
            string result = LDAPlogin(userName, password);
            if (result.Equals("Thực hiện thành công"))
            {
                AdminBll.Instance.CheckLogin(userName, "123456");

                var url = Request.QueryString["url"];
                if (string.IsNullOrEmpty(url))
                {
                    Response.Redirect(Config.Global.Settings.WebRoot + "home");
                }
                else
                {
                    url = HttpContext.Current.Server.UrlDecode(url);
                    Response.Redirect(url);
                }
            }
            else
            {
                pnlMessages.Visible = true;
            }
        }
    }

    private string LDAPlogin(string uName, string uPass)
    {
        try
        {
            if (string.IsNullOrEmpty(uName) || string.IsNullOrEmpty(uPass)) return "";

            string name = "uid=" + uName + ",ou=people,ou=user,dc=vpb,dc=com,dc=vn";
            LDAPUSER._ldapServerName = "10.36.10.101";
            LDAPUSER._port = 389;
            return LDAPUSER.IsAuthenticate(name, uPass).Trim();
            
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }
}