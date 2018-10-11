using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;

namespace Library
{
    public class LetterCaptcha
    {
        string[] ValidFonts = { "Tahoma", "Arial" };
        public LetterCaptcha(char c)
        {
            Random rnd = new Random();
            font = new Font(ValidFonts[rnd.Next(ValidFonts.Count() - 1)], rnd.Next(20) + 20, GraphicsUnit.Pixel);
            letter = c;
        }
        public Font font
        {
            get;
            private set;
        }
        public Size LetterSize
        {
            get
            {
                var Bmp = new Bitmap(1, 1);
                var Grph = Graphics.FromImage(Bmp);
                return Grph.MeasureString(letter.ToString(), font).ToSize();
            }
        }
        public char letter
        {
            get;
            private set;
        }
        public int space
        {
            get;
            set;
        }
        private static byte[] SymmetricKey
        {
            get
            {
                return Encoding.UTF8.GetBytes("1B2c3D4e5F6g7H81");
            }
        }
    }
}

