import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const schemaItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "홈",
      item: siteConfig.url,
    },
    ...items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 2,
      name: item.label,
      item: `${siteConfig.url}${item.href || ""}`,
    })),
  ];

  return (
    <>
      <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        <Link href="/" className="flex items-center hover:text-foreground transition-colors">
          <Home size={14} />
        </Link>
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1">
            <ChevronRight size={14} className="text-muted-foreground/50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: schemaItems,
          }),
        }}
      />
    </>
  );
}
