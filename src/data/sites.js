/**
 * 文档中心唯一配置源（分类 + 站点）。
 *
 * 维护规范：
 * - 新增/删除分类：修改 DOC_CENTER_CONFIG.categories
 * - 新增/删除文档入口：修改 DOC_CENTER_CONFIG.entries
 * - 首页、分组锚点、卡片数据均由该配置自动派生
 * - pendingRelease: true 时点击卡片仅提示「文档正在准备中，暂未上架。感谢您的关注与耐心等待！」，不跳转
 *   可写在 entry 根级（中英文同时生效），也可写在 zh/en 下单独控制某一语言
 * - RDK X / RDK S / TROS / Magicbox / 算法工具链(OE) / RDK Studio 章节简介搜索索引见 manualChapterIndex*.js
 */
const DOC_CENTER_CONFIG = {
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
      id: "system-software-sdk",
      categoryId: "system-software",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/x5_sdk_doc/",
      zh: {
        title: "X5 芯片用户手册",
        description: "本文档作为 X5 芯片方案的用户手册，为开发者提供关于开发环境搭建、方案评测、软件功能开发等多方面的使用说明和开发指南。",
        // tags: ["系统软件"],
        // description: "文档正在准备中，暂未上架。感谢您的关注与耐心等待！",
      },
      en: {
        title: "X5 SDK User Manual",
        description: "This document serves as the user manual for the X5 chip solution, providing developers with usage instructions and development guidelines on various aspects including development environment setup, solution evaluation, software feature development, etc. The content covers development board usage, hardware design, system customization, application development, algorithm toolchain, and more.",
        href: "https://developer.d-robotics.cc/sdk_doc/en/intro",
        // tags: ["System Software"],
        description: "The document is being prepared and is not yet available. Thank you for your attention and patience!",
        pendingRelease: true,
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
      id: "accessories",
      categoryId: "accessories",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/accessories_doc/accessories",
      zh: {
        title: "RDK 配件用户手册",
        description: "RDK 配件文档汇总 D-Robotics RDK 开发者套件配套硬件模组的使用说明，帮助开发者快速完成选型、安装与点亮。",
      },
      en: {
        title: "RDK Accessories User Manual",
        description: "The RDK Accessories Documentation collects usage guides for hardware modules that ship with D-Robotics RDK developer kits, helping developers quickly complete product selection, installation and bring-up. ",
        href: "https://d-robotics.github.io/accessories_doc/en/accessories",
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
      href: "https://toolchain.d-robotics.cc/guide/doc_introduction.html",
      zh: {
        title: "RDK S 系列产品算法工具链用户手册",
        description: "本文档适用于使用地瓜S100、S100P、S600计算平台的所有开发者，为您提供全方位的开发过程指导，为您能够充分了解整体的使用过程。",
      },
      en: {
        title: "RDK S Series Product Algorithm Toolchain User Manual",
        description: "This document is applicable to all developers using the D-Robotics S100, S100P, and S600 computing platforms, providing comprehensive development process guidance to help you fully understand the entire usage process.",
        href: "https://toolchain.d-robotics.cc/en/guide/doc_introduction.html",
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

function toSite(entry, locale) {
  const i18n = entry[locale];
  const href = i18n.href || entry.href;
  const pendingRelease =
    typeof i18n.pendingRelease === "boolean"
      ? i18n.pendingRelease
      : Boolean(entry.pendingRelease);
  return {
    id: entry.id,
    group: entry.categoryId,
    title: i18n.title,
    description: i18n.description,
    href,
    tags: i18n.tags || [],
    external: /^https?:\/\//.test(href),
    pendingRelease,
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
