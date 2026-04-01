interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2
        className={`text-2xl md:text-3xl font-bold mb-2 ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base ${light ? "text-white/75" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
