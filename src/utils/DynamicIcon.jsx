import * as LucideIcons from 'lucide-react';

export default function DynamicIcon({ iconString, className = "" }) {
  // 1. Check if the string is a URL 
  if (iconString?.startsWith('http') || iconString?.startsWith('/')) {
    return <img src={iconString} alt="category icon" className={`object-contain ${className}`} />;
  }
    // 2. Try to find a matching icon in the LucideIcons collection
  const IconComponent = LucideIcons[iconString];

  // 3. Fallback icon if the name doesn't exist or is mistyped in the DB
  if (!IconComponent) {
    return <LucideIcons.HelpCircle className={`text-gray-400 ${className}`} />;
  }

  return <IconComponent className={className} />;
}