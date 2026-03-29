# seo-utils

A lightweight utility library for common SEO tasks.

`seo-utils` provides small, focused helper functions for tasks that appear frequently in content systems, static sites, publishing workflows, and web applications. It is designed to help normalize and generate common SEO values without requiring a large framework.

## Why this project exists

SEO-related logic is often repeated across applications.

One project trims titles manually. Another generates slugs in a slightly different way. A third assembles canonical URLs with custom string logic. Over time, these small inconsistencies create unnecessary duplication and make content systems harder to maintain.

This package provides a simple set of reusable helpers for common SEO tasks.

## What is included

- Slug generation.
- Title normalization.
- Meta description trimming.
- Canonical URL normalization.
- Robots directive formatting.
- Open Graph image alt fallback helper.
- Basic tests.
- Example usage.

## Install

```bash
npm install @brandonhimpfen/seo-utils
```

## Example

```js
import {
  slugify,
  normalizeTitle,
  trimMetaDescription,
  normalizeCanonicalUrl,
  formatRobotsDirectives
} from "@brandonhimpfen/seo-utils";

const slug = slugify("The Future of AI Infrastructure");
const title = normalizeTitle("AI Infrastructure", "Brandon Himpfen");
const description = trimMetaDescription(
  "A practical overview of the software, systems, and infrastructure layers that make AI usable at scale.",
  160
);
const canonical = normalizeCanonicalUrl("https://www.example.com/blog/ai-infrastructure/");
const robots = formatRobotsDirectives({
  index: true,
  follow: true,
  maxSnippet: 160
});

console.log({ slug, title, description, canonical, robots });
```

## Design Principles

This project is intentionally minimal.

It focuses on common, reusable SEO helpers rather than full SEO frameworks or site generators. The goal is to provide reliable utilities that can be used across different systems without introducing unnecessary abstraction.

The design emphasizes:

- Simplicity over feature creep.
- Predictable outputs over magic behavior.
- Reusability across publishing workflows.
- Clear interfaces over configuration-heavy APIs.

## API

### `slugify(input, options?)`

Convert a string into a URL-friendly slug.

### `normalizeTitle(title, siteName?, options?)`

Build a title string with optional site branding and maximum length handling.

### `trimMetaDescription(input, maxLength?)`

Trim a description to a target length without cutting words abruptly when possible.

### `normalizeCanonicalUrl(input, options?)`

Normalize a canonical URL by removing duplicate slashes, optionally stripping query strings and hashes, and handling trailing slashes consistently.

### `formatRobotsDirectives(directives)`

Format a robots directive object into a comma-separated string.

### `getOgImageAlt(input, fallback?)`

Return a usable Open Graph image alt string with a fallback when needed.

## Roadmap

Future extensions may include:

- JSON-LD helper generation.
- hreflang utilities.
- sitemap helpers.
- breadcrumb structured data helpers.
- social meta normalization.

## License

MIT
