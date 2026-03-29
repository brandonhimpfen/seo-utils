import {
  slugify,
  normalizeTitle,
  trimMetaDescription,
  normalizeCanonicalUrl,
  formatRobotsDirectives
} from "../src/index.js";

const output = {
  slug: slugify("SEO Utilities for Modern Publishing"),
  title: normalizeTitle("SEO Utilities", "Brandon Himpfen"),
  description: trimMetaDescription(
    "A small set of reusable helper functions for common SEO tasks in websites, content systems, and publishing workflows.",
    150
  ),
  canonical: normalizeCanonicalUrl("https://example.com/articles/seo-utils/?ref=homepage#top", {
    trailingSlash: "remove"
  }),
  robots: formatRobotsDirectives({
    index: true,
    follow: true,
    maxSnippet: 155,
    maxImagePreview: "large"
  })
};

console.log(output);
