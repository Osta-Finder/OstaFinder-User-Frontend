import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfessional } from '../../../../store/slices/onboardingSlice';

const specializations = [
  { value: 'سباكة',                   icon: '🔧' },
  { value: 'كهرباء',                  icon: '⚡' },
  { value: 'نجارة',                   icon: '🪵' },
  { value: 'تكييف وتبريد',            icon: '❄️' },
  { value: 'صيانة عامة',              icon: '🛠️' },
  { value: 'دهان',                    icon: '🎨' },
  { value: 'تركيب أبواب وشبابيك',    icon: '🚪' },
  { value: 'تمديدات غاز',            icon: '🔥' },
];

export default function ProfessionalStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const professional = useSelector((state) => state.onboarding.professional);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [charCount, setCharCount] = useState(professional.bio.length);

  const isFormValid = () =>
    !!professional.specialization &&
    !!professional.yearsOfExperience &&
    Number(professional.yearsOfExperience) >= 0;

  const validateField = (name, value) => {
    if (name === 'specialization') return !value ? 'التخصص مطلوب' : '';
    if (name === 'yearsOfExperience') {
      if (!value && value !== 0) return 'سنوات الخبرة مطلوبة';
      if (Number(value) < 0)        return 'يجب أن تكون سنوات الخبرة موجبة';
    }
    return '';
  };

  useEffect(() => { onValidationChange(isFormValid()); }, [professional]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio') {
      if (value.length > 200) return;
      setCharCount(value.length);
    }
    dispatch(updateProfessional({ [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const generateBio = () => {
    if (!professional.specialization || !professional.yearsOfExperience) return;
    const text = `أنا متخصص في ${professional.specialization} بخبرة تزيد عن ${professional.yearsOfExperience} سنوات. أقدم خدمات احترافية وعالية الجودة مع الالتزام بالمواعيد والأسعار المنافسة.`;
    dispatch(updateProfessional({ bio: text }));
    setCharCount(text.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">التفاصيل المهنية</h2>
          <p className="text-xs text-gray-500">تخصصك وخبرتك في المجال</p>
        </div>
      </div>

      {/* Specialization dropdown */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          التخصص <span className="text-[#a83900]">*</span>
        </label>
        <div className="relative">
          <select
            name="specialization"
            value={professional.specialization}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full appearance-none bg-gray-50 border rounded-xl py-3 px-4 pl-10 text-sm outline-none transition-all cursor-pointer
              ${errors.specialization && touched.specialization
                ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-[#a83900] focus:ring-2 focus:ring-[#a83900]/10'
              }
              ${!professional.specialization ? 'text-gray-400' : 'text-gray-900'}`}
          >
            <option value="">اختر تخصصك الأساسي</option>
            {specializations.map(({ value }) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
            expand_more
          </span>
        </div>
        {errors.specialization && touched.specialization && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            {errors.specialization}
          </p>
        )}
      </div>

      {/* Years of experience */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          سنوات الخبرة <span className="text-[#a83900]">*</span>
        </label>
        <div className="relative max-w-xs">
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
            timeline
          </span>
          <input
            type="number"
            name="yearsOfExperience"
            value={professional.yearsOfExperience}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: 5"
            min="0"
            className={`w-full bg-gray-50 border rounded-xl py-3 pr-10 pl-4 text-sm text-gray-900 outline-none transition-all
              ${errors.yearsOfExperience && touched.yearsOfExperience
                ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-[#a83900] focus:ring-2 focus:ring-[#a83900]/10'
              }`}
          />
        </div>
        {errors.yearsOfExperience && touched.yearsOfExperience && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            {errors.yearsOfExperience}
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">
            نبذة عنك{' '}
            <span className="text-gray-400 font-normal">(اختياري)</span>
          </label>
          <span className={`text-xs ${charCount > 180 ? 'text-orange-500' : 'text-gray-400'}`}>
            {charCount}/200
          </span>
        </div>

        <div className={`border rounded-xl overflow-hidden transition-all focus-within:border-[#a83900] focus-within:ring-2 focus-within:ring-[#a83900]/10 ${charCount > 180 ? 'border-orange-300' : 'border-gray-200'}`}>
          <textarea
            name="bio"
            value={professional.bio}
            onChange={handleChange}
            placeholder="اكتب نبذة مختصرة عن مهاراتك وما يميزك لجذب العملاء..."
            rows={4}
            className="w-full bg-gray-50 px-4 py-3 text-sm text-gray-900 resize-none outline-none"
          />
          <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 flex items-center justify-between">
            <p className="text-xs text-gray-400">دع الذكاء الاصطناعي يكتب نبذتك تلقائياً</p>
            <button
              type="button"
              onClick={generateBio}
              disabled={!professional.specialization || !professional.yearsOfExperience}
              className="flex items-center gap-1 text-xs font-semibold text-[#a83900] hover:text-[#8f2f00] disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              إنشاء تلقائي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
