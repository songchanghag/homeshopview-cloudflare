import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/categories", label: "카테고리" },
  { href: "/columns", label: "칼럼" },
  { href: "/author", label: "운영자 소개" },
  { href: "/about", label: "사이트 소개" },
  { href: "/contact", label: "문의하기" },
];

function SiteLogo({ size = 32 }: { size?: number }) {
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

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <SiteLogo size={32} />
            <span className="font-bold text-foreground text-base leading-tight hidden sm:block">
              {siteConfig.name}
            </span>
            <span className="font-bold text-foreground text-sm leading-tight sm:hidden">
              홈쇼핑 입점 가이드
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`nav-link-${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
