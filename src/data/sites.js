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
 * - RDK 用户手册（products）按产品拆分：S100/S600、X3/X5 在文档站（rdk_s_doc / rdk_x_doc）
 *   各自对应独立版本。卡片 href 由 rdkManualHref 生成，始终携带显式 ?v=<版本>&p=<产品>，
 *   版本号统一维护在下方 PRODUCT_LATEST_VERSION 表中（发版时只改这一处，勿用 ?v=latest 或仅 ?p=）
 * - image: 可选。卡片左侧产品图，支持：
 *   1) OSS/CDN 完整地址（https://xxx.oss-cn-xxx.aliyuncs.com/...）
 *   2) 相对 static 的站内路径（如 "/img/products/rdk-x.png"）
 *   3) 数组：同一卡片展示多张产品图，元素可为路径字符串或 { src, label }
 *   未配置或加载失败时，使用 cover 对应的产品示意插画
 * - cover: 卡片产品图示意键名（rdk-x / rdk-s / tros / studio 等），与手册一一对应
 * - 首页全文搜索由 Algolia 联邦索引提供（见 algoliaSites.js / scripts/algolia-index.mjs）
 */

/** 卡片产品图 OSS/CDN 根路径，不要末尾斜杠。填好后下面各条目的 image 即生效。 */
const PRODUCT_IMAGE_BASE = "";

function productImage(file) {
  if (!file) return "";
  if (/^https?:\/\//.test(file)) return file;
  const base = String(PRODUCT_IMAGE_BASE || "").replace(/\/$/, "");
  if (!base) return "";
  return `${base}/${String(file).replace(/^\//, "")}`;
}

/**
 * 产品 → 文档站当前最新版本（发版时只需更新这里的 version）。
 * 卡片 href 由 rdkManualHref 生成，始终携带显式 ?v=<版本>&p=<产品>，
 * 避免文档站因缺少版本号而回退到 localStorage（用户上次切换的版本）。
 */
const PRODUCT_LATEST_VERSION = {
  "RDK S600": { site: "s", version: "5.1.0" },
  "RDK S100": { site: "s", version: "4.0.5" },
  "RDK X5": { site: "x", version: "3.5.0" },
  "RDK X5 Module": { site: "x", version: "3.5.0" },
  "RDK X3": { site: "x", version: "3.0.0" },
  "RDK X3 Module": { site: "x", version: "3.0.0" },
};

function rdkManualHref(product, locale) {
  const info = PRODUCT_LATEST_VERSION[product];
  if (!info) return "";
  const p = product.replace(/ /g, "+");
  const base =
    locale === "en"
      ? `https://d-robotics.github.io/rdk_${info.site}_doc/en/RDK`
      : `https://developer.d-robotics.cc/rdk_${info.site}_doc/RDK`;
  return `${base}?v=${info.version}&p=${p}`;
}

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
      cover: "rdk-s",
      image: [
        { src: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-s600.png" },
      ],
      href: rdkManualHref("RDK S600"),
      zh: {
        title: "RDK S600 用户手册",
        description: "RDK S600 系列 是一款高性能开发套件，具有 560 TOPS 端侧推理算力与 18 核 ARM A78AE 处理能力，充分满足各类场景的使用需求。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK S600 User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "The RDK S600 Series is a high-performance development kit featuring 560 TOPS of on-device AI inference capability and a 18-core ARM Cortex-A78AE processor.",
        href: rdkManualHref("RDK S600", "en"),
        // tags: ["User Manual"],
      },
    },
    {
      id: "product-rdk-manual",
      categoryId: "products",
      cover: "rdk-s",
      image: [
        { src: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-s100.png" },
      ],
      href: rdkManualHref("RDK S100"),
      zh: {
        title: "RDK S100 用户手册",
        description: "RDK S100 系列 是一款高性能开发套件，具有 80/128 TOPS 端侧推理算力与 6 核 ARM A78AE 处理能力，充分满足各类场景的使用需求。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK S100 User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "The RDK S100 Series is a high-performance development kit featuring 80/128 TOPS of on-device AI inference capability and a 6-core ARM Cortex-A78AE processor.",
        href: rdkManualHref("RDK S100", "en"),
        // tags: ["User Manual"],
      },
    },
    {
      id: "product-rdk-manual",
      categoryId: "products",
      cover: "rdk-x",
      image: [
        { src: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-x5.png" },
      ],
      href: rdkManualHref("RDK X5"),
      zh: {
        title: "RDK X5 用户手册",
        description: "RDK X5 是一款全功能开发板，搭配丰富的传感器和扩展组件，提供灵活的硬件扩展和连接选项。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK X5 User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "RDK X5 is a full-featured development board, it offers flexible hardware expansion and connectivity options with a variety of sensors and extension components.",
        href: rdkManualHref("RDK X5", "en"),
        // tags: ["User Manual"],
      },
    },
    {
      id: "product-rdk-manual",
      categoryId: "products",
      cover: "rdk-x",
      image: [
        { src: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-x5-module.png" },
      ],
      href: rdkManualHref("RDK X5 Module"),
      zh: {
        title: "RDK X5 Module 用户手册",
        description: "RDK X5 Module 采用核心板与 IO 载板分离的模块化设计方式，便于功能扩展与定制开发。",
        // tags: ["用户手册"],
      },
      en: {
          title: "RDK X5 Module User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "RDK X5 Module adopts a modular design approach with a core board and IO carrier board separation, facilitating functional expansion and custom development.",
        href: rdkManualHref("RDK X5 Module", "en"),
        // tags: ["User Manual"],
      },
    },
    {
      id: "product-rdk-manual",
      categoryId: "products",
      cover: "rdk-x",
      image: [
        { src: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-x3.png" },
      ],
      href: rdkManualHref("RDK X3"),
      zh: {
        title: "RDK X3 用户手册",
        description: "RDK X3 是一款全功能开发板，具有 5Tops 端侧推理算力。搭配丰富的传感器和扩展组件，为开发者提供灵活的硬件扩展和连接选项。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK X3 User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "RDK X3 is a full-featured development board, it offers flexible hardware expansion and connectivity options with a variety of sensors and extension components.",
        href: rdkManualHref("RDK X3", "en"),
        // tags: ["User Manual"],
      },
    },
    {
      id: "product-rdk-manual",
      categoryId: "products",
      cover: "rdk-x",
      image: [
        { src: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-x3-module.png" },
      ],
      href: rdkManualHref("RDK X3 Module"),
      zh: {
        title: "RDK X3 Module 用户手册",
        description: "RDK X3 Module 是一款紧凑型核心模组，与 RDK X3 保持同等规格，搭配扩展板，尺寸和接口兼容树莓派 CM4 模组。",
        // tags: ["用户手册"],
      },
      en: {
        title: "RDK X3 Module User Manual",
        // description: "This document is the user manual for the D-Robotics RDK Suite. It provides developers with usage instructions and development guidance for products such as RDK X3, RDK X3 Module, RDK X5 and  RDK X5 Module. ",
        description: "RDK X3 Module is a compact core module that maintains the same specifications as RDK X3.",
        href: rdkManualHref("RDK X3 Module", "en"),
        // tags: ["User Manual"],
      },
    },
    {
      id: "tros",
      categoryId: "robot-app",
      cover: "tros",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/tros.png",
      href: "https://developer.d-robotics.cc/tros_doc/tros",
      zh: {
        title: "TogetheROS.Bot 用户手册",
        description: "TogetheROS.Bot 是面向机器人厂商和生态开发者推出的机器人操作系统，助力用户打造具有竞争力的智能机器人产品。",
        // tags: ["多平台"],
      },
      en: {
        title: "TogetheROS.Bot User Manual",
        description: "TogetheROS.Bot is a robot operating system designed for robot manufacturers and ecosystem developers. "
        // tags: ["Multi-platform"],
      },
    },
    {
      id: "model-zoo-hub",
      categoryId: "model-zoo",
      cover: "model-zoo",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/model-zoo.png",
      href: "https://developer.d-robotics.cc/model_zoo_doc/model_zoo_intro",
      zh: {
        title: "Model Zoo 用户手册",
        description: "RDK Model Zoo 是面向 RDK 系列开发板提供的 BPU 模型示例与工具集合，用于帮助开发者快速上手 BPU、跑通模型推理流程。",
      },
      en: {
        title: "Model Zoo User Manual",
        description: "RDK Model Zoo is a collection of BPU model examples and tools.",
        href: "https://d-robotics.github.io/model_zoo_doc/en/model_zoo_intro/",
      },
    },
    {
      id: "examples",
      categoryId: "examples",
      cover: "s600-cases",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/rdk-s600-cases-card.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/case_doc/case",
      zh: {
        title: "RDK S600 应用案例用户手册",
        description: "本文档汇总 RDK S600 平台典型应用案例，从基础外设接入到端侧 AI 推理，再到多模态交互与具身智能，便于快速上手并逐层深入。",
        // description: "文档正在准备中，暂未上架。感谢您的关注与耐心等待！",

      },
      en: {
        title: "RDK S600 Application Cases User Manual",
        // description: "This document serves as an application development example collection for the RDK, providing developers with multiple development practice directions.",
        description: "This documentation collects typical application cases for the RDK S600 platform, helping you get started quickly and dive deeper step by step.",
        href: "https://d-robotics.github.io/case_doc/en/case/",
      },
    },
    {
      id: "examples",
      categoryId: "examples",
      cover: "x5-cases",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/x5_cases.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/x5_cases_doc/case",
      zh: {
        title: "RDK X5 应用案例用户手册",
        description: "本文档汇总 RDK X5 平台典型应用案例，从基础外设接口到端侧 AI 推理，再到交互游戏与多模态聊天机器人，按难度递进组织，便于快速上手并逐层深入。",
        // description: "文档正在准备中，暂未上架。感谢您的关注与耐心等待！",

      },
      en: {
        title: "RDK X5 Application Cases User Manual",
        // description: "This document serves as an application development example collection for the RDK, providing developers with multiple development practice directions.",
        description: "This documentation collects typical application cases for the RDK X5 platform, helping you get started quickly and dive deeper step by step.",
        href: "https://d-robotics.github.io/x5_cases_doc/en/case",
      },
    },
    {
      id: "magicbox",
      categoryId: "accessories",
      cover: "magicbox",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/magicbox.png",
      zh: {
        title: "RDK Magicbox 用户手册",
        description: "D-Robotics RDK X5 Magicbox 是一款融合视觉、听觉与动觉的多模态智能平台，帮助用户快速开启多模态人工智能的探索之旅。",
        href: "https://developer.d-robotics.cc/magicbox_doc/magicbox",
      },
      en: {
        title: "RDK Magicbox User Manual",
        description: "D-Robotics RDK X5 Magicbox is a multi-modal intelligent platform that integrates vision, hearing, and motion perception.",
        href: "https://d-robotics.github.io/magicbox_doc/en/magicbox/",
      },
    },
    {
      id: "accessories-stereo-camera",
      categoryId: "accessories",
      cover: "stereo-camera",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/stereo-camera.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/accessories_stereo_camera_doc/overview",
      zh: {
        title: "双目摄像头用户手册",
        description: "本文档面向 D-Robotics RDK 开发者套件配套的双目摄像头模组，提供选型、安装、点亮与二次开发指引。",
      },
      en: {
        title: "RDK Stereo Camera User Manual",
        description: "This documentation covers stereo camera modules for D-Robotics RDK developer kits, helping developers with product selection, installation, bring-up, and secondary development.",
        href: "https://d-robotics.github.io/accessories_stereo_camera_doc/en/overview/",
      },
    },
    {
      id: "accessories_bmi088",
      categoryId: "accessories",
      cover: "bmi088",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/bmi088.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/accessories_bmi088_doc/introduction",
      zh: {
        title: "BMI088 IMU 模组用户手册",
        description: "BMI088 专为要求高精度和抗振性能的应用场景而设计，可实现高稳定性的姿态与运动感知。",
      },
      en: {
        title: "RDK BMI088 IMU Module User Manual",
        description: "This document serves as the user manual for the BMI088 IMU module, providing developers with usage instructions and development guidelines.",
        href: "https://d-robotics.github.io/accessories_bmi088_doc/en/introduction",
      },
    },
    {
      id: "accessories_audio_kit",
      categoryId: "accessories",
      cover: "audio_kit",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/audio_kit.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/accessories_audio_kit_doc/overview",
      zh: {
        title: "RDK 音频套件用户手册",
        description: "RDK™ 音频套件是一款支持全双工多通道录音与播放的音频开发套件，可广泛用于智能会议、语音交互、机器人听觉等应用场景。",
      },
      en: {
        title: "RDK Audio Kit User Manual",
        description: "RDK™ Audio Kit is an audio development kit that supports full-duplex multi-channel recording and playback.",
        href: "https://developer.d-robotics.cc/accessories_audio_kit_doc/en/overview",
      },
    },
    {
      id: "software-rdk-studio",
      categoryId: "software",
      cover: "studio",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/studio.png",
      zh: {
        title: "RDK Studio 用户手册",
        description: "RDK Studio 是面向机器人开发的 AI 原生工作台，把 Moss 对话、项目工作区、本地模型和板端 Agent 放在同一个原生窗口里。",
        href: "https://developer.d-robotics.cc/rdk_studio_doc/category/1-product-intro",
      },
      en: {
        title: "RDK Studio User Manual",
        description: "RDK Studio is an AI-native workspace for robot development. It puts Moss dialog, project workspace, local model, and board-side Agent in the same native window.",
        href: "https://d-robotics.github.io/rdk_studio_doc/en/category/1-product-intro/",
      },
    },
    {
      id: "software-xburn",
      categoryId: "software",
      cover: "xburn",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/xburn.png",
      href: "https://developer.d-robotics.cc/xburn_doc/overview",
      zh: {
        title: "XBurn 用户手册",
        description: "XBurn 是 D-Robotics 面向 RDK 系列设备的板级烧录工具，用于固件烧录与备份。",
      },
      en: {
        title: "XBurn User Manual",
        description: "XBurn is a D-Robotics board-level flashing tool that runs on a PC (Windows/Linux/macOS) for firmware flashing and backup.",
        href: "https://developer.d-robotics.cc/xburn_doc/en/overview",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      cover: "oe-s",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/oe-s.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_s_doc/index.html",
      zh: {
        title: "S 系列算法工具链用户手册",
        description: "OE 是 Open Explorer 的缩写简称，中文名为天工开物，它是基于自研计算平台打造的全生命周期开发平台。",
      },
      en: {
        title: "S Series Algorithm Toolchain User Manual",
        description: "OE is the abbreviation of OpenExplorer, which is an full lifecycle development platform based on D-Robotics' computing platform.",
        href: "https://developer.d-robotics.cc/oe_s_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      cover: "oe-llm-s100",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/oe-llm-s100.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_llm_s100p_doc/index.html",
      zh: {
        title: "S100 LLM 工具链用户手册",
        description: "地瓜 S100 LLM 工具链，是工具链产品面向大模型业务的拓展， 实现在 S100 系列及衍生平台上进行大语言模型的开发、转换和部署。",
      },
      en: {
        title: "S100 LLM Toolchain User Manual",
        description: "D-Robotics-LLM Toolchain enables the development, conversion, and deployment of large language models on the S100 series platforms and derivative platforms.",
        href: "https://developer.d-robotics.cc/oe_llm_s100p_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      cover: "oe-llm-s600",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/oe-llm-s600.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_llm_s600_doc/index.html",
      zh: {
        title: "S600 LLM 工具链用户手册",
        description: "地瓜 S600 LLM 工具链，是工具链产品面向大模型业务的特性化拓展，可以在 S600 及衍生平台进行大语言模型的部署。",
      },
      en: {
        title: "S600 LLM Toolchain User Manual",
        description: "D-Robotics-LLM Toolchain enables the deployment of large language models on the S600 series platforms and derivative platforms.",
        href: "https://developer.d-robotics.cc/oe_llm_s600_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      cover: "oe-x5",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/oe-x5.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_x5_doc/cn/index.html",
      zh: {
        title: "X5 算法工具链用户手册",
        description: "X5 算法工具链是边缘计算平台算法落地解决方案，可以把浮点模型量化为定点模型， 并在计算平台上快速部署自研算法模型。",
      },
      en: {
        title: "X5 Algorithm Toolchain User Manual",
        description: "X5 Algorithm Toolchain helps you quantify floating-point models into fixed-point models, and quickly deploy your self-developed algorithm models on the D-Robotics computing platform.",
        href: "https://developer.d-robotics.cc/oe_x5_doc/en/index.html",
      },
    },
    {
      id: "algorithm-toolchain",
      categoryId: "toolchain",
      cover: "oe-x3",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/oe-x3.png",
      // pendingRelease: true,
      href: "https://developer.d-robotics.cc/oe_x3_doc/cn/index.html",
      zh: {
        title: "X3 算法工具链用户手册",
        description: "X3 算法工具链是边缘计算平台算法落地解决方案，可以把浮点模型量化为定点模型， 并在计算平台上快速部署自研算法模型。",
      },
      en: {
        title: "X3 Algorithm Toolchain User Manual",
        description: "X3 Algorithm Toolchain helps you quantify floating-point models into fixed-point models, and quickly deploy your self-developed algorithm models on the D-Robotics computing platform.",
        href: "https://developer.d-robotics.cc/oe_x3_doc/en/index.html",
      },
    },
    {
      id: "system-software-sdk",
      categoryId: "system-software",
      cover: "x5-sdk",
      image: "https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/doc_center/x5-sdk.png",
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
          "latest 版本实时同步 AVL 信息，如需获取最新 AVL 请查看此版本。",
        newestReleaseHint: "此版本为已发布 SDK 的最新版本，AVL 不会实时更新。",
        descriptionHoverHint:
          "当前为已发布 SDK 的最新稳定版本，所包含的 AVL 信息于发布时固化，不具备实时更新能力。为确保获取最准确的 AVL 数据，请点击 [选择版本] 控件，参考 latest 版本手册。",
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
          "The current version is the latest stable version of the released SDK, and the AVL information included in it is fixed at the time of release, which does not have the ability to update in real time. To ensure the most accurate AVL data is obtained, please click the [Select version] control and refer to the latest version manual.",
      },
    },
    {
      id: "product-notice-archive",
      categoryId: "notifications",
      cover: "notices",
      image: productImage("notices.png"),
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
    image: i18n.image || entry.image || "",
    cover: entry.cover || "",
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
