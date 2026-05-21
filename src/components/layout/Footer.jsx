import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E293B] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + about + social */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              <span className="text-lg font-semibold">Osta Finder</span>
            </div>
            <p className="text-sm text-gray-300">
              منصة تربط بينك وبين أمهر الصنايعية بسهولة وأمان.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="facebook"
                className="text-white hover:text-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.9v-6.99H8.08v-2.91h2.22V9.41c0-2.2 1.31-3.41 3.32-3.41.96 0 1.96.17 1.96.17v2.15h-1.1c-1.09 0-1.43.68-1.43 1.38v1.65h2.43l-.39 2.91h-2.04v6.99c4.78-.77 8.44-4.91 8.44-9.9z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="twitter"
                className="text-white hover:text-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 5.92c-.63.28-1.3.48-2 .57.72-.43 1.27-1.1 1.53-1.9-.67.4-1.41.69-2.2.85C18.9 4.6 17.99 4 17 4c-1.63 0-2.95 1.32-2.95 2.95 0 .23.03.46.08.68C10.3 7.48 7.07 5.64 4.64 3.02c-.25.43-.4.93-.4 1.47 0 1.02.52 1.92 1.32 2.45-.48-.02-.93-.15-1.33-.36v.04c0 1.42 1.01 2.61 2.35 2.88-.25.07-.51.1-.78.1-.19 0-.38-.02-.56-.05.38 1.19 1.48 2.06 2.78 2.09C6.1 15.1 4.7 15.7 3.2 15.7c-.25 0-.5 0-.74-.04C4 16.83 5.98 17.5 8.09 17.5c7.71 0 11.92-6.38 11.92-11.92v-.54c.82-.6 1.52-1.35 2.08-2.2-.75.33-1.55.55-2.39.65z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="instagram"
                className="text-white hover:text-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.5-3.5a1 1 0 11-1 1 1 1 0 011-1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-white">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-white">
                  الخدمات
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  سياسة الخصوصية
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">خدمات شائعة</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/categories/plumbing" className="hover:text-white">
                  سباكة
                </a>
              </li>
              <li>
                <a href="/categories/electric" className="hover:text-white">
                  كهرباء
                </a>
              </li>
              <li>
                <a href="/categories/carpentry" className="hover:text-white">
                  نجارة
                </a>
              </li>
              <li>
                <a href="/categories/maintenance" className="hover:text-white">
                  صيانة أجهزة
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                البريد:{" "}
                <a
                  href="mailto:info@ostafinder.com"
                  className="hover:text-white"
                >
                  info@ostafinder.com
                </a>
              </li>
              <li>
                الهاتف:{" "}
                <a href="tel:+201234567890" className="hover:text-white">
                  +20 123 456 7890
                </a>
              </li>
              <li>العنوان: القاهرة، مصر</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © 2026 Osta Finder. كل الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
