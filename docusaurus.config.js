// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import "dotenv/config";
import { themes as prismThemes } from "prism-react-renderer";

const COPYRIGHT_START_YEAR = 2024;
const currentYear = new Date().getFullYear();
const copyrightYearLabel =
  currentYear > COPYRIGHT_START_YEAR
    ? `${COPYRIGHT_START_YEAR}-${currentYear}`
    : `${COPYRIGHT_START_YEAR}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "RDK 资料中心",
  favicon: "img/logo.png",
  url: "https://developer.d-robotics.cc",
  // 必须与仓库名一致：GitHub Pages 项目站点路径为 /<repo>/
  baseUrl: "/rdk_doc_center/",
  // 线上网关对带尾随 "/" 的路径存在重写问题：如 /en/ -> /en//index.html (404)
  // 关闭尾随斜杠，确保语言切换与链接使用 /en 而不是 /en/
  trailingSlash: false,
  organizationName: "D-Robotics",
  projectName: "rdk_doc_center",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  headTags: [
    {
      tagName: "script",
      attributes: {
        defer: "defer",
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "b0c771b8-947e-4fa4-8880-606ecab89c36",
      },
    },
  ],
  customFields: {
    // Portal federated search — ONLY Search-Only key + App ID (shipped to browser).
    // NEVER set ALGOLIA_ADMIN_API_KEY here or in any client bundle.
    // Local: .env (gitignored). CI: GitHub Secrets → build job env only.
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || "",
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY || "",
      // Not confidential; phase-2: multi-index via searchIndexes / ALGOLIA_SEARCH_INDEXES
      indexName: process.env.ALGOLIA_INDEX_NAME || "rdk_doc_center",
      searchIndexes: (
        process.env.ALGOLIA_SEARCH_INDEXES ||
        process.env.ALGOLIA_INDEX_NAME ||
        "rdk_doc_center"
      )
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    },
    feedbackFloat: {
      enabled: true,
      questionnaireUrl: "https://horizonrobotics.feishu.cn/share/base/form/shrcnLQ9OfYQO03cebdkNfOmkCh",
      questionnaireUrlByLocale: {
        "zh-Hans": "https://horizonrobotics.feishu.cn/share/base/form/shrcnLQ9OfYQO03cebdkNfOmkCh",
        en: "https://horizonrobotics.feishu.cn/share/base/form/shrcnLQ9OfYQO03cebdkNfOmkCh",
      },
      // 站点内路径规则（基于 baseUrl 之后的路径）：
      // - "/" 精确匹配中文首页
      // - "/en" 精确匹配英文首页
      // - "/*" 匹配全部页面
      // - "/en/*" 匹配英文全部页面
      showOnPathRules: ["/", "/en"],
      hideOnPathRules: [],
    },
  },

  scripts: [
    {
      src: "https://hm.baidu.com/hm.js?24dd63cad43b63889ea6bede5fd1ab9e",
      async: true,
    },
    // 修复线上网关对 /en/ 目录请求的重写问题：
    // - 将语言切换链接从 /en/ 统一改为 /en
    // - 若落到 /en/ 或 /en/index.html 则跳转到 /en
    { src: "/rdk_doc_center/js/locale-slash-fix.js", defer: true },
    // {
    //   src: "/rdk_doc_manager/js/dify-config.js",
    // },
    // {
    //   src: "https://rdk.d-robotics.cc/embed.min.js",
    //   id: "MltLQTHPb5EeP7uz",
    //   defer: true,
    // },
  ],

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans", "en"],
    localeConfigs: {
      en: {
        label: "EN",
        htmlLang: "en",
      },
      "zh-Hans": {
        label: "CN",
        htmlLang: "zh-Hans",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        pages: { exclude: ["/imager/**", "**/dl/**"] },
        theme: { customCss: "./src/css/custom.css" },
        sitemap: { lastmod: "date" },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "RDK 文档中心",
        logo: {
          alt: "地瓜机器人社区 logo",
          src: "img/logo.png",
          href: "https://d-robotics.cc/",
        },
        items: [
          {
            href:
              process.env.DOCUSAURUS_CURRENT_LOCALE === "en"
                ? "https://developer.d-robotics.cc/en"
                : "https://developer.d-robotics.cc/",
            label: "Community",
            position: "left",
          },

          {
            href: "https://github.com/D-Robotics",
            label: "GitHub",
            position: "right",
          },

          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "友情链接",
            items: [
              {
                label: "古月居",
                href: "https://www.guyuehome.com/",
              },
            ],
          },
          {
            title: "联系我们",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/D-Robotics",
              },
              {
                label: "Bilibili",
                href: (() => {
                  if (process.env.DOCUSAURUS_CURRENT_LOCALE === "en") {
                    return "https://www.youtube.com/@D-Robotics";
                  }
                  return "https://space.bilibili.com/437998606";
                })(),
              },
            ],
          },
        ],
        copyright: `Copyright © ${copyrightYearLabel} D-Robotics.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
