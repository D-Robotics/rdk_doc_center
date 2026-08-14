/**
 * 资料上传页配置（资料类型、校验规则）。
 * 提交目标见 docusaurus.config.js → customFields.materialUpload
 */

export const MATERIAL_TYPES = [
  {
    id: "sdk-package",
    zh: { label: "SDK / 软件包", hint: "如 .deb / .zip / .tar.gz" },
    en: { label: "SDK / Package", hint: "e.g. .deb / .zip / .tar.gz" },
  },
  {
    id: "system-image",
    zh: { label: "系统镜像", hint: "烧录镜像、刷机包等" },
    en: { label: "System Image", hint: "Flash images, burn packages, etc." },
  },
  {
    id: "doc-asset",
    zh: { label: "文档附件", hint: "PDF、示意图、补充说明等" },
    en: { label: "Doc Attachment", hint: "PDF, diagrams, supplements, etc." },
  },
  {
    id: "model-asset",
    zh: { label: "模型 / 算法资源", hint: "模型权重、配置或样例数据" },
    en: { label: "Model / Algo Asset", hint: "Weights, configs, or sample data" },
  },
  {
    id: "other",
    zh: { label: "其他资料", hint: "未归类的手册相关文件" },
    en: { label: "Other", hint: "Other handbook-related files" },
  },
];

export const DEFAULT_ACCEPT =
  ".zip,.tar,.gz,.tgz,.bz2,.7z,.deb,.rpm,.img,.iso,.bin,.pdf,.md,.txt,.json,.yaml,.yml,.onnx,.bin,.hbm,.so,.whl";

export const DEFAULT_MAX_FILE_SIZE_MB = 200;
export const DEFAULT_MAX_FILES = 10;

export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
