using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Config.Pattern;
using DataContext;
using EntityBLL;

namespace WorkFlowBLL
{
    public class ELT
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static HR Instance
        {
            get
            {
                return Singleton<HR>.Instance;
            }
        }
        #endregion

        public int InsertETLDic(string package, string controlFlow, string sourceDb, string sourceTable, string destDb, string destTable, string note)
        {
            return DbETL.ContentInstance.uspETLDictionaryInsert(package, controlFlow, sourceDb, sourceTable, destDb, destTable, note);
        }

        public int UpdateETLDic(int id, string package, string controlFlow, string sourceDb, string sourceTable, string destDb, string destTable, string note)
        {
            return DbETL.ContentInstance.uspETLDictionaryUpdate(id, package, controlFlow, sourceDb, sourceTable, destDb, destTable, note);
        }

        public int DeleteETLDic(int id)
        {
            return DbETL.ContentInstance.uspETLDictionaryDelete(id);
        }

        public List<uspETLDictionaryGetListResult> GetListETLDic(string db, string table)
        {
            return DbETL.ContentInstance.uspETLDictionaryGetList(db, table).ToList();
        }

        public uspETLDictionaryGetInfoResult GetListETLDic(int id)
        {
            return DbETL.ContentInstance.uspETLDictionaryGetInfo(id).ToList().FirstOrDefault();
        }
    }
}
