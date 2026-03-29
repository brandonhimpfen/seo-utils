function ensureString(input) {
  if (input == null) return "";
  return String(input);
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function slugify(input, options = {}) {
  const {
    separator = "-",
    lowercase = true,
    maxLength = null
  } = options;

  let value = ensureString(input).normalize("NFKD");
  value = value.replace(/[\u0300-\u036f]/g, "");
  value = value.replace(/&/g, " and ");
  value = value.replace(/[^a-zA-Z0-9]+/g, separator);

  const safeSeparator = escapeRegExp(separator);
  value = value.replace(new RegExp(`${safeSeparator}{2,}`, "g"), separator);
  value = value.replace(new RegExp(`^${safeSeparator}|${safeSeparator}$`, "g"), "");

  if (lowercase) {
    value = value.toLowerCase();
  }

  if (typeof maxLength === "number" && maxLength > 0 && value.length > maxLength) {
    value = value.slice(0, maxLength);
    const lastSeparator = value.lastIndexOf(separator);
    if (lastSeparator > 0) {
      value = value.slice(0, lastSeparator);
    }
    value = value.replace(new RegExp(`^${safeSeparator}|${safeSeparator}$`, "g"), "");
  }

  return value;
}

export function normalizeTitle(title, siteName = "", options = {}) {
  const {
    separator = " | ",
    maxLength = 60
  } = options;

  const safeTitle = ensureString(title).trim();
  const safeSiteName = ensureString(siteName).trim();

  let result = safeTitle;
  if (safeSiteName) {
    result = `${safeTitle}${separator}${safeSiteName}`;
  }

  if (typeof maxLength === "number" && maxLength > 0 && result.length > maxLength) {
    result = result.slice(0, maxLength).trim();
  }

  return result;
}

export function trimMetaDescription(input, maxLength = 160) {
  const value = ensureString(input).replace(/\s+/g, " ").trim();
  if (value.length <= maxLength) {
    return value;
  }

  let truncated = value.slice(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }

  return truncated.replace(/[\s,;:.-]+$/g, "") + "…";
}

export function normalizeCanonicalUrl(input, options = {}) {
  const {
    stripQuery = true,
    stripHash = true,
    trailingSlash = "preserve"
  } = options;

  const raw = ensureString(input).trim();
  const url = new URL(raw);

  if (stripQuery) {
    url.search = "";
  }

  if (stripHash) {
    url.hash = "";
  }

  url.pathname = url.pathname.replace(/\/+/g, "/");

  if (trailingSlash === "add") {
    if (!url.pathname.endsWith("/")) {
      url.pathname += "/";
    }
  } else if (trailingSlash === "remove") {
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
  }

  return url.toString();
}

export function formatRobotsDirectives(directives = {}) {
  const parts = [];
  const orderedKeys = ["index", "follow", "noarchive", "nosnippet", "noimageindex", "maxSnippet", "maxImagePreview", "maxVideoPreview"];

  for (const key of orderedKeys) {
    if (!(key in directives)) continue;
    const value = directives[key];

    if (key === "index" || key === "follow") {
      parts.push(value ? key : `no${key}`);
      continue;
    }

    if (typeof value === "boolean") {
      if (value) {
        parts.push(key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`));
      }
      continue;
    }

    const normalizedKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    parts.push(`${normalizedKey}:${value}`);
  }

  return parts.join(", ");
}

export function getOgImageAlt(input, fallback = "Preview image") {
  const value = ensureString(input).trim();
  return value || fallback;
}

export default {
  slugify,
  normalizeTitle,
  trimMetaDescription,
  normalizeCanonicalUrl,
  formatRobotsDirectives,
  getOgImageAlt
};
