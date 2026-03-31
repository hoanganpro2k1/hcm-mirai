import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 space-y-4",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className,
      )}
    >
      <h2
        className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-bold text-accent leading-tight",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      )}
      {align === "center" && (
        <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full" />
      )}
      {align === "left" && (
        <div className="w-24 h-1 bg-accent mt-4 rounded-full" />
      )}
    </div>
  );
}
