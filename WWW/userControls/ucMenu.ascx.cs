using System;
using System.Collections.Generic;
using DataContext;
using EntityBLL;
using System.Linq;
using WorkFlowBLL;
using Utils;

public partial class backend_userControls_ucMenu : System.Web.UI.UserControl
{
    protected string StrMainMenu = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        var listFunctions = FunctionBll.Instance.GetListFunctionAllowAdminAccess(AdminUtil.AdminId);
        StrMainMenu = GetMenuString(-1, listFunctions);
    }

    private string GetMenuString(int? parentId, IEnumerable<uspFunctionGetListAllowAdminAccessResult> listMenu)
    {
        var sMenu = "<ul>";
        var listTemp = listMenu.Where(c => c.ParentId.Equals(parentId));
        var hasSub = false;
        string cssClass = "";

        foreach (var item in listTemp)
        {
            if (item.Name.ToUpper().Equals("BOM/EX. REPORTS"))
                cssClass = "class='hightlight'";
            else cssClass = "";
            sMenu += string.Format("<li {2}><a href='{0}'>{1}</a>",
                                   string.IsNullOrEmpty(item.Url) ? "#" : item.Url,
                                   item.Name,cssClass);
            hasSub = listMenu.Count(c => c.ParentId == item.FunctionId) > 0;
            if (hasSub) sMenu += GetMenuString(item.FunctionId, listMenu);
            sMenu += "</li>";
        }
        sMenu += "</ul>";
        return sMenu;
    }
}