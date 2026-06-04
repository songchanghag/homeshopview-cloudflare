import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

function SiteLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="180" height="180" rx="32" fill="#1B4FD8"/>
      <path d="M90 44L40 83V144H70V106H110V144H140V83L90 44Z" fill="white" opacity="0.2"/>
      <rect x="58" y="68" width="16" height="60" rx="4" fill="white"/>
      <rect x="106" y="68" width="16" height="60" rx="4" fill="white"/>
      <rect x="58" y="91" width="64" height="14" rx="3" fill="white"/>
      <circle cx="142" cy="42" r="14" fill="#F59E0B"/>
      <path d="M135 42L139.5 46.5L149 37" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SiteLogo size={28} />
              <span className="font-bold text-foreground">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              운영자:{" "}
              <Link href="/author" className="text-primary hover:underline font-medium">
                {siteConfig.owner}
              </Link>
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary/60" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} className="shrink-0 text-primary/60" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-foreground transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} className="shrink-0 text-primary/60" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">빠른 링크</h3>
            <ul className="space-y-2">
              {[
                { href: "/categories", label: "카테고리" },
                { href: "/columns", label: "칼럼" },
                { href: "/about", label: "사이트 소개" },
                { href: "/author", label: "운영자 소개" },
                { href: "/contact", label: "문의하기" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">정책 및 안내</h3>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "개인정보처리방침" },
                { href: "/terms", label: "이용약관" },
                { href: "/disclaimer", label: "면책고지" },
                { href: "/sitemap", label: "사이트맵" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">문의 이메일</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            운영자:{" "}
            <Link href="/author" className="hover:text-foreground transition-colors">
              {siteConfig.owner}
            </Link>{" "}
            &middot; {siteConfig.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
