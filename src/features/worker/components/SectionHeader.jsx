import { Link } from "react-router-dom";

export default function SectionHeader({ title, linkText, linkUrl }) {
  return (
    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {linkText && linkUrl && (
        <Link to={linkUrl} className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
          {linkText}
        </Link>
      )}
    </div>
  );
}
