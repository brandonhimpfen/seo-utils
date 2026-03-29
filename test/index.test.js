import test from "node:test";
import assert from "node:assert/strict";
import {
  slugify,
  normalizeTitle,
  trimMetaDescription,
  normalizeCanonicalUrl,
  formatRobotsDirectives,
  getOgImageAlt
} from "../src/index.js";

test("slugify creates a lowercase slug", () => {
  assert.equal(slugify("The Future of AI Infrastructure"), "the-future-of-ai-infrastructure");
});

test("slugify respects maxLength", () => {
  assert.equal(slugify("A Very Long SEO Title for a Detailed Blog Article", { maxLength: 20 }), "a-very-long-seo");
});

test("normalizeTitle appends site name", () => {
  assert.equal(normalizeTitle("AI Infrastructure", "Brandon Himpfen"), "AI Infrastructure | Brandon Himpfen");
});

test("trimMetaDescription truncates gracefully", () => {
  const input = "This is a long description that should be trimmed in a clean way without cutting through a word abruptly.";
  assert.equal(trimMetaDescription(input, 70), "This is a long description that should be trimmed in a clean way…");
});

test("normalizeCanonicalUrl strips query and hash", () => {
  assert.equal(
    normalizeCanonicalUrl("https://example.com/blog/post/?utm_source=test#section", { trailingSlash: "remove" }),
    "https://example.com/blog/post"
  );
});

test("formatRobotsDirectives formats directives", () => {
  assert.equal(
    formatRobotsDirectives({ index: true, follow: false, maxSnippet: 160 }),
    "index, nofollow, max-snippet:160"
  );
});

test("getOgImageAlt falls back when empty", () => {
  assert.equal(getOgImageAlt("", "Article preview"), "Article preview");
});
