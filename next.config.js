const cacheHeaders = () => {
  const fileCacheHeaders = []
  const filePaths = [
    "/fonts/inter-var-roman.woff2",
    "/fonts/Radial-Bold.woff2",
    "/fonts/Radial-Regular.woff",
  ]

  filePaths.forEach((filePath) => {
    fileCacheHeaders.push({
      source: filePath,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    })
  })

  return fileCacheHeaders
}

module.exports = {
  trailingSlash: false,
  reactStrictMode: true,
  cleanUrls: true,
  images: {
    domains: [
      "nzdfmwfizgsuswwnveaq.supabase.in", // supabase storage
    ],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/signin",
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      ...cacheHeaders(),
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, module: false }
    return config
  },
}

const ContentSecurityPolicy = `
  default-src 'self';
  font-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' * blob: data:;
  object-src 'self' blob: data:;
  media-src 'self';
  child-src *.youtube.com *.google.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.supabase.co *.vercel-insights.com;
  connect-src 'self' *.supabase.co *.vercel-insights.com data: ws: wss://*.supabase.co;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
]
