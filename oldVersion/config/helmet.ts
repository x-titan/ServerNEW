import type { HelmetOptions } from "helmet"

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://x-titan.github.io",
        "https://titanium-studio.github.io",
      ],
      imgSrc: [
        "'self'",
        "https://titanium-studio.github.io",
      ],
    },
  },
} as HelmetOptions

export default helmetConfig
