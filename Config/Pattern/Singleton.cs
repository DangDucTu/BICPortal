//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2010-05-29
// Description: Singleton pattern create Instance Object
//
using System;
using System.Web;

namespace Config.Pattern
{
    // Singleton factory implementation
    /// <summary>
    /// The page singleton.
    /// </summary>
    /// <typeparam name="T">
    /// </typeparam>
    public static class Singleton<T> where T : class, new()
    {
        // static constructor, 
        // runtime ensures thread safety

        /// <summary>
        /// The _instance.
        /// </summary>
        private static T _instance;

        /// <summary>
        /// Gets Instance.
        /// </summary>
        public static T Instance
        {
            get
            {
                return GetInstance();
            }
        }

        /// <summary>
        /// The get instance.
        /// </summary>
        /// <returns>
        /// </returns>
        private static T GetInstance()
        {
            if (HttpContext.Current == null)
            {
                if (_instance == null)
                {
                    _instance = (T)Activator.CreateInstance(typeof(T), true);
                }

                return _instance;
            }

            string typeStr = typeof(T).ToString();

            return (T)(HttpContext.Current.Items[typeStr] ?? (HttpContext.Current.Items[typeStr] = Activator.CreateInstance(typeof(T), true)));
        }

        public static T GetInstance(params object[] args)
        {
            if (HttpContext.Current == null)
            {
                if (_instance == null)
                {
                    _instance = (T)Activator.CreateInstance(typeof(T), args);
                }

                return _instance;
            }

            string typeStr = typeof(T).ToString();

            return (T)(HttpContext.Current.Items[typeStr] ?? (HttpContext.Current.Items[typeStr] = Activator.CreateInstance(typeof(T), args)));
        }
    }
}