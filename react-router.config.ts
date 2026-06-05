import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  basename: process.env.GITHUB_PAGES === "true" ? "/hiremescore/" : "/",
} satisfies Config;
