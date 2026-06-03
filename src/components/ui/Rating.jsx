
const cn = (...args) => args.filter(Boolean).join(" ");

function StarIcon({ className, filled = false }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  );
}

export default function Rating({
  rating = 5,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
}) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const starSize = sizes[size] || sizes.md;

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const filled = rating >= i;
    stars.push(
      <span key={i} className={filled ? "inline-block text-yellow-400" : "inline-block text-muted-foreground/30"}>
        <StarIcon className={cn(starSize)} filled={filled} />
      </span>,
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center gap-1">{stars}</div>
      {showValue && (
        <span className={cn("text-muted-foreground ml-2 text-sm")}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

export { StarIcon };
