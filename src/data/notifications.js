/**
 * 产品通知数据源（唯一配置源）。
 *
 * 维护规范：
 * - 新增/删除通知：修改 NOTICES_CONFIG.entries
 * - 页面区块、徽章、排序均由该配置自动派生
 * - 附件 PDF 上传至独立下载服务器（NOTICE_FILE_BASE），数据源 attachment 只写文件名
 *   （中英文共用同一份 <编号>.pdf），由 toNotice 拼接为完整 URL
 * - attachment.ready=false 时「通知文件」列降级为纯文字不可点击（PDF 未上传时用）
 *
 * 通知编号格式：PCN|PDN|PAN-YYYYMM-产品代号-序号-R修订号
 * 例：PCN-202511-RDKX5MD-01-R1 = 产品变更通知 / 2025-11 / RDK X5 Module / 第 01 条 / 修订 1
 * 编号前缀即类型，校验正则见 NOTICE_ID_PATTERN。
 *
 * 事实源在飞书（多维表格：产品名称 / 类型 / 发布时间 / 通知文件 / 内容概述），
 * 飞书→文档站单向同步；第一版人工转写，数据结构已预留脚本化扩展。
 */

// 通知文件下载服务器 base：PDF 上传至该服务器，数据源 attachment 只写文件名，由此拼接为完整 URL。
// 换域名时只改这一处。
const NOTICE_FILE_BASE = "https://archive.d-robotics.cc/downloads/hardware/PCN/";

const NOTICE_TYPE = {
  PCN: "pcn", // 产品变更通知 / Product Change Notification
  PDN: "pdn", // 产品停产通知 / Product Discontinuation Notice
  PAN: "pan", // 产品告知 / Product Advisory Notice
};

// 区块顺序：变更通知（用户最高频关注）置顶，其次停产，最后告知
const NOTICE_TYPE_ORDER = ["pcn", "pdn", "pan"];

const NOTICE_TYPE_META = {
  pcn: {
    label: { zh: "产品变更通知（PCN）", en: "Product Change Notification (PCN)" },
    short: { zh: "PCN", en: "PCN" },
    // 绿：彩边 + 浅底 + 深字（白底对比度达标）
    color: { border: "#16a34a", bg: "#f0fdf4", text: "#166534" },
  },
  pdn: {
    label: { zh: "产品停产通知（PDN）", en: "Product Discontinuation Notice (PDN)" },
    short: { zh: "PDN", en: "PDN" },
    // 红：与门户品牌橙 #ff5125 可区分
    color: { border: "#dc2626", bg: "#fef2f2", text: "#991b1b" },
  },
  pan: {
    label: { zh: "产品告知（PAN）", en: "Product Advisory Notice (PAN)" },
    short: { zh: "PAN", en: "PAN" },
    // 琥珀（非纯黄，纯黄白底对比不足）
    color: { border: "#ca8a04", bg: "#fefce8", text: "#854d0e" },
  },
};

const NOTICES_CONFIG = {
  // 页首边界声明：本页覆盖硬件产品层面通知
  pageIntro: {
    zh: "本页发布 D-Robotics 硬件产品层面的产品通知，包括产品变更通知（PCN）、产品停产通知（PDN）与产品告知（PAN）。",
    en: "This page publishes D-Robotics hardware product notices, including Product Change Notifications (PCN), Product Discontinuation Notices (PDN), and Product Advisory Notices (PAN).",
  },
  entries: [
    {
      id: "PCN-202511-RDKX5MD-01-R1",
      type: NOTICE_TYPE.PCN,
      product: { zh: "RDK X5 Module", en: "RDK X5 Module" },
      publishDate: "2025-12-22",
      attachment: {
        // 中英文共用同一份 PDF
        file: "PCN-202511-RDKX5MD-01-R1.pdf",
        ready: true,
      },
      summary: {
        zh: "为提升产品使用体验，外置天线方案替代原有的板载天线方案。",
        en: "To improve product experience, the external antenna solution replaces the original on-board antenna solution.",
      },
    },
    {
      id: "PCN-202603-RDKX5MD-01-R1",
      type: NOTICE_TYPE.PCN,
      product: { zh: "RDK X5 Module", en: "RDK X5 Module" },
      publishDate: "2026-03-12",
      attachment: {
        // 中英文共用同一份 PDF
        file: "PCN-202603-RDKX5MD-01-R1.pdf",
        ready: true,
      },
      summary: {
        zh: "满足不同类型客户的使用和量产需求，对预烧录镜像和包装形式进行调整。",
        en: "To meet diverse customer usage and mass-production needs, adjustments are made to pre-flashed images and packaging forms.",
      },
    },
    {
      id: "PCN-202604-RDKS100-01-R1",
      type: NOTICE_TYPE.PCN,
      product: { zh: "RDK S100", en: "RDK S100" },
      publishDate: "2026-04-30",
      attachment: {
        // 中英文共用同一份 PDF；未上传至服务器，降级为纯文字不可点击的「待发布」态
        file: "PCN-202604-RDKS100-01-R1.pdf",
        ready: false,
      },
      summary: {
        zh: "为兼容同类型生态产品接口、优化产品体验、提高产品稳定性，围绕 RDK S100 系列展开了一系列硬件优化。",
        en: "To ensure compatibility with ecosystem product interfaces, optimize product experience, and improve stability, a series of hardware optimizations have been made around the RDK S100 series.",
      },
    },
  ],
};

// 通知编号校验正则：PCN|PDN|PAN-6位年月-产品代号(字母数字)-2位序号-R修订号
export const NOTICE_ID_PATTERN = /^(PCN|PDN|PAN)-\d{6}-[A-Z0-9]+-\d{2}-R\d+$/;

export const notificationsPageIntro = NOTICES_CONFIG.pageIntro;

/**
 * 把单条 entry 按 locale 展平为渲染用对象。
 * 附件中英文共用同一份 PDF（attachment.file），无 locale 回退。
 */
/**
 * 把单条 entry 按 locale 展平为渲染用对象。
 * 附件中英文共用同一份 PDF（attachment.file），无 locale 回退。
 */
function toNotice(entry, locale) {
  const fileName = entry.attachment && entry.attachment.file;
  // 文件名拼成下载服务器的完整 URL；base 见 NOTICE_FILE_BASE
  const attachmentUrl = fileName ? `${NOTICE_FILE_BASE}${fileName}` : null;
  const ready = Boolean(entry.attachment && entry.attachment.ready);
  return {
    id: entry.id,
    type: entry.type,
    product: entry.product[locale],
    publishDate: entry.publishDate,
    attachment: attachmentUrl,
    attachmentReady: ready,
    summary: entry.summary[locale],
  };
}

/**
 * 按 NOTICE_TYPE_ORDER 返回三类分组，每类 entries 按 publishDate 倒序。
 * 空类照常返回（entries: []），由页面层渲染占位。
 */
export function notificationsByType(locale) {
  return NOTICE_TYPE_ORDER.map((type) => {
    const meta = NOTICE_TYPE_META[type];
    const entries = NOTICES_CONFIG.entries
      .filter((entry) => entry.type === type)
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
      .map((entry) => toNotice(entry, locale));
    return {
      type,
      label: meta.label[locale],
      short: meta.short[locale],
      color: meta.color,
      count: entries.length,
      entries,
    };
  });
}

/**
 * 跨三类按 publishDate 倒序取最新 N 条，每条带所属类型的色标 meta。
 * 公共导出：首页等处若需展示「最近通知」可调用（当前首页未使用）。
 */
export function latestNotifications(locale, limit = 3) {
  return NOTICES_CONFIG.entries
    .slice()
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, limit)
    .map((entry) => {
      const meta = NOTICE_TYPE_META[entry.type];
      return {
        ...toNotice(entry, locale),
        typeLabel: meta.label[locale],
        typeShort: meta.short[locale],
        color: meta.color,
      };
    });
}
