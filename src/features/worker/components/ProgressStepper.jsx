export default function ProgressStepper({ currentStep }) {
  const steps = [
    { number: 1, label: 'البيانات الأساسية', completed: currentStep > 1 },
    { number: 2, label: 'الملف المهني', completed: currentStep > 2 },
    { number: 3, label: 'التوثيق', completed: false },
  ];

  const progressWidth = currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%';

  return (
    <div style={{
      width: '100%',
      maxWidth: '42rem',
      marginBottom: '3rem',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: '#e1e3e4',
        zIndex: 0,
        transform: 'translateY(-50%)',
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        right: 0,
        width: progressWidth,
        height: '2px',
        backgroundColor: '#a83900',
        zIndex: 0,
        transform: 'translateY(-50%)',
        transition: 'width 0.5s ease',
      }}></div>

      {steps.map((step) => (
        <div
          key={step.number}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            position: 'relative',
            backgroundColor: '#f8f9fa',
            padding: '0 0.5rem',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              transition: 'all 0.3s',
              backgroundColor: step.completed
                ? '#a83900'
                : currentStep === step.number
                  ? '#ffffff'
                  : '#ffffff',
              color: step.completed
                ? '#ffffff'
                : currentStep === step.number
                  ? '#a83900'
                  : '#594139',
              border: step.completed
                ? 'none'
                : currentStep === step.number
                  ? '2px solid #a83900'
                  : '2px solid #e1e3e4',
            }}
          >
            {step.completed ? (
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                check
              </span>
            ) : (
              step.number
            )}
          </div>
          <span
            style={{
              fontSize: '0.875rem',
              color: currentStep === step.number ? '#a83900' : '#191c1d',
              fontWeight: currentStep === step.number ? 'bold' : '500',
            }}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
