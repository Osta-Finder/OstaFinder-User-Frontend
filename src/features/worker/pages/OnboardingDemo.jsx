import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetOnboarding } from '../../../store/slices/onboardingSlice';

export default function OnboardingDemo() {
  const dispatch = useDispatch();
  const [demoData] = useState({
    basicData: {
      firstName: 'محمد',
      lastName: 'أحمد',
      email: 'mohammad@example.com',
      phone: '+966501234567',
      city: 'الرياض',
      address: 'شارع النيل، الحي الثاني',
    },
    professional: {
      specialization: 'سباكة',
      yearsOfExperience: 8,
      bio: 'متخصص في السباكة بخبرة 8 سنوات. أقدم خدمات احترافية وعالية الجودة مع الالتزام بالمواعيد والأسعار المنافسة.',
    },
  });

  const handleReset = () => {
    dispatch(resetOnboarding());
  };

  return (
    <div className="min-h-screen bg-background text-on-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Onboarding System Demo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="space-y-3 text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>Three-step onboarding flow</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>Real-time form validation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>File upload with preview</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>AI-powered bio generation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>Redux state management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>Responsive design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">
                  check_circle
                </span>
                <span>Arabic RTL support</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Steps</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold">البيانات الأساسية</p>
                  <p className="text-sm text-on-surface-variant">
                    الاسم والبريد والهاتف والعنوان
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-bold">الملف المهني</p>
                  <p className="text-sm text-on-surface-variant">
                    التخصص والخبرة والنبذة الشخصية
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold">التوثيق</p>
                  <p className="text-sm text-on-surface-variant">
                    رفع الهوية والشهادات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Sample Data</h2>
          <pre className="bg-surface p-4 rounded-lg overflow-auto text-sm text-on-surface-variant">
            {JSON.stringify(demoData, null, 2)}
          </pre>
        </div>

        <div className="flex gap-4">
          <a
            href="/worker-onboarding"
            className="px-8 py-3 rounded-full font-medium text-base bg-primary text-on-primary shadow-lg hover:opacity-90 transition-all"
          >
            Start Onboarding
          </a>
          <button
            onClick={handleReset}
            className="px-8 py-3 rounded-full font-medium text-base border-2 border-outline text-on-surface hover:bg-surface-container-low transition-colors"
          >
            Reset State
          </button>
        </div>
      </div>
    </div>
  );
}
