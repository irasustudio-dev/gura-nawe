import { cn } from '../../utils/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center mx-auto max-w-2xl",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
