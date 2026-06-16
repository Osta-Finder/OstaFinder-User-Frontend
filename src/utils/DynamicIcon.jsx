import * as LucideIcons from 'lucide-react';

const toPascalCase = (string) => {
  if (!string) return "";
  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export default function DynamicIcon({ iconString, className = "" }) {
  if (iconString?.startsWith('http') || iconString?.startsWith('/')) {
    return <img src={iconString} alt="category icon" className={`object-contain ${className}`} />;
  }

  const formattedIconName = toPascalCase(iconString);

  const IconComponent = LucideIcons[formattedIconName] || LucideIcons[iconString];

  if (!IconComponent) {
    return (
      <LucideIcons.Hammer 
        className={className} 
        title={`Icon not found: ${iconString}`} 
      />
    );
  }

  return <IconComponent className={className} />;
}