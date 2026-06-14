export default function ProgressStepper({ currentStep }) {
  const steps = [
    { number: 1, label: 'البيانات الأساسية', icon: 'person', completed: currentStep > 1 },
    { number: 2, label: 'الملف المهني', icon: 'work', completed: currentStep > 2 },
    { number: 3, label: 'التوثيق', icon: 'description', completed: false },
  ];

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        {/* Progress line */}
        <div
          className="absolute top-5 right-0 h-0.5 bg-[#a83900] z-0 transition-all duration-500"
          style={{
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
          }}
        />

        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isDone = step.completed;
          return (
            <div key={step.number} className="flex flex-col items-center gap-2 z-10 bg-gray-50 px-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                  ${isDone
                    ? 'bg-[#a83900] text-white'
                    : isActive
                    ? 'bg-white border-2 border-[#a83900] text-[#a83900]'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
              >
                {isDone ? (
                  <span className="material-symbols-outlined text-base">check</span>
                ) : (
                  <span className="material-symbols-outlined text-base">{step.icon}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors
                  ${isActive ? 'text-[#a83900] font-bold' : isDone ? 'text-gray-600' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
