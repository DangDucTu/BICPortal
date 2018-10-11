using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Library
{
    public class Folder
    {
        /// <summary>
        /// Tạo thư mục
        /// </summary>
        /// <param name="path"></param>
        public void CreateFolder(string path)
        {
            try
            {
                if (!Directory.Exists(path))// kiem tra xem folder co ton tai khong
                {
                    Directory.CreateDirectory(path);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Di chuyển thư mục
        /// </summary>
        /// <param name="pathResource"></param>
        /// <param name="pathDest"></param>
        public void MoveFolder(string pathResource, string pathDest)
        {
            try
            {
                Directory.Move(pathResource, pathDest);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Copy thư mục
        /// </summary>
        /// <param name="sourceFolder"></param>
        /// <param name="destFolder"></param>
        public void CopyFolder(string sourceFolder, string destFolder)
        {
            try
            {
                if (!Directory.Exists(destFolder))
                    Directory.CreateDirectory(destFolder);
                string[] files = Directory.GetFiles(sourceFolder);
                //Neu co file thi phai copy file
                foreach (string file in files)
                {
                    string name = Path.GetFileName(file);
                    string dest = Path.Combine(destFolder, name);
                    File.Copy(file, dest);
                }
                string[] folders = Directory.GetDirectories(sourceFolder);
                foreach (string folder in folders)
                {
                    string name = Path.GetFileName(folder);
                    string dest = Path.Combine(destFolder, name);
                    CopyFolder(folder, dest);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Đọc thư mục
        /// </summary>
        /// <param name="path"></param>
        public void ReadFolder(string path)
        {
            DirectoryInfo drInfo = new DirectoryInfo(path);
            Console.WriteLine("Cac file trong thu muc {0}", path);
            // lay cac file trong thu muc
            FileInfo[] files = drInfo.GetFiles();
            //doc ten cac file
            foreach (FileInfo f in files)
            {
                Console.WriteLine(f.FullName);
            }
            //lay cac folder con
            DirectoryInfo[] folders = drInfo.GetDirectories();
            foreach (DirectoryInfo fol in folders)
            {
                Console.WriteLine(fol.FullName);
                ReadFolder(fol.FullName);
            }
        }

        /// <summary>
        /// Xóa thư mục
        /// </summary>
        /// <param name="path"></param>
        public void DeleteFolder(string path)
        {
            try
            {
                DirectoryInfo drInfo = new DirectoryInfo(path);
                DirectoryInfo[] folders = drInfo.GetDirectories(); // lay cac folder
                FileInfo[] files = drInfo.GetFiles(); //lay cac files
                // neu van con thu muc con thi phai xoa het cac thu muc con
                if (folders != null)
                {
                    foreach (DirectoryInfo fol in folders)
                    {
                        DeleteFolder(fol.FullName);  //xoa thu muc con va cac file trong thu muc con do
                    }
                }
                //Neu van con file thi phai xoa het cac file
                if (files != null)
                {
                    foreach (FileInfo f in files)
                    {
                        File.Delete(f.FullName);
                    }
                }
                //Cuoi cung xoa thu muc goc
                Directory.Delete(path);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
