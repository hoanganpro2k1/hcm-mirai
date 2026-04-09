import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href?: string;
}

interface ServiceGridProps {
  title: string;
  subtitle?: string;
  items: ServiceItem[];
  accentText?: string;
  seeMoreText?: string;
}

export default function ServiceGrid({
  title,
  subtitle,
  items,
  accentText,
  seeMoreText = "Xem Thêm",
}: ServiceGridProps) {
  return (
    <section className="py-12 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          {accentText && (
            <div className="inline-flex items-center justify-center space-x-2 text-primary font-bold text-xs tracking-wider uppercase mb-2">
              <span className="w-8 h-0.5 bg-primary rounded-full"></span>
              <span>{accentText}</span>
              <span className="w-8 h-0.5 bg-primary rounded-full"></span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-white border-2 border-primary/20 hover:border-primary transition-colors duration-300 p-8 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4 h-14 flex items-center">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-8 grow text-sm leading-relaxed">
                {item.description}
              </p>
              {item.href && (
                <Link
                  href={item.href}
                  className="self-start bg-primary hover:bg-primary/90 text-white rounded px-6 py-2 h-10 w-32 flex items-center justify-center font-medium text-sm"
                >
                  {seeMoreText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
