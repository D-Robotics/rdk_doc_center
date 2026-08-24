/**
 * 文档中心唯一配置源（分类 + 站点）。
 *
 * 维护规范：
 * - 新增/删除分类：修改 DOC_CENTER_CONFIG.categories
 * - 新增/删除文档入口：修改 DOC_CENTER_CONFIG.entries
 * - 首页、分组锚点、卡片数据均由该配置自动派生
 * - pendingRelease: true 时点击卡片仅提示「文档正在准备中，暂未上架。感谢您的关注与耐心等待！」，不跳转
 *   可写在 entry 根级（中英文同时生效），也可写在 zh/en 下单独控制某一语言
 * - versions: 可选。多版本手册卡片内提供版本选择
 *   Latest（id/label 为 latest）为持续更新文档，不作为卡片默认入口
 *   默认展示并跳转到 Latest 之外、版本号最高的已上架版本（如 1.1.2、1.1.3 中默认 1.1.3）
 *   每个 version 可写 href（中文）、en.href（英文）、pendingRelease、index（是否纳入 Algolia；默认仅 Latest 滚动文档）
 *   versionHint 可写在 zh/en 下，显示在版本选择器上方作为选用说明
 *   latestOptionHint / newestReleaseHint 写在选项内：Latest 通道、当前最高已发布版本
 *   descriptionHoverHint：卡片悬浮时覆盖描述区域的提示，不遮挡标题和版本按钮
 * - 首页全文搜索由 Algolia 联邦索引提供（见 algoliaSites.js / scripts/algolia-index.mjs）
 */
export const DOC_CENTER_CONFIG = {
  categories: [
    {
      id: "products",
      anchor: "products",
      accent: "#2e8555",
      icon: "manual",
      zh: {
        title: "RDK 用户手册",
        navTitle: "RDK",
        // subtitle: "Hardware / 系统烧录 / 配件清单 / 下载资源 / 附录 / FAQ",
      },
      en: {
        title: "RDK User Manual",
        navTitle: "RDK",
        // subtitle: "Hardware / System Installation / Accessories / Download Resources / Appendix / FAQ",
      },
    },
    {
      id: "robot-app",
      anchor: "robot-app",
      accent: "#9333ea",
      icon: "robot",
      zh: {
        title: "机器人应用",
        navTitle: "TROS",
        // subtitle: "TROS · 各平台同步发版",
      },
      en: {
        title: "Robot Applications",
        // subtitle: "TROS · Synchronous release across platforms",
        navTitle: "TROS",
      },
    },
    {
      id: "model-zoo",
      anchor: "model-zoo",
      accent: "#f97316",
      icon: "model",
      zh: {
        title: "算法应用 · Model Zoo",
        navTitle: "Model Zoo",
        // subtitle: "官方模型仓库入口（外链）",
      },
      en: {
        title: "Algorithm Applications · Model Zoo",
        // subtitle: "Official model repository entrance (external link)",
        navTitle: "Model Zoo",
      },
    },
    {
      id: "examples",
      anchor: "examples",
      accent: "#0ea5e9",
      icon: "examples",
      zh: {
        title: "应用开发示例",
        navTitle: "应用案例",
        // subtitle: "覆盖 X3 / X5 / S100 / S600",
      },
      en: {
        title: "Application Development Examples",
        // subtitle: "Covering X3 / X5 / S100 / S600",
        navTitle: "Examples",
      },
    },
    {
      id: "accessories",
      anchor: "accessories",
      accent: "#14b8a6",
      icon: "accessories",
      zh: {
        title: "产品与配件",
        navTitle: "产品与配件",
        // subtitle: "IMU / Stereo Camera 系列",
      },
      en: {
        title: "Products & Accessories",
        // subtitle: "IMU / Stereo Camera Series",
        navTitle: "Products & Accessories",
      },
    },
    {
      id: "software",
      anchor: "software",
      accent: "#db2777",
      icon: "software",
      zh: {
        title: "软件",
        navTitle: "软件",
        // subtitle: "开发 / 烧录工具",
      },
      en: {
        title: "Software",
        // subtitle: "Development / Burning Tools",
        navTitle: "Software",
      },
    },
    {
      id: "toolchain",
      anchor: "toolchain",
      accent: "#dc2626",
      icon: "toolchain",
      zh: {
        title: "算法工具链",
        navTitle: "算法工具链",
        // subtitle: "模型转换 / 量化 / 部署",
      },
      en: {
        title: "Algorithm Toolchain",
        // subtitle: "Model Conversion / Quantization / Deployment",
        navTitle: "Algorithm Toolchain",
      },
    },
    {
      id: "system-software",
      anchor: "system-software",
      accent: "#1f6feb",
      icon: "sdk",
      zh: {
        title: "SDK 用户手册",
        navTitle: "SDK",
        // subtitle: "SDK 开发 / 部署 / 模型转换",
      },
      en: {
        title: "SDK User Manual",
        // subtitle: "SDK Development / Deployment / Model Conversion",
        navTitle: "SDK",
      },
    },
    {
      id: "notifications",
      anchor: "notifications",
      accent: "#ff5125",
      icon: "manual",
      zh: {
        title: "通知文件",
        navTitle: "产品通知",
      },
      en: {
        title: "Notice Files",
        navTitle: "Notices",
      },
    },
  ],
  entries: [
    {
      id: "product-rdk-manual",
      categoryId: "products",
      href: "https://developer.d-robotics.cc/rdk_x_doc/RDK",
      zh: {
        title: "RDK X 系列用户手册",
        description: "RDK 套件是基于 D-Robotics 智能芯片打造的机器人开发者套件，本文档为 RDK 套件 X 系列的用户手册，为开发者提供关于RDK X3、RDK X3 Module、RDK X5 、RDK X5 Module 等产品的使用说明和开发指导。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK X3/X5 User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "The document is being prepared and is not yet available. Thank you for your attention and patience!.",
        href: "https://d-robotics.github.io/rdk_x_doc/en/RDK/",
        // tags: ["User Manual"],
      },
    },
    {
      id: "product-rdk-manual",
      categoryId: "products",
      href: "https://developer.d-robotics.cc/rdk_s_doc/RDK",
      zh: {
        title: "RDK S 系列用户手册",
        description: "RDK 套件是基于 D-Robotics 智能芯片打造的机器人开发者套件，本文档为 RDK 套件 S 系列的用户手册，为开发者提供关于 RDK S100、RDK S100P、RDK S600 产品的使用说明和开发指导。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK S Series User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK S100, RDK S100P and RDK S600.",
        href: "https://d-robotics.github.io/rdk_s_doc/en/RDK",
        // tags: ["User Manual"],
      },
    },
    {
      id: "tros",
      categoryId: "robot-app",
      href: "https://developer.d-robotics.cc/tros_doc/tros",
      zh: {
        title: "TogetheROS.Bot 用户手册",
        description: "本文档作为 RDK 机器人平台的核心开发指南，为开发者提供基于 TogetheROS.Bot 操作系统的机器人应用开发全流程指导，助力生态开发者高效、便捷地打造具有竞争力的智能机器人产品。",
        // tags: ["多平台"],
      },
      en: {
        title: "TogetheROS.Bot User Manual",
        description: "This document serves as the core development guide for the RDK robot platform, providing developers with comprehensive guidance for robot application development based on the TogetheROS.Bot operating system. It helps ecosystem developers efficiently and conveniently create competitive intelligent robot products.",
        href: "https://d-robotics.github.io/tros_doc/en/tros/",
        // tags: ["Multi-platform"],
      },
    },
    {
      id: "model-zoo-hub",
      categoryId: "model-zoo",
      href: "https://developer.d-robotics.cc/model_zoo_doc/model_zoo_intro",
      zh: {
        title: "Model Zoo 用户手册",
        description: "本文档作为 RDK 套件算法开发模块的专题指南，为开发者提供关于算法应用开发的案例与接口说明。",
      },
      en: {
        title: "Model Zoo User Manual",
        description: "This document serves as a specialized guide for the algorithm development module of the RDK suite, providing developers with case studies and interface descriptions for algorithm application development.",
        href: "https://d-robotics.github.io/model_zoo_doc/en/model_zoo_intro/",
      },
    },
    {
      id: "examples",
      categoryId: "examples",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/case_doc/case",
      zh: {
        title: "RDK S600 应用案例用户手册",
        description: "本文档汇总 RDK S600 平台典型应用案例，从基础外设接入到端侧 AI 推理，再到多模态交互与具身智能，按难度递进组织，便于快速上手并逐层深入。",
        // description: "文档正在准备中，暂未上架。感谢您的关注与耐心等待！",

      },
      en: {
        title: "RDK S600 Application Cases User Manual",
        // description: "This document serves as an application development example collection for the RDK, providing developers with multiple development practice directions.",
        description: "This documentation collects typical application cases for the RDK S600 platform, organized by difficulty from basic peripheral integration to on-device AI inference, multimodal interaction, and embodied intelligence—helping you get started quickly and dive deeper step by step.",
        href: "https://d-robotics.github.io/case_doc/en/case/",
      },
    },
    {
      id: "magicbox",
      categoryId: "accessories",
      zh: {
        title: "RDK Magicbox 用户手册",
        description: "本文档作为 RDK X5 Magicbox 多模态智能平台的用户手册，为开发者提供产品的使用说明和开发指南。",
        href: "https://developer.d-robotics.cc/magicbox_doc/magicbox",
      },
      en: {
        title: "RDK Magicbox User Manual",
        description: "This document serves as the user manual for the RDK X5 Magicbox multi-modal intelligent platform, providing developers with usage instructions and development guidelines on various aspects of the product, including dual-camera, movable arm, light strip interaction, voice function, system pre-installed case, and more.",
        href: "https://d-robotics.github.io/magicbox_doc/en/magicbox/",
      },
    },
    {
      id: "accessories-stereo-camera",
      categoryId: "accessories",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/accessories_stereo_camera_doc/overview",
      zh: {
        title: "双目摄像头用户手册",
        description: "本文档作为双目摄像头模组的用户手册，为开发者提供产品的使用说明和开发指南。",
      },
      en: {
        title: "RDK Stereo Camera User Manual",
        description: "This document serves as the user manual for the stereo camera module, providing developers with usage instructions and development guidelines on various aspects of the product.",
        href: "https://d-robotics.github.io/accessories_stereo_camera_doc/en/overview/",
      },
    },
    {
      id: "accessories_bmi088",
      categoryId: "accessories",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/accessories_bmi088_doc/introduction",
      zh: {
        title: "BMI088 IMU 模组用户手册",
        description: "本文档作为 BMI088 模组的用户手册，为开发者提供产品的使用说明和开发指南。",
      },
      en: {
        title: "RDK BMI088 IMU Module User Manual",
        description: "This document serves as the user manual for the BMI088 IMU module, providing developers with usage instructions and development guidelines on various aspects of the product.",
        href: "https://d-robotics.github.io/accessories_bmi088_doc/en/introduction",
      },
    },
    {
      id: "software-rdk-studio",
      categoryId: "software",
      zh: {
        title: "RDK Studio 用户手册",
        description: "RDK Studio 是面向机器人开发的 AI 原生桌面工作台。它把 Moss 对话、项目工作区、设备连接、远程开发、烧录、本地模型和板端 Agent 放在同一个原生窗口里。",
        href: "https://developer.d-robotics.cc/rdk_studio_doc/category/1-product-intro",
      },
      en: {
        title: "RDK Studio User Manual",
        description: "RDK Studio is an AI-native desktop workspace for robot development. It puts Moss dialog, project workspace, device connection, remote development, burning, local model, and board-side Agent in the same native window.",
        href: "https://d-robotics.github.io/rdk_studio_doc/en/category/1-product-intro/",
      },
    },
    {
      id: "software-xburn",
      categoryId: "software",
      href: "https://developer.d-robotics.cc/xburn_doc/overview",
      zh: {
        title: "XBurn 用户手册",
        description: "XBurn 是 D-Robotics 面向 RDK 系列设备的板级烧录工具，运行在 PC 端（Windows/Linux/macOS），用于固件烧录与备份，适用于 RDK S100、RDK S600、RDK X5、RDK X5 Module。",
      },
      en: {
        title: "XBurn User Manual",
        description: "XBurn is a D-Robotics board-level flashing tool that runs on a PC (Windows/Linux/macOS) for firmware flashing and backup. It supports RDK S100, RDK S600, RDK X5, and RDK X5 Module.",
        href: "https://developer.d-robotics.cc/xburn_doc/en/overview",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_s_doc/index.html",
      zh: {
        title: "S 系列计算平台 OE 用户手册",
        description: "本文档适用于使用地瓜 S100、S100P、S600 计算平台的所有开发者，为开发者提供关于 OE 的使用说明和开发指南。",
      },
      en: {
        title: "S Series Calculation Platform OE User Manual",
        description: "This document is applicable to all developers using the D-Robotics S100, S100P, and S600 computing platforms, providing comprehensive development process guidance to help you fully understand the entire usage process.",
        href: "https://developer.d-robotics.cc/oe_s_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_llm_s100p_doc/index.html",
      zh: {
        title: "S100 OE LLM 用户手册",
        description: "本文档适用于使用地瓜 S100 LLM 工具链的所有开发者，通过进行地瓜 LLM 工具链发布物内容介绍，为您带来地瓜 LLM 工具链整体开发流程，提供全方位的开发过程指导。",
      },
      en: {
        title: "S100 OE LLM User Manual",
        description: "This document is intended for all developers using D-Robotics-LLM. It provides comprehensive guidance throughout your development process, including the introduction of D-Robotics-LLM release materials and the overall development process of D-Robotics-LLM.",
        href: "https://developer.d-robotics.cc/oe_llm_s100p_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_llm_s600_doc/index.html",
      zh: {
        title: "S600 OE LLM 用户手册",
        description: "本文档适用于使用地瓜 S600 LLM 工具链的所有开发者，通过进行地瓜 LLM 工具链发布物内容介绍，为您带来地瓜 LLM 工具链整体开发流程，提供全方位的开发过程指导。",
      },
      en: {
        title: "S600 OE LLM User Manual",
        description: "This document is intended for all developers using D-Robotics-LLM. It provides comprehensive guidance throughout your development process, including the introduction of D-Robotics-LLM release materials and the overall development process of D-Robotics-LLM.",
        href: "https://developer.d-robotics.cc/oe_llm_s600_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_x5_doc/cn/index.html",
      zh: {
        title: "X5 OE 用户手册",
        description: "本文档旨在为您详细介绍 X5 算法工具链相关内容，让开发者快速上手体验模型训练/转换、部署、验证、推理等关键步骤，为您提供全方位的开发过程指导。",
      },
      en: {
        title: "X5 OE User Manual",
        description: "This document aims to provide detailed information on the X5 algorithm toolchain, helping developers quickly get started with model training/conversion, deployment, verification, and inference to provide comprehensive development process guidance.",
        href: "https://developer.d-robotics.cc/oe_x5_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_x3_doc/cn/index.html",
      zh: {
        title: "X3 OE 用户手册",
        description: "本文档旨在为您详细介绍 X3 算法工具链相关内容，让开发者快速上手体验模型训练/转换、部署、验证、推理等关键步骤，为您提供全方位的开发过程指导。",
      },
      en: {
        title: "X3 OE User Manual",
        description: "This document aims to provide detailed information on the X3 algorithm toolchain, helping developers quickly get started with model training/conversion, deployment, verification, and inference to provide comprehensive development process guidance.",
        href: "https://developer.d-robotics.cc/oe_x3_doc/en/index.html",
      },
    },
    {
      id: "system-software-sdk",
      categoryId: "system-software",
      versions: [
        {
          id: "latest",
          label: "latest",
          href: "https://developer.d-robotics.cc/x5_sdk_doc_latest/",
          en: {
            href: "https://developer.d-robotics.cc/x5_sdk_doc_latest/",
            pendingRelease: true,
          },
        },
        {
          id: "1.1.2",
          label: "V1.1.2",
          href: "https://developer.d-robotics.cc/x5_sdk_doc/",
          en: {
            href: "https://developer.d-robotics.cc/x5_sdk_doc/",
            pendingRelease: true,
          },
        },
      ],
      zh: {
        title: "X5 芯片用户手册",
        description: "本文档作为 X5 芯片方案的用户手册，为开发者提供关于开发环境搭建、方案评测、软件功能开发等多方面的使用说明和开发指南。",
        latestOptionHint:
          "latest 版本实时同步 AVL 信息，如需获取最新 AVL 请查看 latest 版本。",
        newestReleaseHint: "此版本为已发布 SDK 的最新版本。",
        descriptionHoverHint:
          "当前默认为已发布 SDK 的最新版本手册，如需获取历史版本或最新 AVL 信息，请点击 [选择版本] 按钮查看对应的手册。",
      },
      en: {
        title: "X5 SDK User Manual",
        description: "The document is being prepared and is not yet available. Thank you for your attention and patience!",
        pendingRelease: true,
        versionHint:
          "Match the manual to the SDK version you currently integrate. For the latest AVL parameters, switch to Latest — that document is kept continuously in sync.",
        latestOptionHint:
          "The Latest version syncs AVL information in real time. Switch to Latest for the most recent AVL.",
        newestReleaseHint: "This is the newest released SDK version.",
        descriptionHoverHint:
          "For the latest AVL information, click Select version and open the latest manual.",
      },
    },
    {
      id: "product-notice-archive",
      categoryId: "notifications",
      // 占位态：待正式上线。pendingRelease 时 SiteCard 不跳转，弹「准备中」对话框。
      // href 保留站内路由，正式上线时去掉 pendingRelease 即恢复跳转到 /notifications。
      pendingRelease: true,
      href: "/notifications",
      zh: {
        title: "产品通知",
        description: "文档正在准备中，暂未上架。感谢您的关注与耐心等待！",
      },
      en: {
        title: "Product Notices",
        description: "The document is being prepared and is not yet available. Thank you for your attention and patience!",
      },
    },
  ],
};

function toGroup(category, locale) {
  const i18n = category[locale];
  return {
    id: category.id,
    anchor: category.anchor,
    title: i18n.title,
    navTitle: i18n.navTitle || i18n.title,
    subtitle: i18n.subtitle,
    accent: category.accent,
    icon: category.icon,
  };
}

export function isEntryPending(entry, locale) {
  const i18n = entry[locale] || {};
  if (typeof i18n.pendingRelease === "boolean") return i18n.pendingRelease;
  return Boolean(entry.pendingRelease);
}

export function resolveVersionHref(version, locale) {
  if (!version) return "";
  const localized = locale && version[locale]?.href;
  return localized || version.href || "";
}

export function isLatestChannel(version) {
  return (
    /^latest$/i.test(String(version?.id || "")) ||
    /^latest$/i.test(String(version?.label || ""))
  );
}

export function parseVersionTuple(version) {
  const source = [version?.id, version?.label].filter(Boolean).join(" ");
  const match = String(source).match(/(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3] || 0)];
}

function compareVersionDesc(a, b) {
  const ta = parseVersionTuple(a);
  const tb = parseVersionTuple(b);
  if (ta && tb) {
    for (let i = 0; i < 3; i += 1) {
      if (tb[i] !== ta[i]) return tb[i] - ta[i];
    }
    return 0;
  }
  if (ta) return -1;
  if (tb) return 1;
  return 0;
}

export function pickDefaultVersion(versions) {
  if (!versions?.length) return null;
  const numbered = versions.filter(
    (item) => !item.channelLatest && parseVersionTuple(item),
  );
  const released = numbered.filter((item) => !item.pendingRelease);
  return released[0] || numbered[0] || versions[0] || null;
}

export function normalizeVersions(entry, locale) {
  if (!Array.isArray(entry.versions) || entry.versions.length === 0) return [];
  const mapped = entry.versions.map((version) => {
    const localized = locale ? version[locale] : undefined;
    const pendingRelease =
      typeof localized?.pendingRelease === "boolean"
        ? localized.pendingRelease
        : Boolean(version.pendingRelease);
    return {
      id: version.id,
      label: version.label || version.id,
      channelLatest: isLatestChannel(version),
      href: resolveVersionHref(version, locale),
      pendingRelease,
      index: Boolean(version.index),
    };
  });

  mapped.sort((a, b) => {
    if (a.channelLatest !== b.channelLatest) return a.channelLatest ? -1 : 1;
    return compareVersionDesc(a, b);
  });

  const current = pickDefaultVersion(mapped);
  return mapped.map((item) => ({
    ...item,
    default: Boolean(current && item.id === current.id),
    latest: item.channelLatest,
  }));
}

function toSite(entry, locale) {
  const i18n = entry[locale];
  const versions = normalizeVersions(entry, locale);
  const current = pickDefaultVersion(versions);
  const href = current?.href || i18n.href || entry.href || "";
  return {
    id: entry.id,
    group: entry.categoryId,
    title: i18n.title,
    description: i18n.description,
    href,
    tags: i18n.tags || [],
    versions,
    versionHint: i18n.versionHint || entry.versionHint || "",
    latestOptionHint: i18n.latestOptionHint || entry.latestOptionHint || "",
    newestReleaseHint: i18n.newestReleaseHint || entry.newestReleaseHint || "",
    descriptionHoverHint:
      i18n.descriptionHoverHint || entry.descriptionHoverHint || "",
    external: /^https?:\/\//.test(href),
    pendingRelease: isEntryPending(entry, locale),
  };
}

export const groups = DOC_CENTER_CONFIG.categories.map((item) => toGroup(item, "zh"));
export const groupsEn = DOC_CENTER_CONFIG.categories.map((item) => toGroup(item, "en"));
export const sites = DOC_CENTER_CONFIG.entries.map((item) => toSite(item, "zh"));
export const sitesEn = DOC_CENTER_CONFIG.entries.map((item) => toSite(item, "en"));

export function sitesByGroup(sitesData) {
  const targetSites = sitesData || sites;
  const targetGroups = sitesData === sitesEn ? groupsEn : groups;

  const grouped = {};
  for (const g of targetGroups) grouped[g.id] = [];
  for (const s of targetSites) {
    if (!grouped[s.group]) grouped[s.group] = [];
    grouped[s.group].push(s);
  }
  return grouped;
}
