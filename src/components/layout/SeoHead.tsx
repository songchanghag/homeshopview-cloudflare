import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SeoHead({ title, description, path = "" }: SeoHeadProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const fullUrl = `${siteConfig.url}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", fullDescription);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", fullDescription, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", siteConfig.name, true);
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", fullDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }, [fullTitle, fullDescription, fullUrl]);

  return null;
}
