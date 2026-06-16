import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useSubmitContactMutation } from "../../../services/contactApi";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const contactTypes = [
  { value: "inquiry", label: "استفسار" },
  { value: "complaint", label: "شكوى" },
  { value: "suggestion", label: "اقتراح" },
  { value: "problem", label: "مشكلة" },
  { value: "opinion", label: "رأي" },
];

const contactInfo = [
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    content: "support@ostafinder.com",
    bg: "bg-orange-50",
    iconBg: "bg-gradient-to-br from-orange-400 to-orange-500",
  },
  {
    icon: Phone,
    title: "رقم الهاتف",
    content: "15569",
    bg: "bg-green-50",
    iconBg: "bg-gradient-to-br from-green-400 to-green-500",
  },
  {
    icon: MapPin,
    title: "العنوان",
    content: "القاهرة، مصر",
    bg: "bg-blue-50",
    iconBg: "bg-gradient-to-br from-blue-400 to-blue-500",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    content: "السبت - الخميس 9:00 ص - 9:00 م",
    bg: "bg-purple-50",
    iconBg: "bg-gradient-to-br from-purple-400 to-purple-500",
  },
];

const egyptianPhoneRegex = /^(01[0-2,5]\d{8}|015\d{8})$/;

const validateField = (name, value) => {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "الاسم مطلوب";
      if (v.length < 2) return "الاسم يجب أن يكون على الأقل حرفين";
      return "";
    case "email":
      if (!v) return "البريد الإلكتروني مطلوب";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "البريد الإلكتروني غير صحيح";
      return "";
    case "phone":
      if (v && !egyptianPhoneRegex.test(v)) return "رقم الهاتف يجب أن يكون رقم مصري صحيح (01xxxxxxxxx)";
      return "";
    case "subject":
      if (!v) return "الموضوع مطلوب";
      if (v.length < 3) return "الموضوع يجب أن يكون على الأقل 3 أحرف";
      return "";
    case "message":
      if (!v) return "الرسالة مطلوبة";
      if (v.length < 10) return "الرسالة يجب أن تكون على الأقل 10 أحرف";
      return "";
    default:
      return "";
  }
};

const validateAll = (form) => {
  const errors = {};
  let isValid = true;
  ["name", "email", "subject", "message", "phone"].forEach((field) => {
    const err = validateField(field, form[field]);
    if (err) {
      errors[field] = err;
      isValid = false;
    }
  });
  return { errors, isValid };
};

export default function ContactUs() {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", type: "inquiry", subject: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: newErrors, isValid } = validateAll(form);
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (!isValid) {
      toast.error("يرجى تصحيح الأخطاء في الحقول قبل الإرسال");
      return;
    }
    try {
      await submitContact(form).unwrap();
      toast.success("تم إرسال رسالتك بنجاح، سنتواصل معك قريباً");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", type: "inquiry", subject: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (err) {
      const backendErrors = err?.data?.errors;
      if (backendErrors && Array.isArray(backendErrors)) {
        const fieldErrors = {};
        backendErrors.forEach((e) => {
          if (e.field) fieldErrors[e.field] = e.message;
        });
        if (Object.keys(fieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
          setTouched({ name: true, email: true, phone: true, subject: true, message: true });
        }
      }
      toast.error(err?.data?.message || "حدث خطأ أثناء الإرسال، حاول مرة أخرى");
    }
  };

  const inputClass = (name) =>
    `w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all bg-gray-50/50 ${
      errors[name] && touched[name]
        ? "border-red-400 focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
        : touched[name] && !errors[name]
        ? "border-green-400 focus:ring-2 focus:ring-green-500/40 focus:border-green-500"
        : "border-gray-200 focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
    }`;

  const selectClass = (name) =>
    `w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all bg-gray-50/50 appearance-none ${
      errors[name] && touched[name]
        ? "border-red-400 focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
        : "border-gray-200 focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-gradient-to-br from-[#111827] via-gray-900 to-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              تواصل <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-orange-300">معنا</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              فريق أوستا فايندر هنا لمساعدتك. سواء كان لديك استفسار، شكوى، أو اقتراح،
              لا تتردد في التواصل معنا
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">تم الإرسال بنجاح!</h3>
                <p className="text-gray-500 mb-8">شكراً لتواصلك معنا، سنقوم بالرد على استفسارك في أقرب وقت ممكن</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال رسالة جديدة</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-500/25">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">أرسل لنا رسالة</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" name="name" value={form.name}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("name")}
                        placeholder="أحمد محمود"
                      />
                      {errors.name && touched[name] && (
                        <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("email")}
                        placeholder="example@email.com"
                      />
                      {errors.email && touched.email && (
                        <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">رقم الهاتف</label>
                      <input
                        type="tel" name="phone" value={form.phone}
                        onChange={handleChange} onBlur={handleBlur}
                        className={inputClass("phone")}
                        placeholder="01xxxxxxxxx"
                      />
                      {errors.phone && touched.phone && (
                        <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">نوع الرسالة</label>
                      <select
                        name="type" value={form.type} onChange={handleChange}
                        className={selectClass("type")}
                      >
                        {contactTypes.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      الموضوع <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="subject" value={form.subject}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("subject")}
                      placeholder="عنوان الرسالة"
                    />
                    {errors.subject && touched.subject && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      الرسالة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} onBlur={handleBlur}
                      rows="5"
                      className={`${inputClass("message")} resize-none`}
                      placeholder="اكتب رسالتك هنا... (على الأقل 10 أحرف)"
                    />
                    {errors.message && touched.message && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1.5 text-left">
                      {form.message.length}/5000
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className={`${item.bg} rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${item.iconBg} p-3 rounded-2xl shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-gradient-to-br from-orange-500 to-orange-400 rounded-3xl p-8 shadow-xl mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">نحن هنا لمساعدتك!</h3>
                  <p className="text-orange-100 text-sm leading-relaxed">
                    فريق الدعم الفني لدينا جاهز للرد على جميع استفساراتك في أقرب وقت ممكن.
                    عادة ما يتم الرد خلال 24 ساعة عمل.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
