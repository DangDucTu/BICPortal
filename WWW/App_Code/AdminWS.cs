using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WorkFlowBLL;
using Utils;

/// <summary>
/// Summary description for AdminWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AdminWS : System.Web.Services.WebService {

    /// <summary>
    /// Service thực hiện các hành động với Admin
    /// Author: hoan.trinh
    /// </summary>
    public AdminWS()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent();                
    }
    /// <summary>
    /// Thêm người quản trị
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <param name="fullName"></param>
    /// <param name="email"></param>
    /// <param name="phone"></param>
    /// <param name="sex"></param>
    /// <param name="description"></param>
    /// <param name="status"></param>
    /// <param name="isAdmin"></param>
    /// <returns>0: Chưa Login,-2: Tài khoản đã tồn tại, -1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int InsertAdmin(string userName, string password, string fullName, int status, int roleId, int typeAdmin)
    {
        return AdminBll.Instance.InsertAdmin(userName, password, fullName, Utils.AdminUtil.AdminId, status, false, roleId, typeAdmin);
    }
    /// <summary>
    /// Sửa thông tin người quản trị
    /// </summary>
    /// <param name="adminId"></param>   
    /// <param name="fullName"></param>
    /// <param name="email"></param>
    /// <param name="phone"></param>
    /// <param name="sex"></param>
    /// <param name="description"></param>
    /// <param name="status"></param> 
    /// <returns>0: Chưa Login,-2: Tài khoản đã tồn tại, -1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int UpdateAdmin(int adminId, string fullName, int status)
    {
        return AdminBll.Instance.UpdateAdmin(adminId, fullName, status);
    }

    /// <summary>
    /// Đổi thông tin cá nhân
    /// </summary>
    /// <param name="adminId"></param>   
    /// <param name="fullName"></param>
    /// <param name="email"></param>
    /// <param name="phone"></param>
    /// <param name="sex"></param>
    /// <param name="description"></param>
    /// <param name="status"></param> 
    /// <returns>0: Chưa Login,-2: Tài khoản đã tồn tại, -1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int ChangeMyProfile(string fullName, int status)
    {
        return AdminBll.Instance.UpdateAdmin(Utils.AdminUtil.AdminId, fullName, status);
    }

    /// <summary>
    /// Xóa tài khoản: Nếu admin chưa từng login vào thì xóa hẳn db, còn không sẽ đổi trạng thái 2
    /// </summary>
    /// <param name="adminId"></param>
    /// <returns>0: Chưa Login, -1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int DeleteAdmin(int adminId)
    {
        return AdminBll.Instance.DeleteAdmin(adminId);
    }
    /// <summary>
    /// Thay đổi trạng thái
    /// </summary>
    /// <param name="adminId"></param>
    /// <param name="status">Trạng thái: 0 - Bị Khóa, 1 - Hoạt động, 2 - Xóa</param>
    /// <returns>0: chưa Login, -1: Lỗi, 1: Thành công</returns>
    [WebMethod(EnableSession = true)]
    public int ChangeStatus(int adminId, int status)
    {
        return AdminBll.Instance.ChangeStatus(adminId, status);
    }
    [WebMethod(EnableSession = true)]
    public int AddPermisionForListAdmin(int roleId, string listAdmin)
    {
        return PermissionBll.Instance.AddPermisionForListAdmin(roleId, listAdmin);
    }

    [WebMethod(EnableSession = true)]
    public int SetPassword(string userName, string password)
    {
        return AdminBll.Instance.SetPassword(userName, password);
    }

    [WebMethod(EnableSession = true)]
    public int ChangePassword(string oldPassword, string newPassword)
    {
        return AdminBll.Instance.ChangePassword(Utils.AdminUtil.AdminName, oldPassword, newPassword);
    }

    [WebMethod(EnableSession = true)]
    public int AdminEdit(int adminId, string userName, string password, int status, string fullName)
    {
        if (!AdminUtil.IsLogin) return -1000;
        int ret = AdminBll.Instance.AdminEdit(adminId, userName, password, status, fullName);
        var summary = "";
        if (ret > 0)
        {
            if (adminId == -1)
            {
                summary = string.Format("Thêm mới quản trị [Tên đăng nhập:{0}] [fullName:{1}] [Trạng thái:{2} [Tạo bởi:{3}]", userName, fullName, status, AdminUtil.AdminName);
                AdminBll.Instance.InsertLog((int)Config.Enums.LogActionEnum.AddNew, summary);
            }
            else
            {
                summary = string.Format("Chỉnh sửa thông tin quản trị [Tên đăng nhập:{0}] [fullName:{1}] [Trạng thái:{2}] [Tạo bởi:{3}]", userName, fullName, status, AdminUtil.AdminName);
                AdminBll.Instance.InsertLog((int)Config.Enums.LogActionEnum.Edit, summary);
            }
        }
        return ret;
    }

    [WebMethod(EnableSession = true)]
    public int AdminChangePass(int adminId, string passOld, string passNew, int type)
    {
        if (!AdminUtil.IsLogin) return -1000;
        if (type == -1) adminId = AdminUtil.AdminId;
        int ret = AdminBll.Instance.AdminChangePass(adminId, passOld, passNew);
        var summary = "";
        summary = string.Format("Cập nhật mật khẩu [AdminId:{0}] [Bởi:{1}]", adminId, AdminUtil.AdminName);
        AdminBll.Instance.InsertLog((int)Config.Enums.LogActionEnum.AddNew, summary);
        return ret;
    }

    [WebMethod(EnableSession = true)]
    public int AdminUpdateStatus(int id, int status)
    {
        if (!AdminUtil.IsLogin) return -1000;
        int ret = AdminBll.Instance.AdminUpdateStatus(id, status);
        var summary = "";
        if (ret > 0)
        {
            summary = string.Format("Cập nhật trạng thái quản trị [UserId:{0}] [Trạng thái:{1}] [Bởi:{2}]", id, status, AdminUtil.AdminName);
            AdminBll.Instance.InsertLog((int)Config.Enums.LogActionEnum.Edit, summary);
        }
        return ret;
    }

    [WebMethod(EnableSession = true)]
    public int AdminDelete(int id)
    {
        if (!AdminUtil.IsLogin) return -1000;
        int ret = AdminBll.Instance.AdminDelete(id);
        var summary = "";
        if (ret > 0)
        {
            summary = string.Format("Xóa quản trị [id:{0}] [Bởi:{1}]", id, AdminUtil.AdminName);
            AdminBll.Instance.InsertLog((int)Config.Enums.LogActionEnum.Delete, summary);
        }
        return ret;
    }
}
