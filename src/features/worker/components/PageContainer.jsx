export default function PageContainer({ children, title, description, actions }) {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
            {description && <p className="text-gray-500 text-sm">{description}</p>}
          </div>
          {actions && (
            <div className="w-full sm:w-auto">
              {actions}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
